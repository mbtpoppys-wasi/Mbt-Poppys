import { getPlaceRating } from "@/lib/google-places";
import { siteConfig } from "@/lib/site-config";

const HIGHLIGHTS = [
  "Attendants are consistently praised as fast, friendly, and quick to assist as soon as a car pulls in.",
  "Long-time customers say they won't fill up anywhere else in Ventersdorp.",
  "Noted for serving customers comfortably in their home language.",
  "Recommended repeatedly by local Google Guides for reliable, helpful service.",
];

export default async function Reviews() {
  const rating = await getPlaceRating();
  const mapsEmbedKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;
  const placeId = process.env.GOOGLE_PLACES_PLACE_ID;

  return (
    <section id="reviews" className="bg-mbtDark py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-black uppercase tracking-wide text-white sm:text-4xl">
            What Our <span className="text-mbtYellow">Customers Say</span>
          </h2>
          <p className="mt-3 text-white/60">
            Real, live reviews from Google — unedited, and updated automatically.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          {rating ? (
            <>
              <div className="flex items-center gap-2">
                <span className="font-display text-4xl font-bold text-mbtYellow">
                  {rating.rating.toFixed(1)}
                </span>
                <div aria-hidden className="flex text-mbtYellow">
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
            className="mt-4 rounded-full bg-mbtYellow px-6 py-2.5 font-display text-xs font-bold uppercase tracking-wide text-mbtDark shadow-led-glow transition hover:brightness-95"
          >
            Leave Us A Review
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {HIGHLIGHTS.map((text) => (
            <div
              key={text}
              className="rounded-xl border border-white/10 bg-mbtCard px-5 py-4 text-sm text-white/70"
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
