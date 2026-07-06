-- Create the public "station-photos" storage bucket and allow public read access.
-- This can be run in the SQL editor, or created via the Dashboard:
-- Storage > New bucket > name "station-photos" > Public bucket: ON

insert into storage.buckets (id, name, public)
values ('station-photos', 'station-photos', true)
on conflict (id) do nothing;

-- Public read access to files in this bucket
create policy "station_photos_public_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'station-photos');

-- Writes (upload/replace/delete) are done via the Supabase Dashboard or the
-- service role key from /admin — no anon/authenticated write policy is created,
-- so the public cannot upload files.
