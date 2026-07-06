-- status_banner: single-row dismissible banner state (e.g. generator/load-shedding status)
create table if not exists public.status_banner (
  id uuid primary key default gen_random_uuid(),
  is_active boolean not null default false,
  message text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.status_banner enable row level security;

create policy "status_banner_public_read"
  on public.status_banner for select
  to anon, authenticated
  using (true);

-- seed a single row that the admin page edits in place
insert into public.status_banner (is_active, message)
select false, 'Generator active — all pumps operational'
where not exists (select 1 from public.status_banner);
