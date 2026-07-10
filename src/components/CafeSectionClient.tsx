"use client";

import { useState } from "react";
import Image from "next/image";
import type { CafeCategory, CafeProduct } from "@/lib/types";
import { getStoragePhotoUrl } from "@/lib/storage-url";

const TABS: { key: CafeCategory; label: string; icon: string }[] = [
  { key: "fresh_bakery", label: "Fresh Bakery", icon: "☕" },
  { key: "cold_drinks", label: "Cold Drinks", icon: "🥤" },
  { key: "travel_snacks", label: "Travel Snacks", icon: "🍬" },
  { key: "tobacco_vapes", label: "Tobacco & Vapes", icon: "🚬" },
  { key: "braai_outdoor", label: "Braai & Outdoor", icon: "🔥" },
  { key: "essentials", label: "Essentials", icon: "🏧" },
];

const STATUS_BADGE: Record<string, { label: string; className: string } | null> = {
  available: null,
  out_of_stock: { label: "Out of Stock", className: "bg-red-500/15 text-red-400 border-red-500/30" },
  coming_soon: { label: "Coming Soon", className: "bg-sky-500/15 text-sky-400 border-sky-500/30" },
};

export default function CafeSectionClient({ products }: { products: CafeProduct[] }) {
  const [active, setActive] = useState<CafeCategory>("fresh_bakery");

  const filtered = products
    .filter((p) => p.category === active && p.status !== "temporarily_removed")
    .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3">
        {TABS.map((tab) => (
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

      <div key={active} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-white/40">
            New items coming soon to this category.
          </p>
        )}
        {filtered.map((product, index) => {
          const statusBadge = STATUS_BADGE[product.status];
          const dimmed = product.status === "out_of_stock";

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
                <h3 className="font-display text-lg font-bold text-white">{product.name}</h3>
                {product.description && (
                  <p className="mt-2 text-sm text-white/60">{product.description}</p>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {statusBadge ? (
                    <span
                      className={`rounded-full border px-3 py-1 font-display text-[10px] font-bold uppercase tracking-wide ${statusBadge.className}`}
                    >
                      {statusBadge.label}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                      </span>
                      <span className="font-display text-[10px] font-bold uppercase tracking-wide text-amber-400">
                        Available 24/7
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
