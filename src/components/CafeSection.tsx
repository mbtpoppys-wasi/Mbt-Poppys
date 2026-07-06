import { getCafeProducts } from "@/lib/data";
import CafeSectionClient from "@/components/CafeSectionClient";

export default async function CafeSection() {
  const products = await getCafeProducts();

  return (
    <section id="buzz-cafe" className="bg-charcoal-light py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
            BUZZ <span className="text-mbt-yellow">Café</span>
          </h2>
          <p className="mt-3 text-white/60">
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
