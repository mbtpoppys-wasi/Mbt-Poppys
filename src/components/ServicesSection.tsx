const SERVICES = [
  {
    title: "Spares & Tyres",
    description:
      "Puncture repairs, tyre fitment, and essential spares kept in stock for drivers passing through Ventersdorp.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M11 3a1 1 0 00-.894.553L9.382 5H7a1 1 0 00-.894.553l-.723 1.447H4a1 1 0 00-1 1v2a1 1 0 001 1h.382l1.171 2.342A1 1 0 006 14v2a1 1 0 001 1h1.382l.724 1.447A1 1 0 0010 19h2a1 1 0 00.894-.553L13.618 17H16a1 1 0 00.894-.553l.723-1.447H18a1 1 0 001-1v-2a1 1 0 00-1-1h-.382l-1.171-2.342A1 1 0 0016 8V6a1 1 0 00-1-1h-1.382l-.724-1.447A1 1 0 0012 3h-1z"
      />
    ),
  },
  {
    title: "Drive-Thru Deli",
    description:
      "Quick, no-queue deli service for hot food and drinks without leaving your vehicle.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M3 12h18M3 12a2 2 0 012-2h14a2 2 0 012 2M3 12v5a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-5M7 10V7a2 2 0 012-2h6a2 2 0 012 2v3"
      />
    ),
  },
  {
    title: "24-Hour Desk",
    description:
      "A manned desk around the clock for fuel, airtime, and anything else you need on the road.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-mbtDark py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-black uppercase tracking-wide text-white sm:text-4xl">
            Station <span className="text-mbtYellow">Services</span>
          </h2>
          <p className="mt-3 text-white/60">Everything you need, all in one stop.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-white/10 bg-mbtCard p-8 transition hover:-translate-y-1 hover:border-mbtYellow/40"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-mbtYellow/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="h-6 w-6 text-mbtYellow"
                >
                  {service.icon}
                </svg>
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-mbtYellow">
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
