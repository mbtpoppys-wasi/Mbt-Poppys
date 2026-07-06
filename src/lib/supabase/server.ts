import { createClient as createSupabaseClient } from "@supabase/supabase-js";

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

  return createSupabaseClient(url, anonKey, {
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

  return createSupabaseClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
