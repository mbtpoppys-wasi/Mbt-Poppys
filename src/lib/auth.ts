import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { createServiceRoleClient } from "@/lib/supabase/server";

const COOKIE_NAME = "mbt_admin_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("Missing ADMIN_SESSION_SECRET");
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function createSessionToken(): string {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `${expiresAt}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

function isValidToken(token: string): boolean {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!timingSafeEqual(sigBuf, expectedBuf)) return false;

  const expiresAt = Number(payload);
  if (Number.isNaN(expiresAt) || Date.now() > expiresAt) return false;

  return true;
}

export async function setAdminSession() {
  const token = createSessionToken();
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return isValidToken(token);
}

export type AdminCredentialsCheck =
  | { ok: true }
  | { ok: false; reason: "config" | "invalid" }
  | { ok: false; reason: "locked"; retryAfterSeconds: number };

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MS = 5 * 60 * 1000;

// Server-side counterpart to the client-side lockout in AdminLoginScreen.tsx.
// The client one is UX polish only (shows a countdown) and can be bypassed
// by clearing localStorage or calling this action directly — this table is
// the real enforcement, keyed by the email being attempted so it can't be
// reset by the attacker.
async function checkRateLimit(
  supabase: ReturnType<typeof createServiceRoleClient>,
  identifier: string
): Promise<{ locked: true; retryAfterSeconds: number } | { locked: false }> {
  const { data } = await supabase
    .from("login_attempts")
    .select("locked_until")
    .eq("identifier", identifier)
    .maybeSingle();

  if (data?.locked_until) {
    const remainingMs = new Date(data.locked_until).getTime() - Date.now();
    if (remainingMs > 0) {
      return { locked: true, retryAfterSeconds: Math.ceil(remainingMs / 1000) };
    }
  }
  return { locked: false };
}

async function recordFailedAttempt(
  supabase: ReturnType<typeof createServiceRoleClient>,
  identifier: string
): Promise<void> {
  const { data } = await supabase
    .from("login_attempts")
    .select("failed_count")
    .eq("identifier", identifier)
    .maybeSingle();

  const failedCount = (data?.failed_count ?? 0) + 1;
  const lockedUntil =
    failedCount >= MAX_FAILED_ATTEMPTS ? new Date(Date.now() + LOCKOUT_MS).toISOString() : null;

  await supabase.from("login_attempts").upsert(
    {
      identifier,
      failed_count: lockedUntil ? 0 : failedCount, // reset the counter once locked, so it starts fresh next window
      locked_until: lockedUntil,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "identifier" }
  );
}

async function clearFailedAttempts(
  supabase: ReturnType<typeof createServiceRoleClient>,
  identifier: string
): Promise<void> {
  await supabase.from("login_attempts").delete().eq("identifier", identifier);
}

// Checked against the admin_credentials table (Supabase), not env vars —
// the row is created once via SQL editor with a bcrypt-hashed password
// (see supabase/migrations/013_admin_credentials.sql). RLS on that table
// has no policies, so only this service-role query can ever read it.
//
// Distinguishes "server can't reach Supabase" (missing/wrong
// SUPABASE_SERVICE_ROLE_KEY) from "wrong email/password" — otherwise a
// misconfigured env var just looks like a silently wrong password, which
// is exactly what happened the first time this shipped.
export async function checkAdminCredentials(
  email: string,
  password: string
): Promise<AdminCredentialsCheck> {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !password) return { ok: false, reason: "invalid" };

  let supabase;
  try {
    supabase = createServiceRoleClient();
  } catch (err) {
    console.error("[admin-login] Supabase client init failed:", err);
    return { ok: false, reason: "config" };
  }

  const rateLimit = await checkRateLimit(supabase, normalizedEmail);
  if (rateLimit.locked) {
    return { ok: false, reason: "locked", retryAfterSeconds: rateLimit.retryAfterSeconds };
  }

  const { data, error } = await supabase
    .from("admin_credentials")
    .select("password_hash")
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (error) {
    console.error("[admin-login] Supabase query failed:", error.message);
    return { ok: false, reason: "config" };
  }
  if (!data) {
    await recordFailedAttempt(supabase, normalizedEmail);
    return { ok: false, reason: "invalid" };
  }

  const matches = await bcrypt.compare(password, data.password_hash);
  if (!matches) {
    await recordFailedAttempt(supabase, normalizedEmail);
    return { ok: false, reason: "invalid" };
  }

  await clearFailedAttempts(supabase, normalizedEmail);
  return { ok: true };
}
