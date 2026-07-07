-- specials: owner-managed running promotions, shown on /specials
create table if not exists public.specials (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists specials_active_sort_idx
  on public.specials (is_active, sort_order);

alter table public.specials enable row level security;

-- public site only ever queries is_active = true, but the read policy
-- itself is unrestricted (same pattern as the other content tables) —
-- all writes go through the service role key from /admin.
create policy "specials_public_read"
  on public.specials for select
  to anon, authenticated
  using (true);
