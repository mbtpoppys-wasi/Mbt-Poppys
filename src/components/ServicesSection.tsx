import Reveal from "@/components/Reveal";

export default function ServicesSection() {
  return (
    <section id="services" className="border-t border-white/10 bg-[#0a0a0a] px-4 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16 text-center">
          <h2 className="font-display text-3xl font-black uppercase tracking-wide text-white sm:text-4xl">
            Station <span className="text-mbtYellow">Services</span>
          </h2>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-mbtYellow">
            More than just fuel — your complete Ventersdorp pitstop
          </p>
        </Reveal>

        <Reveal className="group relative mx-auto max-w-md overflow-hidden rounded-2xl border-2 border-mbtYellow/40 bg-gradient-to-br from-mbtCard to-[#1a1a1a] p-8 text-left transition duration-300 hover:-translate-y-1">
          <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-mbtYellow/5 transition duration-500 group-hover:bg-mbtYellow/10" />
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-mbtYellow text-3xl text-mbtDark shadow-[0_0_15px_rgba(255,222,0,0.4)] transition duration-300 group-hover:scale-110">
            🏪
          </div>
          <h3 className="font-display text-xl font-bold text-white drop-shadow-md">
            24-Hour Desk
          </h3>
          <p className="relative z-10 mt-3 text-sm leading-relaxed text-white/60">
            A manned desk around the clock for fuel, airtime, and anything else you need on the
            road.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
