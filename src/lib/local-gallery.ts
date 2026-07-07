// Photos checked directly into the repo under public/images/. Listed here
// as a static array rather than through Supabase Storage, since these
// launch photos ship with the codebase and don't need to change without a
// redeploy — new photos added later via /admin still layer on top of this
// list (see Gallery.tsx).
export interface LocalGalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  subtitle?: string;
}

export const LOCAL_GALLERY_PHOTOS: LocalGalleryPhoto[] = [
  {
    id: "local-canopy-daytime",
    src: "/images/mbt-poppys-ventersdorp-fuel-station-canopy-daytime.jpg",
    alt: "MBT Poppys Ventersdorp fuel station canopy and forecourt on a clear day",
    caption: "Premium Canopy Hub",
    subtitle: "Safe, well-lit fueling lanes 24/7",
  },
  {
    id: "local-pylon-night",
    src: "/images/mbt-poppys-ventersdorp-led-pylon-sign-night.webp",
    alt: "MBT Poppys Ventersdorp illuminated LED pylon sign at night showing diesel price and BUZZ Café",
    caption: "Iconic LED Pylon",
    subtitle: "Visible pricing from the highway",
  },
  {
    id: "local-forecourt-night",
    src: "/images/mbt-poppys-ventersdorp-forecourt-night.webp",
    alt: "MBT Poppys Ventersdorp forecourt and fuel pumps under the canopy at night",
    caption: "24-hour pumps, always ready",
  },
  {
    id: "local-cafe-entrance",
    src: "/images/buzz-cafe-ventersdorp-convenience-store-entrance.webp",
    alt: "BUZZ Café convenience store entrance at MBT Poppys Ventersdorp during the day",
    caption: "BUZZ Café — fresh food, cold drinks, snacks",
  },
  {
    id: "local-cafe-night",
    src: "/images/buzz-cafe-ventersdorp-storefront-night.webp",
    alt: "BUZZ Café storefront at MBT Poppys Ventersdorp lit up at night",
    caption: "Open around the clock",
  },
  {
    id: "local-cafe-interior",
    src: "/images/buzz-cafe-ventersdorp-convenience-store-interior.webp",
    alt: "Inside the BUZZ Café convenience store at MBT Poppys Ventersdorp showing snack aisles and drinks fridges",
    caption: "Stocked shelves, ice-cold drinks",
  },
  {
    id: "local-cafe-shelves",
    src: "/images/buzz-cafe-ventersdorp-snack-shelves-interior.webp",
    alt: "Snack and chocolate shelving at the BUZZ Café till point in Ventersdorp",
    caption: "Travel snacks by the till point",
  },
];
