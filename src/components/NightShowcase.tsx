import Image from "next/image";

export default function NightShowcase() {
  return (
    <section className="relative flex h-[65vh] min-h-[480px] w-full items-center overflow-hidden border-b border-white/10">
      <Image
        src="/images/mbt-poppys-ventersdorp-forecourt-night.webp"
        alt="MBT Poppys Ventersdorp forecourt and fuel pumps lit up at night, 13 Carmichael Street Ventersdorp"
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-mbtDark via-mbtDark/60 to-mbtDark/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-mbtDark/70 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg">
          <span className="inline-block rounded-full border border-mbtYellow/30 bg-mbtYellow/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-mbtYellow">
            Open Day &amp; Night
          </span>
          <h2 className="mt-4 font-display text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-5xl">
            Never <span className="text-mbtYellow text-shadow-led">Closed</span>
          </h2>
          <p className="mt-4 text-sm text-white/70 sm:text-base">
            Lit, staffed, and pumping — the forecourt never shuts down, day or night, 365 days a year.
          </p>
        </div>

        {/* Side images: smaller framed insets alongside the full-bleed night shot */}
        <div className="mt-10 flex gap-4 sm:absolute sm:bottom-10 sm:right-6 sm:mt-0 lg:right-12">
          <figure className="group relative h-28 w-36 flex-shrink-0 overflow-hidden rounded-xl border border-white/20 shadow-2xl sm:h-32 sm:w-44">
            <Image
              src="/images/mbt-poppys-ventersdorp-fuel-station-canopy-daytime.jpg"
              alt="MBT Poppys Ventersdorp fuel station canopy during the day"
              fill
              loading="lazy"
              sizes="180px"
              className="object-cover transition duration-500 group-hover:scale-110"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1.5 text-[10px] font-semibold text-white">
              Open all day too
            </figcaption>
          </figure>
          <figure className="group relative h-28 w-36 flex-shrink-0 overflow-hidden rounded-xl border border-white/20 shadow-2xl sm:h-32 sm:w-44">
            <Image
              src="/images/mbt-poppys-ventersdorp-led-pylon-sign-night.webp"
              alt="MBT Poppys Ventersdorp illuminated LED pylon sign at night"
              fill
              loading="lazy"
              sizes="180px"
              className="object-cover transition duration-500 group-hover:scale-110"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1.5 text-[10px] font-semibold text-white">
              Visible from the road
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
