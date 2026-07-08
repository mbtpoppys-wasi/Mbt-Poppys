-- Adds an optional promo image to specials, uploaded via /admin into the
-- existing "station-photos" bucket.
alter table public.specials
  add column if not exists image_filename text;
