// Single source of truth for Name/Address/Phone (NAP) and other business facts
// used across metadata, JSON-LD, and the on-page contact section.
//
// IMPORTANT: phoneE164 / phoneDisplay / address must be edited to match the
// Google Business Profile listing EXACTLY before launch — see README "NAP consistency".
export const siteConfig = {
  businessName: "MBT Poppys Ventersdorp",
  legalName: "MBT Poppys Ventersdorp Fuel Station & BUZZ Café",
  shortDescription:
    "24-hour fuel station and BUZZ Café convenience store on Hendrik Potgieter Street, Ventersdorp.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mbtpoppysventersdorp.vercel.app",

  address: {
    streetAddress: "38 Hendrik Potgieter Street",
    addressLocality: "Ventersdorp",
    addressRegion: "North West",
    postalCode: "2710",
    addressCountry: "ZA",
  },

  // TODO: this still reflects the old address — replace with the exact pin
  // coordinates for 38 Hendrik Potgieter Street from Google Business Profile.
  // (The map embed/directions links below use the address text directly, so
  // those are already accurate; only this JSON-LD geo pin needs updating.)
  geo: {
    latitude: -26.8825,
    longitude: 26.8158,
  },

  phoneDisplay: "018 264 2913",
  phoneE164: "+27182642913",

  priceRange: "R",

  googleMapsEmbedSrc:
    "https://www.google.com/maps?q=38+Hendrik+Potgieter+Street,+Ventersdorp,+2710,+South+Africa&output=embed",
  googleMapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=38+Hendrik+Potgieter+Street,+Ventersdorp,+2710,+South+Africa",

  googleReviewUrl: "https://g.page/r/CScuA4VrSljeEBM/review",
  googleWriteAReviewUrl: "https://g.page/r/CScuA4VrSljeEBM/review",
};

export type SiteConfig = typeof siteConfig;
