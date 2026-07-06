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
      <div className="flex flex-wrap justify-center gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className={`rounded-full px-5 py-2 font-display text-xs font-bold uppercase tracking-wide transition ${
              active === tab.key
                ? "bg-mbt-yellow text-charcoal shadow-led-glow"
                : "border border-white/15 text-white/60 hover:border-mbt-yellow/40 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-white/40">
            New items coming soon to this category.
          </p>
        )}
        {filtered.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl border border-white/10 bg-charcoal-card p-6 transition hover:border-mbt-yellow/30"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-bold text-white">{product.name}</h3>
              <span className="flex-shrink-0 rounded-full bg-mbt-yellow/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-mbt-yellow">
                Available 24/7
              </span>
            </div>
            {product.description && (
              <p className="mt-2 text-sm text-white/60">{product.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
