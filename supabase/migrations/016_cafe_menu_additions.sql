-- Second batch of real BUZZ Café menu items (owner's shelf photos, July 2026):
-- crisps, chocolates, biscuits, more soft/energy drinks and braai accessories.
-- Consolidated one item per brand/range with flavours in the description.
-- Safe to re-run (deletes its own rows first, updates are idempotent-ish).

-- ── Fixes to batch 1 ────────────────────────────────────────────────────────
-- The cookie boxes are Kenro, not "Khairo" (misread from the first photo).
update public.cafe_products
set name = 'Kenro Cookies',
    description = 'Classic Choc Chip and Salted Caramel Chip cookies.',
    price = 22.00
where name in ('Khairo Cookies', 'Kenro Cookies');

-- Power Play also comes as a 500ml bottle at R15.00 (cans stay R20.50).
update public.cafe_products
set description = 'All flavours: Kiwi, Apple Kiwi, Original Zero Sugar, Zero Sugar, Mango, Passion Fruit. 500ml bottle also available - R15.00.'
where name = 'Power Play Energy Drink';

-- Maynards also sells wine gum rolls and jelly babies packets.
update public.cafe_products
set description = 'Dual Magic, Sour Jelly Babies, Fruit Pastilles, Sweet & Sour Fruit Jube, Jelly Beans, Wine Gums. Wine gum rolls & Jelly Babies packets too.'
where name = 'Maynards Hanging Bags 60g';

-- ── New items ───────────────────────────────────────────────────────────────
delete from public.cafe_products where name in (
  'Sparletta, Sprite, Twist & Stoney',
  'Schweppes Mixers',
  'Kingsley 2L Soft Drinks',
  'Predator Energy Drink 500ml',
  'Steri Stumpie Flavoured Milk',
  'Fanta',
  'Red Bull',
  'Lipton Ice Tea',
  'Simba Chips',
  'Lay''s Chips',
  'Doritos',
  'Fritos',
  'NikNaks, Flings & Big Korn Bites',
  'Cadbury Chocolates',
  'Nestlé Chocolates',
  'Beacon Sweets',
  'Manhattan Jelly Sweets',
  'Chappies Bubblegum',
  'Bakers Biscuits',
  'Casa-Mia Biscuits',
  'LK''s Braai Accessories',
  'BBQ Lighters & Folding Grills'
);

insert into public.cafe_products (category, name, description, price, sort_order) values

-- Cold Drinks 🥤 (continue after 31)
('cold_drinks', 'Sparletta, Sprite, Twist & Stoney', 'Ice-cold bottles: Sparletta Creme Soda, Sprite & Sprite No Sugar, Twist Lemon, Stoney Ginger Beer.', 15.99, 32),
('cold_drinks', 'Schweppes Mixers', 'Soda Water, Lemon, Dry Lemon, Pineapple, Granadilla.', null, 33),
('cold_drinks', 'Kingsley 2L Soft Drinks', '2-litre bottles: Grape, Cola Original, Cola Light, Cream Soda, Ginger Beer.', 15.50, 34),
('cold_drinks', 'Predator Energy Drink 500ml', 'All flavours: Purple Rain, Spicy Ginger, Tropical, Mango Mayhem, Gold Strike.', 12.50, 35),
('cold_drinks', 'Steri Stumpie Flavoured Milk', 'The classic: Strawberry, Chocolate, Cream Soda, Banana.', null, 36),
('cold_drinks', 'Fanta', 'Orange and Grape - cans and bottles, ice cold.', null, 37),
('cold_drinks', 'Red Bull', 'Original and Sugarfree, ice cold.', null, 38),
('cold_drinks', 'Lipton Ice Tea', 'Peach and Lemon, chilled.', null, 39),

-- Travel Snacks 🍬 (continue after 13)
('travel_snacks', 'Bakers Biscuits', 'Eet-Sum-Mor, Red Label Lemon Creams, Blue Label Marie & Nuttikrust R52.00 - Romany Creams R40.00 - Choc-kits R38.00.', null, 14),
('travel_snacks', 'Casa-Mia Biscuits', 'Scottish Shortbread & Oats ''n Krunch R19.50 - Ginger Bites & Choc Chip Chunky R22.00.', null, 15),
('travel_snacks', 'Simba Chips', 'All flavours: Smoked Beef, Cheese & Onion, Mrs Ball''s Chutney, Salt & Vinegar and more.', null, 16),
('travel_snacks', 'Lay''s Chips', 'Lightly Salted, Caribbean Onion & Balsamic Vinegar and more.', null, 17),
('travel_snacks', 'Doritos', 'Sweet Chilli Pepper and Cheese Supreme.', null, 18),
('travel_snacks', 'Fritos', 'Tomato and Sweet Chilli corn chips.', null, 19),
('travel_snacks', 'NikNaks, Flings & Big Korn Bites', 'Maize snack favourites: NikNaks Cheese, Flings, Big Korn Bites.', null, 20),
('travel_snacks', 'Cadbury Chocolates', 'Dairy Milk, Top Deck, Wholenut & Mint Crisp slabs (standard & large) - Lunch Bar & Lunch Bar Maxi, PS & 5 Star bars - Astros boxes.', null, 21),
('travel_snacks', 'Nestlé Chocolates', 'Tex slabs & bars, Bar One (standard & large), Peppermint Crisp slabs, Crunch bars - KitKat 4-Finger & Chunky.', null, 22),
('travel_snacks', 'Beacon Sweets', 'Assorted sweet packets.', null, 23),
('travel_snacks', 'Manhattan Jelly Sweets', 'Assorted jelly sweet mixes.', null, 24),
('travel_snacks', 'Chappies Bubblegum', 'The old-school favourite - assorted flavours by the tub.', null, 25),

-- Braai & Outdoor 🔥 (continue after 2)
('braai_outdoor', 'LK''s Braai Accessories', 'Tongs, spatulas, basting brushes, grid cleaning brushes, stainless steel tongs and portable braai grids.', null, 3),
('braai_outdoor', 'BBQ Lighters & Folding Grills', 'Refillable BBQ lighters and folding braai grills.', null, 4);
