import { getPlaceRating } from "@/lib/google-places";
import { siteConfig } from "@/lib/site-config";
import { REVIEWS } from "@/lib/reviews-data";
import Reveal from "@/components/Reveal";

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

        <div className="mt-4 text-center">
          <span className="inline-block rounded-full border border-mbtYellow/30 bg-mbtYellow/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-mbtYellow">
            Reviews
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((review, index) => (
            <Reveal
              key={review.name}
              delay={index * 80}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-mbtCard p-6 transition duration-300 hover:-translate-y-1 hover:border-mbtYellow/30"
            >
              <div>
                <div aria-hidden className="mb-3 text-mbtYellow">
                  ★★★★★
                </div>
                <p className="text-sm text-white/80">&ldquo;{review.text}&rdquo;</p>
              </div>
              <div className="mt-5 border-t border-white/10 pt-3">
                <p className="text-sm font-semibold text-white">{review.name}</p>
                <p className="text-xs text-white/40">{review.credential}</p>
              </div>
            </Reveal>
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
