import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ImageDisclaimer from "@/components/ImageDisclaimer";
import { getActiveSpecials } from "@/lib/data";
import { getStoragePhotoUrl } from "@/lib/storage-url";

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
                className={`overflow-hidden rounded-2xl border border-white/10 bg-mbtCard transition duration-300 hover:-translate-y-1 hover:border-mbtYellow/40 ${
                  special.is_active ? "" : "opacity-60"
                }`}
              >
                {special.image_filename && (
                  // Locked to 16:9 so a 1920×1080 upload displays with zero
                  // cropping on every screen (the admin upload notice
                  // promises exactly this).
                  <div className="relative aspect-video w-full">
                    <Image
                      src={getStoragePhotoUrl(special.image_filename)}
                      alt={special.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    {special.is_active && (
                      <span className="inline-block rounded-full bg-mbtYellow/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-mbtYellow">
                        Special
                      </span>
                    )}
                    {special.status_text && (
                      <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/70">
                        {special.status_text}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-bold text-white">
                    {special.title}
                  </h2>
                  {special.description && (
                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                      {special.description}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <ImageDisclaimer />
        </div>
      </main>
      <Footer />
    </>
  );
}
