const SERVICES = [
  {
    title: "Spares & Tyres",
    description:
      "Puncture repairs, tyre fitment, and essential spares kept in stock for drivers passing through Ventersdorp.",
  },
  {
    title: "Drive-Thru Deli",
    description:
      "Quick, no-queue deli service for hot food and drinks without leaving your vehicle.",
  },
  {
    title: "24-Hour Desk",
    description:
      "A manned desk around the clock for fuel, airtime, and anything else you need on the road.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-charcoal-light py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
            Station Services
          </h2>
          <p className="mt-3 text-white/60">Everything you need, all in one stop.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-white/10 bg-charcoal-card p-8 transition hover:border-mbt-yellow/40"
            >
              <h3 className="font-display text-xl font-bold text-mbt-yellow">
                {service.title}
              </h3>
              <p className="mt-3 text-sm text-white/60">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
