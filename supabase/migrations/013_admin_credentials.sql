-- admin_credentials: the /admin login now checks against this table instead
-- of Vercel environment variables. Schema only here — no real email or
-- password is committed to the repo. RLS is enabled with NO policies at
-- all, so this table is completely inaccessible to anon/authenticated
-- (including the publishable/anon key) and can only be read or written
-- using the service role key from server actions.
create table if not exists public.admin_credentials (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.admin_credentials enable row level security;
-- Intentionally no policies: RLS with zero policies denies all access to
-- anon/authenticated roles by default. Only the service role bypasses RLS.

-- After running this file, run the INSERT statement given separately in
-- chat (with your real email + a bcrypt hash of your password) directly in
-- the SQL editor — never commit real credentials to this migrations folder.
