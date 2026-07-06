-- gallery_images: metadata for photos stored in the public "station-photos" bucket
create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  filename text not null,
  alt_text text not null,
  caption text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists gallery_images_sort_idx
  on public.gallery_images (sort_order);

alter table public.gallery_images enable row level security;

create policy "gallery_images_public_read"
  on public.gallery_images for select
  to anon, authenticated
  using (true);
