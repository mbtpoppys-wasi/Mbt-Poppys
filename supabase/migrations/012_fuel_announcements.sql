-- fuel_announcements: owner-posted manual fuel price notices, shown at the
-- top of /fuel-updates (and a preview on the homepage), alongside the
-- automatic South African fuel news feed (no table needed for that part —
-- it's fetched live from public RSS feeds, see src/lib/news-feed.ts).
create table if not exists public.fuel_announcements (
  id uuid primary key default gen_random_uuid(),
  message text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists fuel_announcements_active_created_idx
  on public.fuel_announcements (is_active, created_at desc);

alter table public.fuel_announcements enable row level security;

create policy "fuel_announcements_public_read"
  on public.fuel_announcements for select
  to anon, authenticated
  using (true);
