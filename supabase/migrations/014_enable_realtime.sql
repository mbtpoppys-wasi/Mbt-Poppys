-- Enable Supabase Realtime on all public content tables so admin edits
-- reach open visitor browsers instantly (see src/components/LiveRefresh.tsx).
--
-- Equivalent to Dashboard → Database → Replication → supabase_realtime.
-- Wrapped so re-running is safe if a table was already added by hand.
-- NOTE: admin_credentials is deliberately NOT added — it must never be
-- broadcast, and its RLS has no SELECT policy anyway.

DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'fuel_prices',
    'status_banner',
    'cafe_products',
    'gallery_images',
    'specials',
    'fuel_announcements'
  ]
  LOOP
    BEGIN
      EXECUTE format('ALTER PUBLICATION supabase_realtime ADD TABLE public.%I', t);
    EXCEPTION
      WHEN duplicate_object THEN NULL; -- already in the publication
    END;
  END LOOP;
END $$;

-- Realtime delivers full row data on UPDATE/DELETE only with REPLICA
-- IDENTITY FULL; we only use events as a "something changed" signal, so
-- the default identity is fine.
