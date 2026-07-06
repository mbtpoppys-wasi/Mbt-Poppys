-- cafe_products: BUZZ Café product listing, no price column by design
create table if not exists public.cafe_products (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('fresh_bakery', 'cold_drinks', 'travel_snacks')),
  name text not null,
  description text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists cafe_products_category_sort_idx
  on public.cafe_products (category, sort_order);

alter table public.cafe_products enable row level security;

create policy "cafe_products_public_read"
  on public.cafe_products for select
  to anon, authenticated
  using (true);

-- seed a starter menu
insert into public.cafe_products (category, name, description, sort_order) values
  ('fresh_bakery', 'Farmhouse Vetkoek', 'Golden, fluffy vetkoek made fresh in-store throughout the day.', 1),
  ('fresh_bakery', 'Bacon & Egg Roll', 'Toasted roll stacked with crispy bacon and a fried egg.', 2),
  ('fresh_bakery', 'Cheese Griller Roll', 'Grilled cheese griller in a soft white roll.', 3),
  ('cold_drinks', 'Iced Coffee', 'Chilled, ready-to-drink iced coffee from the BUZZ Café fridge.', 1),
  ('cold_drinks', 'Sparkling Water', 'Ice-cold sparkling water, various flavours.', 2),
  ('cold_drinks', 'Energy Drink', 'Popular energy drink brands kept ice-cold for the road.', 3),
  ('travel_snacks', 'Biltong Packet', 'Locally sourced biltong, packed for the road.', 1),
  ('travel_snacks', 'Chips & Crisps', 'A wide range of chip and crisp flavours by the till point.', 2),
  ('travel_snacks', 'Chocolate & Sweets', 'Grab-and-go chocolates and sweets for the trip.', 3)
on conflict do nothing;
