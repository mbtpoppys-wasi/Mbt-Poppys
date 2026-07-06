// Single source of truth for Name/Address/Phone (NAP) and other business facts
// used across metadata, JSON-LD, and the on-page contact section.
//
// IMPORTANT: phoneE164 / phoneDisplay / address must be edited to match the
// Google Business Profile listing EXACTLY before launch — see README "NAP consistency".
export const siteConfig = {
  businessName: "MBT Poppys Ventersdorp",
  legalName: "MBT Poppys Ventersdorp Fuel Station & BUZZ Café",
  shortDescription:
    "24-hour fuel station and BUZZ Café convenience store on Carmichael Street, Ventersdorp.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mbtpoppysventersdorp.vercel.app",

  address: {
    streetAddress: "13 Carmichael Street",
    addressLocality: "Ventersdorp",
    addressRegion: "North West",
    postalCode: "2710",
    addressCountry: "ZA",
  },

  // TODO: replace with the exact pin coordinates from Google Business Profile / Google Maps.
  geo: {
    latitude: -26.8825,
    longitude: 26.8158,
  },

  // TODO: replace with the exact number as listed on Google Business Profile (same formatting).
  phoneDisplay: "018 264 0000",
  phoneE164: "+27182640000",

  priceRange: "R",

  googleMapsEmbedSrc:
    "https://www.google.com/maps?q=13+Carmichael+Street,+Ventersdorp,+2710,+South+Africa&output=embed",
  googleMapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=13+Carmichael+Street,+Ventersdorp,+2710,+South+Africa",

  // TODO: replace with the real Google Business Profile place/review links once claimed.
  googleReviewUrl: "https://search.google.com/local/writereview?placeid=REPLACE_WITH_PLACE_ID",
  googleWriteAReviewUrl: "https://g.page/r/REPLACE_WITH_GBP_CODE/review",
};

export type SiteConfig = typeof siteConfig;
