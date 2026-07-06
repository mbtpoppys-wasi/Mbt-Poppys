import { siteConfig } from "@/lib/site-config";
import type { PlaceRating } from "@/lib/google-places";

export function buildGasStationJsonLd(rating: PlaceRating | null) {
  return {
    "@context": "https://schema.org",
    "@type": "GasStation",
    name: siteConfig.businessName,
    image: `${siteConfig.url}/images/hero-canopy.jpg`,
    url: siteConfig.url,
    telephone: siteConfig.phoneE164,
    priceRange: siteConfig.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHours: "Mo-Su 00:00-23:59",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    ...(rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rating.rating,
            reviewCount: rating.userRatingsTotal,
          },
        }
      : {}),
    department: {
      "@type": "ConvenienceStore",
      name: "BUZZ Café",
      servesCuisine: "Convenience store food",
    },
  };
}
