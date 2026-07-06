-- notification_signups: "get notified when prices drop" opt-in capture
create table if not exists public.notification_signups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  created_at timestamptz not null default now(),
  consented_at timestamptz not null default now()
);

alter table public.notification_signups enable row level security;

-- allow anonymous inserts only (the public opt-in form), no read/update/delete
-- for anon/authenticated — the owner reads this list from the Supabase dashboard
-- or via the service role key from /admin.
create policy "notification_signups_public_insert"
  on public.notification_signups for insert
  to anon, authenticated
  with check (true);
