import { siteConfig } from "@/lib/site-config";

export default function LocationSection() {
  const { address, phoneDisplay, phoneE164 } = siteConfig;

  return (
    <section id="location" className="bg-charcoal py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
            Find Us
          </h2>
          <p className="mt-3 text-white/60">
            Open 24 hours at 13 Carmichael Street, Ventersdorp — pull in any time, day or night.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <address className="not-italic">
              <p className="font-display text-lg font-bold text-white">
                {siteConfig.businessName}
              </p>
              <p className="mt-2 text-white/70">
                {address.streetAddress}
                <br />
                {address.addressLocality}, {address.addressRegion} {address.postalCode}
                <br />
                South Africa
              </p>
              <a
                href={`tel:${phoneE164}`}
                className="mt-4 inline-block text-lg font-semibold text-mbt-yellow hover:underline"
              >
                {phoneDisplay}
              </a>
            </address>

            <a
              href={siteConfig.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-mbt-yellow px-8 py-3 text-center font-display text-sm font-bold uppercase tracking-wide text-charcoal shadow-led-glow transition hover:brightness-95"
            >
              Get Directions
            </a>

            <p className="mt-8 text-sm text-white/50">
              Open Mo–Su, 00:00–23:59 — every day of the year.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 lg:col-span-3">
            <iframe
              title={`Map showing ${siteConfig.businessName} at ${address.streetAddress}, ${address.addressLocality}`}
              src={siteConfig.googleMapsEmbedSrc}
              className="h-[360px] w-full sm:h-[440px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
