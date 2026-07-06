export interface PlaceRating {
  rating: number;
  userRatingsTotal: number;
}

// Server-only fetch of aggregate rating + review count. Cached by Next's fetch
// cache for 24h so the API key is never exposed and the quota stays low.
export async function getPlaceRating(): Promise<PlaceRating | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACES_PLACE_ID;

  if (!apiKey || !placeId) return null;

  try {
    const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    url.searchParams.set("place_id", placeId);
    url.searchParams.set("fields", "rating,user_ratings_total");
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 * 60 * 24 }, // 24h
    });

    if (!res.ok) return null;

    const json = await res.json();
    const rating = json?.result?.rating;
    const userRatingsTotal = json?.result?.user_ratings_total;

    if (typeof rating !== "number" || typeof userRatingsTotal !== "number") return null;

    return { rating, userRatingsTotal };
  } catch {
    return null;
  }
}
