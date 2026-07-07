-- Run this in the Supabase SQL editor to refresh fuel prices to current
-- real-world rates and swap in a more realistic starter BUZZ Café menu.
-- Safe to re-run; it only updates/replaces rows, no schema changes.

-- 1. Update current fuel prices
update public.fuel_prices set price = 26.10, updated_at = now() where fuel_type = 'petrol_95';
update public.fuel_prices set price = 25.94, updated_at = now() where fuel_type = 'petrol_93';
update public.fuel_prices set price = 24.78, updated_at = now() where fuel_type = 'diesel_50ppm';

-- 2. Replace the starter cafe_products menu with more realistic items (no price column, by design)
delete from public.cafe_products;

insert into public.cafe_products (category, name, description, sort_order) values
  ('fresh_bakery', 'Filter Coffee & Fresh Pastries', 'Freshly brewed coffee paired with pastries baked in-store daily.', 1),
  ('fresh_bakery', 'Golden Pepper Steak Pie', 'Flaky golden crust pastry packed with seasoned steak filling.', 2),
  ('fresh_bakery', 'Savoury Sausage Roll', 'Freshly baked on-site roll with a spiced sausage filling.', 3),
  ('fresh_bakery', 'Toasted Ham & Cheese', 'Classic toasted sandwich, made fresh to order.', 4),
  ('cold_drinks', 'Coca-Cola Original 500ml', 'Ice-cold Coca-Cola straight from our in-store chillers.', 1),
  ('cold_drinks', 'Energade Sports Drink', 'Rehydration drink for long-distance driving.', 2),
  ('cold_drinks', 'Monster Energy', 'Energy drink kept ice-cold for night-shift drivers.', 3),
  ('cold_drinks', 'Valpré Still Water', 'Pure, crisp, cold still water.', 4),
  ('travel_snacks', 'Simba Chips', 'Classic South African chip flavours for the road.', 1),
  ('travel_snacks', 'Cadbury Dairy Milk', 'Smooth milk chocolate, grab-and-go.', 2),
  ('travel_snacks', 'Biltong Sticks', 'Locally cured biltong, packed for travel.', 3),
  ('travel_snacks', 'Bagged Ice 2kg', 'Frozen ice blocks for coolers and long trips.', 4);
