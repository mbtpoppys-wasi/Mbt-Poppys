// Client-safe helper (no server-only imports) for building public URLs into
// the "station-photos" Supabase Storage bucket, used by both server
// components (via lib/data.ts) and client components directly.
//
// The env value must be reduced to its origin: the deployed
// NEXT_PUBLIC_SUPABASE_URL carries a "/rest/v1/" path segment, which the
// server client already normalizes away (see lib/supabase/server.ts) — without
// the same treatment here every storage URL 404s and product/gallery images
// silently break.
export function getStoragePhotoUrl(filename: string): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return "";

  let origin: string;
  try {
    origin = new URL(url.trim()).origin;
  } catch {
    origin = url.trim().replace(/\/+$/, "");
  }

  return `${origin}/storage/v1/object/public/station-photos/${filename}`;
}
