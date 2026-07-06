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
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-transparent to-charcoal/60" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-32 sm:px-6 sm:pb-24 lg:px-8">
        <OpenNowIndicator />

        <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          MBT Poppys <span className="text-mbt-yellow text-shadow-led">Ventersdorp</span>
        </h1>

        <p className="mt-4 max-w-xl text-base text-white/80 sm:text-lg">
          Your round-the-clock fuel stop and BUZZ Café convenience store at 13
          Carmichael Street — fresh bakery, cold drinks, snacks, and friendly
          attendants, day or night.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="#fuel-prices"
            className="rounded-full bg-mbt-yellow px-8 py-3 text-center font-display text-sm font-bold uppercase tracking-wide text-charcoal shadow-led-glow transition hover:brightness-95"
          >
            See Fuel Prices
          </Link>
          <Link
            href="#location"
            className="rounded-full border border-white/30 bg-black/30 px-8 py-3 text-center font-display text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm transition hover:border-mbt-yellow/60 hover:text-mbt-yellow"
          >
            Get Directions
          </Link>
        </div>
      </div>
    </section>
  );
}
