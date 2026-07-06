import { getPlaceRating } from "@/lib/google-places";
import { siteConfig } from "@/lib/site-config";

const HIGHLIGHTS = [
  "Praised for fast, friendly attendants who help day or night.",
  "Regularly described as the most reliable fill-up stop in Ventersdorp.",
  "Customers highlight the BUZZ Café bakery as a favourite quick stop.",
  "Known for a clean forecourt and well-stocked convenience store.",
];

export default async function Reviews() {
  const rating = await getPlaceRating();
  const mapsEmbedKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;
  const placeId = process.env.GOOGLE_PLACES_PLACE_ID;

  return (
    <section id="reviews" className="bg-charcoal-light py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-white/60">
            Real, live reviews from Google — unedited, and updated automatically.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          {rating ? (
            <>
              <div className="flex items-center gap-2">
                <span className="font-display text-4xl font-bold text-mbt-yellow">
                  {rating.rating.toFixed(1)}
                </span>
                <div aria-hidden className="flex text-mbt-yellow">
                  {"★★★★★".slice(0, Math.round(rating.rating))}
                  <span className="text-white/20">
                    {"★★★★★".slice(Math.round(rating.rating))}
                  </span>
                </div>
              </div>
              <p className="text-sm text-white/60">
                Based on {rating.userRatingsTotal.toLocaleString("en-ZA")} Google reviews
              </p>
            </>
          ) : (
            <p className="text-sm text-white/40">
              Google rating loads once GOOGLE_PLACES_API_KEY is configured.
            </p>
          )}

          <a
            href={siteConfig.googleWriteAReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 rounded-full bg-mbt-yellow px-6 py-2.5 font-display text-xs font-bold uppercase tracking-wide text-charcoal shadow-led-glow transition hover:brightness-95"
          >
            Leave Us A Review
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {HIGHLIGHTS.map((text) => (
            <div
              key={text}
              className="rounded-xl border border-white/10 bg-charcoal-card px-5 py-4 text-sm text-white/70"
            >
              {text}
            </div>
          ))}
        </div>

        {/* Official Google widget: the Maps Embed API "place" mode renders
            Google's own interactive place card, which includes a native
            Reviews tab the visitor can open — real, live, unedited reviews
            straight from Google, with no scraped text stored in this repo. */}
        {mapsEmbedKey && placeId && (
          <div className="mt-12 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="Google Maps listing and reviews for MBT Poppys Ventersdorp"
              src={`https://www.google.com/maps/embed/v1/place?key=${mapsEmbedKey}&q=place_id:${placeId}`}
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>
    </section>
  );
}
