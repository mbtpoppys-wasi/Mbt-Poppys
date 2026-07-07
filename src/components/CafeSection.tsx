import { getCafeProducts } from "@/lib/data";
import CafeSectionClient from "@/components/CafeSectionClient";
import Reveal from "@/components/Reveal";

export default async function CafeSection() {
  const products = await getCafeProducts();

  return (
    <section id="buzz-cafe" className="bg-mbtDark px-4 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 border-b border-white/10 pb-8 text-center">
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
          <p className="mx-auto mt-3 max-w-md text-xs font-semibold uppercase tracking-wide text-mbtYellow">
            🍿 Ask about free popcorn on big fill-ups
          </p>
        </Reveal>

        <CafeSectionClient products={products} />
      </div>
    </section>
  );
}
