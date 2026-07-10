import Link from "next/link";
import Reveal from "@/components/Reveal";

const CATEGORY_CHIPS = [
  { label: "Fresh Bakery", icon: "☕" },
  { label: "Cold Drinks", icon: "🥤" },
  { label: "Travel Snacks", icon: "🍬" },
  { label: "Tobacco & Vapes", icon: "🚬" },
  { label: "Braai & Outdoor", icon: "🔥" },
  { label: "Essentials", icon: "🏧" },
];

// Homepage teaser — the full filterable menu lives on /buzz-cafe.
export default function CafeSection() {
  return (
    <section id="buzz-cafe" className="bg-mbtDark px-4 py-24 text-white">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-800">
              <span className="text-sm">🐝</span> 24/7 Roadside Convenience
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-800">
              <span className="text-sm">☪️</span> Halal Certified
            </span>
          </div>
          <h2 className="font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            BUZZ <span className="text-mbtYellow text-shadow-led">Café</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/60">
            Fresh bakery, ice-cold drinks, and travel snacks — available around the clock.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {CATEGORY_CHIPS.map((chip) => (
              <span
                key={chip.label}
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-mbtCard px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wide text-white/60"
              >
                <span className="text-base">{chip.icon}</span>
                {chip.label}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <Link
            href="/buzz-cafe"
            className="mt-10 inline-block rounded bg-mbtYellow px-8 py-3 font-display text-xs font-black uppercase tracking-widest text-mbtDark shadow-[0_0_15px_rgba(255,222,0,0.3)] transition hover:bg-white"
          >
            Explore The Full Menu
          </Link>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-mbtYellow">
            🍿 Ask about free popcorn on big fill-ups
          </p>
        </Reveal>
      </div>
    </section>
  );
}
