"use client";

import { useState } from "react";
import type { CafeCategory, CafeProduct } from "@/lib/types";

const TABS: { key: CafeCategory; label: string }[] = [
  { key: "fresh_bakery", label: "Fresh Bakery" },
  { key: "cold_drinks", label: "Cold Drinks" },
  { key: "travel_snacks", label: "Travel Snacks" },
];

export default function CafeSectionClient({ products }: { products: CafeProduct[] }) {
  const [active, setActive] = useState<CafeCategory>("fresh_bakery");

  const filtered = products
    .filter((p) => p.category === active)
    .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className={`rounded-xl px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wide transition ${
              active === tab.key
                ? "-translate-y-0.5 bg-mbtYellow text-mbtDark shadow-lg shadow-black/10"
                : "border border-gray-300 bg-white text-mbtDark/60 hover:border-mbtYellow/60 hover:text-mbtDark"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div key={active} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-mbtDark/40">
            New items coming soon to this category.
          </p>
        )}
        {filtered.map((product, index) => (
          <div
            key={product.id}
            style={{ animationDelay: `${index * 70}ms` }}
            className="animate-fade-slide-up rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="font-display text-lg font-bold text-mbtDark">{product.name}</h3>
            {product.description && (
              <p className="mt-2 text-sm text-mbtDark/60">{product.description}</p>
            )}
            <div className="mt-4 flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
              </span>
              <span className="font-display text-[10px] font-bold uppercase tracking-wide text-amber-600">
                Available 24/7
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
