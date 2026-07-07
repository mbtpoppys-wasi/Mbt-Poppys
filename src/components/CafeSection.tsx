import { getCafeProducts } from "@/lib/data";
import CafeSectionClient from "@/components/CafeSectionClient";

export default async function CafeSection() {
  const products = await getCafeProducts();

  return (
    <section id="buzz-cafe" className="bg-mbtGray py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-black uppercase tracking-wide text-mbtDark sm:text-4xl">
            BUZZ <span className="text-mbtYellow drop-shadow-[0_1px_0_rgba(0,0,0,0.15)]">Café</span>
          </h2>
          <p className="mt-3 text-mbtDark/60">
            Fresh bakery, ice-cold drinks, and travel snacks — available around the clock.
          </p>
        </div>

        <div className="mt-12">
          <CafeSectionClient products={products} />
        </div>
      </div>
    </section>
  );
}
