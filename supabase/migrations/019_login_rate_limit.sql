-- Server-side login rate limiting. The existing lockout in
-- AdminLoginScreen.tsx is client-side only (localStorage) — trivially
-- bypassed by clearing storage, using a private window, or scripting the
-- server action directly. This table enforces the same 5-attempts /
-- 5-minute lockout on the server, where it can't be bypassed.
--
-- No RLS policies (same pattern as admin_credentials): only the
-- service-role client (used exclusively in lib/auth.ts) can ever touch
-- this table.

create table if not exists public.login_attempts (
  identifier   text primary key,       -- normalized email attempted
  failed_count int not null default 0,
  locked_until timestamptz,
  updated_at   timestamptz not null default now()
);

alter table public.login_attempts enable row level security;
