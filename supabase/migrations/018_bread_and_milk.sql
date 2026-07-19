-- Adds bread and plain milk to the menu (missing from the shelf-photo batches).

insert into public.cafe_products (category, name, description, price, sort_order) values
  ('fresh_bakery', 'Albany Bread', 'Sliced White, Brown and Wholewheat loaves, baked fresh.', null, 7),
  ('fresh_bakery', 'Sasko Bread', 'Sliced White, Brown and Wholewheat loaves.', null, 8),
  ('cold_drinks', 'Douglasdale Fresh Milk', 'Full Cream and Low Fat, 1L and 2L, ice cold.', null, 40);
