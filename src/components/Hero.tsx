import Image from "next/image";
import Link from "next/link";
import OpenNowIndicator from "@/components/OpenNowIndicator";

export default function Hero() {
  return (
    <section className="relative flex h-[85vh] min-h-[600px] w-full items-center justify-center overflow-hidden">
      <Image
        src="/images/hero-canopy.jpg"
        alt="MBT Poppys Ventersdorp fuel station canopy lit up at night, 13 Carmichael Street Ventersdorp"
        fill
        priority
        sizes="100vw"
        className="animate-subtle-zoom object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-mbtDark via-mbtDark/40 to-black/75" />

      <div className="relative z-10 mx-auto mt-6 max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <OpenNowIndicator />

        <h1 className="mx-auto mb-6 mt-6 font-display text-4xl font-black uppercase leading-none tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] sm:text-6xl md:text-7xl lg:text-8xl">
          Poppys <span className="text-mbtYellow text-shadow-led">Ventersdorp</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-sm font-medium leading-relaxed text-gray-200 drop-shadow-md sm:text-lg md:text-xl">
          Premium fueling lanes, clean amenities, and the fully stocked BUZZ Café.
          Conveniently located on Carmichael Street, South Africa.
        </p>

        <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#fuel-prices"
            className="flex w-full items-center justify-center gap-2 rounded bg-mbtYellow px-8 py-4 text-center font-display text-xs font-black uppercase tracking-widest text-mbtDark shadow-[0_0_20px_rgba(255,222,0,0.45)] transition duration-300 hover:bg-white sm:w-auto"
          >
            Check Pump Prices
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 13l-7 7-7-7" />
            </svg>
          </Link>
          <Link
            href="#buzz-cafe"
            className="flex w-full items-center justify-center rounded border-2 border-white px-8 py-4 text-center font-display text-xs font-black uppercase tracking-widest text-white transition duration-300 hover:border-mbtYellow hover:text-mbtYellow sm:w-auto"
          >
            Explore BUZZ Café
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <Link href="#fuel-prices" className="text-white transition-colors hover:text-mbtYellow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-8 w-8">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
