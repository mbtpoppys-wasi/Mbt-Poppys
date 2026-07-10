import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CafeSectionClient from "@/components/CafeSectionClient";
import { getCafeProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "BUZZ Café Menu",
  description:
    "The full BUZZ Café menu at MBT Poppys Ventersdorp — fresh bakery, ice-cold drinks, travel snacks, braai supplies and essentials, available 24 hours at 38 Hendrik Potgieter Street, Ventersdorp.",
  alternates: {
    canonical: "/buzz-cafe",
  },
};

export const dynamic = "force-dynamic";

export default async function BuzzCafePage() {
  const products = await getCafeProducts();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-mbtDark px-4 py-20 text-white sm:px-6 lg:px-8">
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
            <h1 className="font-display text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
              BUZZ <span className="text-mbtYellow text-shadow-led">Café</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-white/60">
              The full menu — fresh bakery, ice-cold drinks, travel snacks, braai supplies and
              everyday essentials, around the clock.
            </p>
            <p className="mx-auto mt-3 max-w-md text-xs font-semibold uppercase tracking-wide text-mbtYellow">
              🍿 Ask about free popcorn on big fill-ups
            </p>
          </Reveal>

          <CafeSectionClient products={products} />
        </div>
      </main>
      <Footer />
    </>
  );
}
