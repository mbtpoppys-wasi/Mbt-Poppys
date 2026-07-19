import { createServerClient } from "@/lib/supabase/server";
import type {
  CafeGalleryImage,
  CafeProduct,
  FuelAnnouncement,
  FuelPrice,
  GalleryImage,
  Special,
  StatusBanner,
} from "@/lib/types";

// Fallback data lets the site render before Supabase env vars / tables exist
// (first `npm run dev` right after cloning), rather than crashing the page.
const FALLBACK_FUEL_PRICES: FuelPrice[] = [
  { id: "fallback-95", fuel_type: "petrol_95", price: 26.31, updated_at: new Date().toISOString() },
  { id: "fallback-93", fuel_type: "petrol_93", price: 26.15, updated_at: new Date().toISOString() },
  { id: "fallback-diesel-50", fuel_type: "diesel_50ppm", price: 27.74, updated_at: new Date().toISOString() },
  { id: "fallback-diesel-10", fuel_type: "diesel_10ppm", price: 28.74, updated_at: new Date().toISOString() },
];

export async function getFuelPrices(): Promise<FuelPrice[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("fuel_prices")
      .select("*")
      .order("fuel_type", { ascending: true });

    if (error || !data || data.length === 0) return FALLBACK_FUEL_PRICES;
    return data as FuelPrice[];
  } catch {
    return FALLBACK_FUEL_PRICES;
  }
}

export async function getCafeProducts(): Promise<CafeProduct[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("cafe_products")
      .select("*")
      .order("category", { ascending: true })
      .order("sort_order", { ascending: true });

    if (error || !data) return [];
    return data as CafeProduct[];
  } catch {
    return [];
  }
}

export async function getCafeGalleryImages(): Promise<CafeGalleryImage[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("cafe_gallery")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data) return [];
    return data as CafeGalleryImage[];
  } catch {
    return [];
  }
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data) return [];
    return data as GalleryImage[];
  } catch {
    return [];
  }
}

export { getStoragePhotoUrl, getStoragePhotoUrl as getGalleryImageUrl } from "@/lib/storage-url";

export async function getActiveSpecials(): Promise<Special[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("specials")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data) return [];
    // Active specials show as normal; inactive ones only stay visible if the
    // owner gave them a status_text (e.g. "Returning 07/02/26") explaining
    // why — otherwise inactive means fully hidden, as before.
    return (data as Special[]).filter((s) => s.is_active || Boolean(s.status_text?.trim()));
  } catch {
    return [];
  }
}

export async function getAllSpecials(): Promise<Special[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("specials")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data) return [];
    return data as Special[];
  } catch {
    return [];
  }
}

export async function getActiveFuelAnnouncements(): Promise<FuelAnnouncement[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("fuel_announcements")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data as FuelAnnouncement[];
  } catch {
    return [];
  }
}

export async function getAllFuelAnnouncements(): Promise<FuelAnnouncement[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("fuel_announcements")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data as FuelAnnouncement[];
  } catch {
    return [];
  }
}

export async function getStatusBanner(): Promise<StatusBanner | null> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("status_banner")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;
    return data as StatusBanner;
  } catch {
    return null;
  }
}
