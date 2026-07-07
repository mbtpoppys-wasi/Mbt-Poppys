import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { getActiveSpecials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Specials",
  description:
    "Current running specials and promotions at MBT Poppys Ventersdorp fuel station and BUZZ Café.",
};

export default async function SpecialsPage() {
  const specials = await getActiveSpecials();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-mbtDark px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal className="text-center">
            <span className="inline-block rounded-full border border-mbtYellow/30 bg-mbtYellow/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-mbtYellow">
              Limited Time
            </span>
            <h1 className="mt-4 font-display text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
              Current <span className="text-mbtYellow text-shadow-led">Specials</span>
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-white/60">
              Running promotions at MBT Poppys Ventersdorp — check back often, these change
              regularly.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {specials.length === 0 && (
              <p className="col-span-full text-center text-white/40">
                No running specials right now — check back soon.
              </p>
            )}
            {specials.map((special, index) => (
              <Reveal
                key={special.id}
                delay={index * 80}
                className="rounded-2xl border border-white/10 bg-mbtCard p-8 transition duration-300 hover:-translate-y-1 hover:border-mbtYellow/40"
              >
                <span className="inline-block rounded-full bg-mbtYellow/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-mbtYellow">
                  Special
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-white">{special.title}</h2>
                {special.description && (
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {special.description}
                  </p>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
