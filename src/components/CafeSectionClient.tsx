"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { CafeCategory, CafeProduct } from "@/lib/types";
import { getStoragePhotoUrl } from "@/lib/storage-url";

const CATEGORY_TABS: { key: CafeCategory; label: string; icon: string }[] = [
  { key: "fresh_bakery", label: "Fresh Bakery", icon: "☕" },
  { key: "cold_drinks", label: "Cold Drinks", icon: "🥤" },
  { key: "travel_snacks", label: "Travel Snacks", icon: "🍬" },
  { key: "tobacco_vapes", label: "Tobacco & Vapes", icon: "🚬" },
  { key: "braai_outdoor", label: "Braai & Outdoor", icon: "🔥" },
  { key: "essentials", label: "Essentials", icon: "🏧" },
];

const CATEGORY_LABELS: Record<CafeCategory, string> = Object.fromEntries(
  CATEGORY_TABS.map((t) => [t.key, t.label])
) as Record<CafeCategory, string>;

const CATEGORY_ORDER: Record<CafeCategory, number> = Object.fromEntries(
  CATEGORY_TABS.map((t, i) => [t.key, i])
) as Record<CafeCategory, number>;

// "available" renders as a pulsing dot instead of a bordered badge — see
// resolveAvailability() below, which also lets status_text override any of
// these defaults so every item can say something different (set in the
// admin's "Status text" field, e.g. "Fresh Daily", "Baked This Morning").
const STATUS_BADGE: Record<string, { label: string; className: string } | null> = {
  available: null,
  out_of_stock: { label: "Out of Stock", className: "bg-red-500/15 text-red-400 border-red-500/30" },
  coming_soon: { label: "Coming Soon", className: "bg-sky-500/15 text-sky-400 border-sky-500/30" },
  custom: { label: "Update", className: "bg-amber-500/15 text-amber-300 border-amber-500/30" },
};

type Availability =
  | { kind: "dot"; label: string }
  | { kind: "badge"; label: string; className: string };

function resolveAvailability(product: CafeProduct): Availability {
  const customText = product.status_text?.trim();
  if (product.status === "available") {
    return { kind: "dot", label: customText || "Available 24/7" };
  }
  const fallback = STATUS_BADGE[product.status] ?? STATUS_BADGE.custom!;
  return { kind: "badge", label: customText || fallback.label, className: fallback.className };
}

type ActiveTab = CafeCategory | "all";

export default function CafeSectionClient({ products }: { products: CafeProduct[] }) {
  const [active, setActive] = useState<ActiveTab>("all");
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      products
        .filter((p) => p.status !== "temporarily_removed")
        .filter((p) => active === "all" || p.category === active)
        .filter(
          (p) =>
            !query ||
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        )
        .sort(
          (a, b) =>
            CATEGORY_ORDER[a.category] - CATEGORY_ORDER[b.category] ||
            a.sort_order - b.sort_order
        ),
    [products, active, query]
  );

  return (
    <div>
      {/* category filters */}
      <div className="flex flex-wrap justify-center gap-3">
        {[{ key: "all" as const, label: "All Items", icon: "🐝" }, ...CATEGORY_TABS].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wide transition ${
              active === tab.key
                ? "-translate-y-0.5 bg-mbtYellow text-mbtDark shadow-lg shadow-black/30"
                : "border border-white/15 bg-mbtCard text-white/60 hover:border-mbtYellow/60 hover:text-white"
            }`}
          >
            <span className="text-base">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* search */}
      <div className="relative mx-auto mt-8 max-w-md">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
        >
          <circle cx="11" cy="11" r="7" strokeWidth={2} />
          <path strokeLinecap="round" strokeWidth={2} d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search the menu…"
          className="w-full rounded-full border border-white/15 bg-mbtCard py-3 pl-11 pr-20 text-sm text-white placeholder:text-white/40 focus:border-mbtYellow focus:outline-none focus:ring-2 focus:ring-mbtYellow/30"
        />
        {query && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/40">
            {filtered.length} found
          </span>
        )}
      </div>

      <div key={`${active}-${query}`} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-white/40">
            {query ? "Nothing matches your search — try another word." : "New items coming soon to this category."}
          </p>
        )}
        {filtered.map((product, index) => {
          const availability = resolveAvailability(product);
          const dimmed = product.status === "out_of_stock" || product.status === "custom";

          return (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 70}ms` }}
              className={`group animate-fade-slide-up overflow-hidden rounded-2xl border border-white/10 bg-mbtCard transition hover:-translate-y-1 hover:border-mbtYellow/30 ${
                dimmed ? "opacity-50" : ""
              }`}
            >
              {product.image_filename ? (
                // 16:9 like the specials cards, so a 1920×1080 upload never
                // crops — the admin upload notice promises exactly this
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={getStoragePhotoUrl(product.image_filename)}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition duration-700 ease-out group-hover:scale-110"
                  />
                  {product.is_best_price && (
                    <span className="absolute left-3 top-3 rounded-full bg-mbtYellow px-3 py-1 font-display text-[10px] font-black uppercase tracking-wide text-mbtDark shadow-lg">
                      ★ Best Price In Town
                    </span>
                  )}
                </div>
              ) : (
                product.is_best_price && (
                  <div className="px-6 pt-6">
                    <span className="inline-block rounded-full bg-mbtYellow px-3 py-1 font-display text-[10px] font-black uppercase tracking-wide text-mbtDark shadow-lg">
                      ★ Best Price In Town
                    </span>
                  </div>
                )
              )}

              <div className="p-6">
                {active === "all" && (
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-mbtYellow/80">
                    {CATEGORY_LABELS[product.category]}
                  </p>
                )}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-bold text-white">{product.name}</h3>
                  {product.price != null && (
                    <span className="flex-shrink-0 font-display text-lg font-black text-mbtYellow">
                      R {Number(product.price).toFixed(2)}
                    </span>
                  )}
                </div>
                {product.description && (
                  <p className="mt-2 text-sm text-white/60">{product.description}</p>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {availability.kind === "badge" ? (
                    <span
                      className={`rounded-full border px-3 py-1 font-display text-[10px] font-bold uppercase tracking-wide ${availability.className}`}
                    >
                      {availability.label}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                      </span>
                      <span className="font-display text-[10px] font-bold uppercase tracking-wide text-amber-400">
                        {availability.label}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
