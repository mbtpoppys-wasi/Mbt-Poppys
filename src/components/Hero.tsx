import Image from "next/image";
import Link from "next/link";
import OpenNowIndicator from "@/components/OpenNowIndicator";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] w-full items-end overflow-hidden sm:min-h-screen">
      <Image
        src="/images/hero-canopy.jpg"
        alt="MBT Poppys Ventersdorp fuel station canopy lit up at night, 13 Carmichael Street Ventersdorp"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-mbtDark via-mbtDark/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-mbtDark/60 via-transparent to-mbtDark/60" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-32 text-center sm:px-6 sm:pb-24 lg:px-8">
        <OpenNowIndicator />

        <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-black uppercase leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
          Poppys <span className="text-mbtYellow text-shadow-led">Ventersdorp</span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base text-white/80 sm:text-lg">
          Premium fueling lanes, clean amenities, and the fully stocked BUZZ Café.
          Conveniently located on Carmichael Street, South Africa.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#fuel-prices"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-mbtYellow px-8 py-3 text-center font-display text-sm font-bold uppercase tracking-wide text-mbtDark shadow-led-glow transition hover:brightness-95"
          >
            Check Pump Prices
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
          <Link
            href="#buzz-cafe"
            className="rounded-full border border-white/30 bg-black/30 px-8 py-3 text-center font-display text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm transition hover:border-mbtYellow/60 hover:text-mbtYellow"
          >
            Explore BUZZ Café
          </Link>
        </div>

        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="mx-auto mt-10 h-6 w-6 animate-bounce text-white/50"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v14m0 0l-6-6m6 6l6-6" />
        </svg>
      </div>
    </section>
  );
}
