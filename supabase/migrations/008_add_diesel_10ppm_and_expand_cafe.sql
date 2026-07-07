-- Run this in the Supabase SQL editor to:
--   1. Update fuel prices to the current real-world rates
--   2. Add a second diesel grade (10ppm) alongside the existing 50ppm
--   3. Expand the BUZZ Cafe category list to cover the full in-store range
--      (tobacco/vapes, braai & outdoor, and essentials/ATM/OTC meds)
--   4. Refresh the cafe_products menu to match (still no price column)
-- Safe to re-run.

-- 1 & 2. Allow 'diesel_10ppm' and update current prices
alter table public.fuel_prices drop constraint if exists fuel_prices_fuel_type_check;
alter table public.fuel_prices add constraint fuel_prices_fuel_type_check
  check (fuel_type in ('petrol_95', 'petrol_93', 'diesel_50ppm', 'diesel_10ppm'));

update public.fuel_prices set price = 26.31, updated_at = now() where fuel_type = 'petrol_95';
update public.fuel_prices set price = 26.15, updated_at = now() where fuel_type = 'petrol_93';
update public.fuel_prices set price = 27.74, updated_at = now() where fuel_type = 'diesel_50ppm';

insert into public.fuel_prices (fuel_type, price)
values ('diesel_10ppm', 28.74)
on conflict (fuel_type) do update set price = excluded.price, updated_at = now();

-- 3. Expand cafe_products categories
alter table public.cafe_products drop constraint if exists cafe_products_category_check;
alter table public.cafe_products add constraint cafe_products_category_check
  check (category in (
    'fresh_bakery', 'cold_drinks', 'travel_snacks',
    'tobacco_vapes', 'braai_outdoor', 'essentials'
  ));

-- 4. Refresh the full menu
delete from public.cafe_products;

insert into public.cafe_products (category, name, description, sort_order) values
  ('fresh_bakery', 'Filter Coffee & Fresh Pastries', 'Freshly brewed coffee paired with pastries baked in-store daily.', 1),
  ('fresh_bakery', 'Halal-Certified Pies', 'Golden pastry pies, Halal certified.', 2),
  ('fresh_bakery', 'Savoury Sausage Roll', 'Freshly baked on-site roll with a spiced sausage filling.', 3),
  ('fresh_bakery', 'Toasted Ham & Cheese', 'Classic toasted sandwich, made fresh to order.', 4),

  ('cold_drinks', 'Coca-Cola Original 500ml', 'Ice-cold Coca-Cola straight from our in-store chillers.', 1),
  ('cold_drinks', 'Energy Drinks', 'Monster, Red Bull and more, kept ice-cold for night-shift drivers.', 2),
  ('cold_drinks', 'Fresh Milk', 'Cold fresh milk, kept at some of the best prices in town.', 3),
  ('cold_drinks', 'Ice Cream', 'A range of ice creams and frozen treats.', 4),
  ('cold_drinks', 'Valpré Still Water', 'Pure, crisp, cold still water.', 5),

  ('travel_snacks', 'Simba Chips', 'Classic South African chip flavours for the road.', 1),
  ('travel_snacks', 'Sweets & Chocolates', 'Grab-and-go sweets and chocolates.', 2),
  ('travel_snacks', 'Biltong Sticks', 'Locally cured biltong, packed for travel.', 3),
  ('travel_snacks', 'Fresh Bread', 'Fresh bread, kept at some of the best prices in town.', 4),

  ('tobacco_vapes', 'Cigarettes', 'A range of cigarette brands available at the till.', 1),
  ('tobacco_vapes', 'Vapes', 'Disposable and refillable vapes.', 2),
  ('tobacco_vapes', 'Tobacco', 'Rolling tobacco and accessories.', 3),

  ('braai_outdoor', 'Bagged Ice 2kg', 'Frozen ice blocks for coolers and long trips.', 1),
  ('braai_outdoor', 'Charcoal', 'Bagged charcoal, ready for the fire.', 2),
  ('braai_outdoor', 'Firewood', 'Bundled firewood for the braai.', 3),
  ('braai_outdoor', 'Braai Accessories', 'Basic braai tools and accessories.', 4),

  ('essentials', 'Over-the-Counter Medication', 'Basic unprescribed medication available at the till.', 1),
  ('essentials', 'ATM — FNB, Standard Bank & Capitec', 'Cash withdrawals available on-site from three major banks.', 2);
