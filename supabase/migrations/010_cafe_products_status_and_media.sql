-- Adds status/best-price/image support to cafe_products, and refreshes the
-- menu with the full realistic product range across all six categories.
-- Safe to re-run.

alter table public.cafe_products
  add column if not exists status text not null default 'available',
  add column if not exists is_best_price boolean not null default false,
  add column if not exists image_filename text;

alter table public.cafe_products drop constraint if exists cafe_products_status_check;
alter table public.cafe_products add constraint cafe_products_status_check
  check (status in ('available', 'out_of_stock', 'coming_soon', 'temporarily_removed'));

-- Full menu refresh
delete from public.cafe_products;

insert into public.cafe_products (category, name, description, sort_order, is_best_price) values
  -- Fresh Bakery
  ('fresh_bakery', 'Filter Coffee & Fresh Pastries', 'Freshly brewed coffee paired with pastries baked in-store daily.', 1, false),
  ('fresh_bakery', 'Ricoffy & Nescafé Instant Coffee', 'Grab-and-go instant coffee sachets and tins.', 2, false),
  ('fresh_bakery', 'Halal-Certified Pies', 'Golden pastry pies, Halal certified.', 3, false),
  ('fresh_bakery', 'Savoury Sausage Roll', 'Freshly baked on-site roll with a spiced sausage filling.', 4, false),
  ('fresh_bakery', 'Toasted Ham & Cheese', 'Classic toasted sandwich, made fresh to order.', 5, false),
  ('fresh_bakery', 'Vetkoek', 'Golden, fluffy vetkoek made fresh in-store.', 6, false),
  ('fresh_bakery', 'Cheese Griller Roll', 'Grilled cheese griller in a soft white roll.', 7, false),

  -- Cold Drinks
  ('cold_drinks', 'Coca-Cola Original 500ml', 'Ice-cold Coca-Cola straight from our in-store chillers.', 1, false),
  ('cold_drinks', 'Fanta & Sprite', 'Ice-cold Fanta and Sprite, various flavours.', 2, false),
  ('cold_drinks', 'Stoney Ginger Beer', 'The classic South African ginger beer, ice-cold.', 3, false),
  ('cold_drinks', 'Score Energy Drink', 'Affordable energy drink kept ice-cold.', 4, false),
  ('cold_drinks', 'Powerade', 'Sports rehydration drink for the road.', 5, false),
  ('cold_drinks', 'Energade Sports Drink', 'Rehydration drink for long-distance driving.', 6, false),
  ('cold_drinks', 'Monster Energy', 'Energy drink kept ice-cold for night-shift drivers.', 7, false),
  ('cold_drinks', 'Red Bull', 'Ice-cold Red Bull energy drink.', 8, false),
  ('cold_drinks', 'Fresh Milk', 'Cold fresh milk, kept at some of the best prices in town.', 9, true),
  ('cold_drinks', 'Steri Stumpie', 'Flavoured milk in the classic steri stumpie carton.', 10, false),
  ('cold_drinks', 'Valpré Still Water', 'Pure, crisp, cold still water.', 11, false),
  ('cold_drinks', 'Sparkling Water', 'Ice-cold sparkling water, various flavours.', 12, false),
  ('cold_drinks', 'Ice Cream Tubs & Cones', 'A range of ice creams and frozen treats.', 13, false),

  -- Travel Snacks
  ('travel_snacks', 'Simba Chips', 'Classic South African chip flavours for the road.', 1, false),
  ('travel_snacks', 'NikNaks', 'Cheesy corn curl snacks, a local favourite.', 2, false),
  ('travel_snacks', 'Lay''s Chips', 'Lightly salted and flavoured potato chips.', 3, false),
  ('travel_snacks', 'Doritos', 'Bold flavoured tortilla chips.', 4, false),
  ('travel_snacks', 'Cadbury Dairy Milk', 'Smooth Cadbury Dairy Milk chocolate.', 5, false),
  ('travel_snacks', 'Cadbury Whole Nut', 'Cadbury Dairy Milk with whole hazelnuts.', 6, false),
  ('travel_snacks', 'Cadbury Mint', 'Cadbury Dairy Milk with a smooth mint filling.', 7, false),
  ('travel_snacks', 'Cadbury Lunch Bar', 'Peanut and nougat chocolate bar.', 8, false),
  ('travel_snacks', 'Bar One', 'Caramel and nougat chocolate bar.', 9, false),
  ('travel_snacks', 'Tex Bar', 'Crunchy peanut butter flavoured bar.', 10, false),
  ('travel_snacks', 'Peppermint Crisp', 'Chocolate bar with a crunchy mint centre.', 11, false),
  ('travel_snacks', 'Top Deck', 'Half milk, half white chocolate bar.', 12, false),
  ('travel_snacks', 'Romany Creams', 'Chocolate-coated coconut biscuits.', 13, false),
  ('travel_snacks', 'Chappies Bubblegum', 'Classic South African bubblegum.', 14, false),
  ('travel_snacks', 'Wilson''s Toffees', 'Assorted classic toffees.', 15, false),
  ('travel_snacks', 'Biltong Sticks', 'Locally cured biltong, packed for travel.', 16, false),
  ('travel_snacks', 'Droëwors', 'Traditional dried sausage snack sticks.', 17, false),
  ('travel_snacks', 'Ouma Rusks', 'Classic South African buttermilk rusks.', 18, false),
  ('travel_snacks', 'Pringles', 'Stackable potato crisps in a can.', 19, false),
  ('travel_snacks', 'Fresh Bread', 'Fresh bread, kept at some of the best prices in town.', 20, true),

  -- Tobacco & Vapes
  ('tobacco_vapes', 'Cigarettes', 'A range of cigarette brands available at the till.', 1, false),
  ('tobacco_vapes', 'Disposable Vapes', 'Popular disposable vape brands and flavours.', 2, false),
  ('tobacco_vapes', 'Rolling Tobacco', 'Rolling tobacco and rolling papers.', 3, false),
  ('tobacco_vapes', 'Lighters & Matches', 'Lighters and matches at the till point.', 4, false),

  -- Braai & Outdoor
  ('braai_outdoor', 'Bagged Ice 2kg', 'Frozen ice blocks for coolers and long trips.', 1, false),
  ('braai_outdoor', 'Charcoal', 'Bagged charcoal, ready for the fire.', 2, false),
  ('braai_outdoor', 'Firewood', 'Bundled firewood for the braai.', 3, false),
  ('braai_outdoor', 'Braai Accessories', 'Tongs, skewers, and fire lighters.', 4, false),

  -- Essentials
  ('essentials', 'Over-the-Counter Medication', 'Basic unprescribed medication available at the till.', 1, false),
  ('essentials', 'ATM — FNB, Standard Bank & Capitec', 'Cash withdrawals available on-site from three major banks.', 2, false),
  ('essentials', 'Airtime & Data', 'Airtime and data for all major networks.', 3, false),
  ('essentials', 'Phone Chargers & Accessories', 'Basic charging cables and adapters.', 4, false);
