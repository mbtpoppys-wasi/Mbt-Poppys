-- Real BUZZ Café menu (from the owner's shelf photos, July 2026), consolidated
-- one item per brand/range with flavours listed in the description, plus:
--   1. price column on cafe_products (nullable — items without visible price tags stay blank)
--   2. cafe_gallery table for the in-store shelf photos shown at the top of /buzz-cafe
--
-- Run this whole file once in the Supabase SQL editor. It REPLACES the old
-- placeholder menu (the fabricated seed from migration 010) with the real one.

-- 1 ── price support ─────────────────────────────────────────────────────────
alter table public.cafe_products
  add column if not exists price numeric(8,2);

-- 2 ── café shelf-photo gallery ──────────────────────────────────────────────
create table if not exists public.cafe_gallery (
  id uuid primary key default gen_random_uuid(),
  filename text not null,
  caption text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.cafe_gallery enable row level security;

drop policy if exists "Public read cafe gallery" on public.cafe_gallery;
create policy "Public read cafe gallery" on public.cafe_gallery
  for select using (true);
-- No public write policies: all writes go through the server-side service role.

-- realtime so uploads appear on open visitor pages instantly
do $$
begin
  execute 'alter publication supabase_realtime add table public.cafe_gallery';
exception
  when duplicate_object then null;
end $$;

-- 3 ── the real menu ─────────────────────────────────────────────────────────
delete from public.cafe_products;

insert into public.cafe_products (category, name, description, price, sort_order) values

-- Fresh Bakery ☕ (pies + Douwe Egberts coffee counter)
('fresh_bakery', 'Golden Foods Pies', 'Steak Curry, Chicken Curry and more — the full Golden Foods range, served warm.', null, 1),
('fresh_bakery', 'Black Coffee', 'Douwe Egberts. Regular R12.00 • Mega R17.00.', 12.00, 2),
('fresh_bakery', 'White Coffee', 'Douwe Egberts. Regular R15.00 • Mega R26.00.', 15.00, 3),
('fresh_bakery', 'Cappuccino', 'Douwe Egberts. Regular R18.00 • Mega R25.00.', 18.00, 4),
('fresh_bakery', 'Coffee Flavour Syrup Add-On', 'Caramel, Vanilla, Hazelnut or Roasted Almond — Regular +R5.00 • Mega +R8.00.', 5.00, 5),
('fresh_bakery', 'Iced Coffee (Mega)', 'Caramel, Vanilla, Hazelnut or Roasted Almond.', 35.00, 6),

-- Cold Drinks 🥤
('cold_drinks', 'Powerade Sports Drink', 'All flavours: Grape, Springboks Edition, Fruit Punch, Naartjie, Jagged Ice, Mountain Blast, Orange.', 19.00, 1),
('cold_drinks', 'Energade & Energade Zero', 'Assorted flavours: Tropical, Blueberry • Zero: Berry, Naartjie, Blueberry.', 19.99, 2),
('cold_drinks', 'Switch Energy Drink', 'All flavours: Oh Choc, Knox Ignite, SA20 Blue Lemonade, Granadilla & Gooseberry, Fruit Salad, Vitac + Zinc, Iced Tea Lemon & Peach, Tribal, Pear & Cherry, Mr Pop, Swag, Flow.', 13.00, 3),
('cold_drinks', 'Biogen Force Energy Drink', 'Assorted berry and orange variants.', 13.00, 4),
('cold_drinks', 'Monster Energy', 'All flavours: Classic, Ultra Paradise, Ultra Fiesta Mango, Ultra Strawberry Dreams, Ultra Rosa, Punch Mixxd, Lando Norris Edition, Zero Sugar, Pacific Punch.', 26.50, 5),
('cold_drinks', 'Power Play Energy Drink', 'All flavours: Kiwi, Apple Kiwi, Original Zero Sugar, Zero Sugar, Mango, Passion Fruit.', 20.50, 6),
('cold_drinks', 'McNab''s Protein & Energy Drinks', 'Latte Caramel, Frappe Cheesecake, Frappe Strawberry (10g protein) • SuperCharge Brazilian Guarana.', null, 7),
('cold_drinks', 'Clover Krush 1L Cartons', 'Mango Passion, Crisp Apple, Orange Fusion, Cranberry Crush.', 39.50, 8),
('cold_drinks', 'Clover Krush 1.5L 100% Juice', 'Orange, Tropical, Berries, Mango, Red Grape, 6 Fruits & Fibre, Cranberry.', 54.00, 9),
('cold_drinks', 'Liqui-Fruit 1L Juice', 'Cranberry, Clear Apple, Orange, Mango Orange, Breakfast Blend.', 49.00, 10),
('cold_drinks', 'Rhodes Quality 1L Juice', 'Pineapple and Apple — 100% juice.', 39.50, 11),
('cold_drinks', 'Cappy Still Breakfast Blend 1L', '100% juice blend.', 32.00, 12),
('cold_drinks', 'Fruitree Nectar', 'Red Grape and Tropical.', 19.50, 13),
('cold_drinks', 'A-King Aloe Vera 500ml', 'With basil seeds: Cranberry, Pomegranate, Mango, Original.', 17.00, 14),
('cold_drinks', 'Vita 24 Vitamin Boost 500ml', 'Sugar free: Blueberry, Lime & Lime, Passion Fruit.', 17.00, 15),
('cold_drinks', 'aQuellé Sparkling Flavoured Water 1.5L', 'Naartjie, Honey Melon, Granadilla, Strawberry, Watermelon.', 25.50, 16),
('cold_drinks', 'Thirsti Natural Still Water', 'With sports cap.', 14.00, 17),
('cold_drinks', 'Manzi Still Water', '', 12.00, 18),
('cold_drinks', 'Bonaqua Pump Still Water', 'Larger size also available — R18.50.', 15.50, 19),
('cold_drinks', 'Valpré Still & Sparkling Water', '', 22.00, 20),
('cold_drinks', 'Bonaqua Alkaline Ionized Water pH10', '', 22.00, 21),
('cold_drinks', 'Clover Tropika', 'Pineapple, Blueberry Cheesecake, Mango & Peach, Orange, Litchi, Peach.', 25.99, 22),
('cold_drinks', 'Clover Super M Flavoured Milk', 'Lemon Cream Biscuit, Cream Soda, Strawberry, Bubblegum, Chocolate.', 17.99, 23),
('cold_drinks', 'Clover Super M Mini', 'Strawberry and Chocolate.', 21.99, 24),
('cold_drinks', 'Clover Krush Cans & Small Cartons', 'Assorted flavours.', 18.50, 25),
('cold_drinks', 'Clover Bliss Dessert Cream', '', 14.00, 26),
('cold_drinks', 'Nestlé Milo Ready-To-Drink', 'Malt flavour.', 21.99, 27),
('cold_drinks', 'USN Protein Shake', 'Vanilla Caramel and Chocolate.', 17.99, 28),
('cold_drinks', 'Mageu — Number 1 & Maba', 'Number 1: Smooth Strawberry Cream, Creamy Vanilla, Banana Custard • Maba: Original/Malt.', null, 29),
('cold_drinks', 'Coca-Cola Bottles', 'Original taste, ice cold.', null, 30),
('cold_drinks', 'Pepsi, Mirinda & 7up 2L', 'Pepsi Regular, Mirinda Orange, 7up Sugar Free Lemon & Lime.', null, 31),

-- Travel Snacks 🍬
('travel_snacks', 'Maynards Hanging Bags 60g', 'Dual Magic, Sour Jelly Babies, Fruit Pastilles, Sweet & Sour Fruit Jube, Jelly Beans, Wine Gums.', 15.50, 1),
('travel_snacks', 'Mister Sweet Hanging Bags', 'Speckled Eggs, Vampire Fangs, Fantazzmix, Sour Glow Worms, Juicy Jellies, Softmints Spearmint.', 15.50, 2),
('travel_snacks', 'Mentos Chews & Dragees', 'Incredible Chew Strawberry, Rainbow, Grape Mix, Mint.', 18.00, 3),
('travel_snacks', 'Mentos Full Fresh Gum Bottles', 'Pink, Red, Purple & Green R60.00 • Blue variants R69.00 • Fresh Action also available.', 60.00, 4),
('travel_snacks', 'Orbit Professional Multi-Packs', 'Red and blue multi-packs.', 59.00, 5),
('travel_snacks', 'Airwaves Blackcurrant Multi-Packs', '', 65.00, 6),
('travel_snacks', 'Halls Lozenges', 'Mentholyptus Ice Blue and Cherry — 10 lozenges.', 15.00, 7),
('travel_snacks', 'Fisherman''s Friend 25g', 'Cherry, Aniseed, Mint, Blackcurrant, Original, Honey & Lemon.', 18.00, 8),
('travel_snacks', 'Funky Bitz 32g', '', null, 9),
('travel_snacks', 'Khairo Cookies', 'Classic Choc Chip and Caramel Chip.', null, 10),
('travel_snacks', 'Shirwood Biltong', 'Snapstix BBQ, Sliced Plain & Sliced Chili R49.00 • Sliced Spicy R45.00.', 49.00, 11),
('travel_snacks', 'TKs Biltong & Stokkies', 'Animal Biltong BBQ Sliced and Stokkies.', 45.00, 12),
('travel_snacks', 'Ice Cream Freezer', 'Cadbury Crunchie Blast, Dairy Milk & Hazelnut, 5Star, Flake Cone, Bar One Cone, King Cone, Oreo sticks & sandwiches, KitKat, Wafer Wizz, Zooty pops, Live Strawberry & more — from R19.00 to R47.00.', null, 13),

-- Tobacco & Vapes 🚬
('tobacco_vapes', 'Elfbar EW18000 Prefilled Pods', 'Mango Peach Watermelon, Pink Lemonade, Peach, Springbok Edition, Cherry Lemon Peach, Sour Lush, California Cherry, Cotton Candy Ice, Lychee Raspberry, Berry Grape, Strawberry Ice.', null, 1),
('tobacco_vapes', 'Elfbar EW9000 Prefilled Pods', 'Sour Lush, California Cherry, Blue Razz, Pink Lemonade, Mango, Peach, Grape, Cherry Strazz, Watermelon, Miami Mint, Dragon Strawnana.', null, 2),

-- Braai & Outdoor 🔥
('braai_outdoor', 'Namib Firelighters 12-Pack', '', null, 1),
('braai_outdoor', 'Rafa''s Light Your Fire Firelighters', '', null, 2),

-- Essentials 🏧
('essentials', 'Clover Bliss Double Cream Yoghurt', 'Strawberry & Cream and Choc Chip — large tub R36.00 • 150g small tub R17.50.', 36.00, 1),
('essentials', 'Custard King Vanilla Custard 1kg', '', null, 2),
('essentials', 'Rama Original 70% Fat Spread 1kg', '', null, 3),
('essentials', 'Areon Fresco Car Air Fresheners', 'Beverly Hills, Tortuga, New Car, Hawaii, Apple, Citrus Squash.', null, 4);
