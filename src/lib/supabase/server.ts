import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Env values pasted into Vercel sometimes carry a trailing slash or path
 * segment, which makes supabase-js build request URLs the API gateway
 * rejects ("Invalid path specified in request URL"). Reduce to the origin.
 */
function normalizeSupabaseUrl(url: string): string {
  try {
    return new URL(url.trim()).origin;
  } catch {
    return url.trim();
  }
}

/**
 * Read-only, anon-key client for server-rendered public data fetches
 * (fuel prices, cafe products, gallery images, status banner).
 */
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createSupabaseClient(normalizeSupabaseUrl(url), anonKey, {
    auth: { persistSession: false },
  });
}

/**
 * Service-role client for /admin server actions only. Bypasses RLS — never
 * import this from client components or expose the key to the browser.
 */
export function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return createSupabaseClient(normalizeSupabaseUrl(url), serviceKey, {
    auth: { persistSession: false },
  });
}
