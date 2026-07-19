-- Adds a free-text "custom status" to cafe_products and specials so the
-- owner can write things like "Never returning" or "Returning 07/02/26"
-- instead of being limited to the fixed status options.
--
-- cafe_products: a new 'custom' status value shows status_text as the badge
-- instead of the usual Available/Out of Stock/etc label.
--
-- specials: status_text is independent of is_active — when set, the special
-- stays visible on the public /specials page (dimmed, showing the custom
-- message) even while turned off, instead of disappearing completely.

alter table public.cafe_products
  add column if not exists status_text text;

alter table public.cafe_products drop constraint if exists cafe_products_status_check;
alter table public.cafe_products add constraint cafe_products_status_check
  check (status in ('available', 'out_of_stock', 'coming_soon', 'temporarily_removed', 'custom'));

alter table public.specials
  add column if not exists status_text text;
