import Image from "next/image";
import { getCafeProducts } from "@/lib/data";
import CafeSectionClient from "@/components/CafeSectionClient";

export default async function CafeSection() {
  const products = await getCafeProducts();

  return (
    <section id="buzz-cafe" className="bg-mbtGray px-4 py-24 text-mbtDark">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 border-b border-gray-300 pb-8 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-800">
            <span className="text-sm">🐝</span> 24/7 Roadside Convenience
          </span>
          <h2 className="font-display text-3xl font-black uppercase tracking-tight text-mbtDark sm:text-4xl lg:text-5xl">
            BUZZ <span className="text-mbtYellow drop-shadow-[0_1px_0_rgba(0,0,0,0.15)]">Café</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-mbtDark/60">
            Fresh bakery, ice-cold drinks, and travel snacks — available around the clock.
          </p>
        </div>

        {/* Photo showcase: featured entrance shot + three smaller side photos */}
        <div className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <figure className="group relative col-span-2 row-span-2 aspect-square overflow-hidden rounded-2xl border border-black/5 shadow-lg sm:aspect-auto">
            <Image
              src="/images/buzz-cafe-ventersdorp-convenience-store-entrance.webp"
              alt="BUZZ Café convenience store entrance at MBT Poppys Ventersdorp during the day"
              fill
              loading="lazy"
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 text-sm font-semibold text-white">
              BUZZ Café — open 24/7
            </figcaption>
          </figure>

          <figure className="group relative aspect-square overflow-hidden rounded-2xl border border-black/5 shadow-lg">
            <Image
              src="/images/buzz-cafe-ventersdorp-storefront-night.webp"
              alt="BUZZ Café storefront at MBT Poppys Ventersdorp lit up at night"
              fill
              loading="lazy"
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1.5 text-[10px] font-semibold text-white">
              Open all night
            </figcaption>
          </figure>

          <figure className="group relative aspect-square overflow-hidden rounded-2xl border border-black/5 shadow-lg">
            <Image
              src="/images/buzz-cafe-ventersdorp-convenience-store-interior.webp"
              alt="Inside the BUZZ Café convenience store showing snack aisles and drinks fridges"
              fill
              loading="lazy"
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1.5 text-[10px] font-semibold text-white">
              Stocked shelves
            </figcaption>
          </figure>

          <figure className="group relative col-span-2 aspect-[2/1] overflow-hidden rounded-2xl border border-black/5 shadow-lg sm:col-span-2 sm:aspect-square">
            <Image
              src="/images/buzz-cafe-ventersdorp-snack-shelves-interior.webp"
              alt="Snack and chocolate shelving at the BUZZ Café till point in Ventersdorp"
              fill
              loading="lazy"
              sizes="(max-width: 640px) 100vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1.5 text-[10px] font-semibold text-white">
              Travel snacks by the till
            </figcaption>
          </figure>
        </div>

        <CafeSectionClient products={products} />
      </div>
    </section>
  );
}
