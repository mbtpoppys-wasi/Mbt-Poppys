const SERVICES = [
  {
    title: "Spares & Tyres",
    description:
      "Puncture repairs, tyre fitment, and essential spares kept in stock for drivers passing through Ventersdorp.",
    icon: "🚗",
    featured: false,
  },
  {
    title: "Drive-Thru Deli",
    description:
      "Quick, no-queue deli service for hot food and drinks without leaving your vehicle.",
    icon: "🍗",
    featured: false,
  },
  {
    title: "24-Hour Desk",
    description:
      "A manned desk around the clock for fuel, airtime, and anything else you need on the road.",
    icon: "🏪",
    featured: true,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="border-t border-white/10 bg-[#0a0a0a] px-4 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="font-display text-3xl font-black uppercase tracking-wide text-white sm:text-4xl">
            Station <span className="text-mbtYellow">Services</span>
          </h2>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-mbtYellow">
            More than just fuel — your complete Ventersdorp pitstop
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 text-left sm:grid-cols-3 sm:gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className={`group relative overflow-hidden rounded-2xl border p-8 transition duration-300 ${
                service.featured
                  ? "border-2 border-mbtYellow/40 bg-gradient-to-br from-mbtCard to-[#1a1a1a]"
                  : "border-white/10 bg-mbtCard hover:border-mbtYellow/50"
              }`}
            >
              {service.featured && (
                <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-mbtYellow/5 transition duration-500 group-hover:bg-mbtYellow/10" />
              )}
              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl text-3xl shadow-lg transition duration-300 group-hover:scale-110 ${
                  service.featured
                    ? "bg-mbtYellow text-mbtDark shadow-[0_0_15px_rgba(255,222,0,0.4)]"
                    : "border border-white/10 bg-[#1a1a1a]"
                }`}
              >
                {service.icon}
              </div>
              <h3
                className={`font-display text-xl font-bold ${
                  service.featured ? "text-white drop-shadow-md" : "text-mbtYellow"
                }`}
              >
                {service.title}
              </h3>
              <p className="relative z-10 mt-3 text-sm leading-relaxed text-white/60">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
