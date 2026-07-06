-- fuel_prices: current pump prices, editable from /admin
create table if not exists public.fuel_prices (
  id uuid primary key default gen_random_uuid(),
  fuel_type text not null unique check (fuel_type in ('petrol_95', 'petrol_93', 'diesel_50ppm')),
  price numeric(6,2) not null,
  updated_at timestamptz not null default now()
);

-- seed the three rows the UI expects
insert into public.fuel_prices (fuel_type, price)
values
  ('petrol_95', 22.99),
  ('petrol_93', 22.79),
  ('diesel_50ppm', 20.49)
on conflict (fuel_type) do nothing;

alter table public.fuel_prices enable row level security;

-- anyone can read current prices (public site display)
create policy "fuel_prices_public_read"
  on public.fuel_prices for select
  to anon, authenticated
  using (true);

-- no insert/update/delete policies for anon/authenticated:
-- all writes go through the server action using the service role key.
