import { getCafeProducts } from "@/lib/data";
import CafeSectionClient from "@/components/CafeSectionClient";
import Reveal from "@/components/Reveal";

export default async function CafeSection() {
  const products = await getCafeProducts();

  return (
    <section id="buzz-cafe" className="bg-mbtGray px-4 py-24 text-mbtDark">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 border-b border-gray-300 pb-8 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-800">
            <span className="text-sm">🐝</span> 24/7 Roadside Convenience
          </span>
          <h2 className="font-display text-3xl font-black uppercase tracking-tight text-mbtDark sm:text-4xl lg:text-5xl">
            BUZZ <span className="text-mbtYellow drop-shadow-[0_1px_0_rgba(0,0,0,0.15)]">Café</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-mbtDark/60">
            Fresh bakery, ice-cold drinks, and travel snacks — available around the clock.
          </p>
        </Reveal>

        <CafeSectionClient products={products} />
      </div>
    </section>
  );
}
