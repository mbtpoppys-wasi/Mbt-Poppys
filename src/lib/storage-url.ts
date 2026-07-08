// Client-safe helper (no server-only imports) for building public URLs into
// the "station-photos" Supabase Storage bucket, used by both server
// components (via lib/data.ts) and client components directly.
export function getStoragePhotoUrl(filename: string): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return "";
  return `${url}/storage/v1/object/public/station-photos/${filename}`;
}
