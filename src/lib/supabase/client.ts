import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser-side, anon-key Supabase client. Used ONLY for Realtime
 * subscriptions (live refresh on public pages + the LIVE indicator in the
 * admin dashboard). All reads happen server-side and all writes go through
 * server actions — this client never touches data directly.
 *
 * `null` when the NEXT_PUBLIC_* env vars are missing (fresh clone / demo
 * mode) so consumers can degrade gracefully instead of crashing.
 */
function normalizeSupabaseUrl(url: string): string {
  try {
    return new URL(url.trim()).origin;
  } catch {
    return url.trim();
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url) && Boolean(anonKey);

let cached: SupabaseClient | null = null;

export function getBrowserSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured || typeof window === "undefined") return null;
  if (!cached) {
    cached = createSupabaseClient(normalizeSupabaseUrl(url as string), anonKey as string, {
      auth: { persistSession: false },
    });
  }
  return cached;
}
