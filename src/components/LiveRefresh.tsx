"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabase/client";

// Tables whose changes should live-refresh visitor pages. Realtime must be
// enabled on each (supabase/migrations/014_enable_realtime.sql, or
// Dashboard → Database → Replication) or events silently never arrive.
const LIVE_TABLES = [
  "fuel_prices",
  "status_banner",
  "cafe_products",
  "cafe_gallery",
  "gallery_images",
  "specials",
  "fuel_announcements",
];

/**
 * Refetch-on-signal for a server-rendered Next.js app: subscribe to
 * postgres_changes on all public content tables and, on ANY event, re-run
 * the server components via router.refresh(). We deliberately don't patch
 * state from the realtime payload — a full refetch is simpler and
 * bulletproof at this scale. Admin saves therefore reach every open
 * visitor browser within ~1s, no reload needed.
 */
export default function LiveRefresh() {
  const router = useRouter();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const supabase = getBrowserSupabase();
    if (!supabase) return;

    // Debounce: a burst of events (e.g. bulk edits) → one refresh.
    const scheduleRefresh = () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => router.refresh(), 400);
    };

    let channel = supabase.channel("mbt-live-content");
    for (const table of LIVE_TABLES) {
      channel = channel.on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        scheduleRefresh
      );
    }
    channel.subscribe();

    return () => {
      if (timer.current) clearTimeout(timer.current);
      void supabase.removeChannel(channel);
    };
  }, [router]);

  return null;
}
