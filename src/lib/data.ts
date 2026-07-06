import { createServerClient } from "@/lib/supabase/server";
import type { CafeProduct, FuelPrice, GalleryImage, StatusBanner } from "@/lib/types";

// Fallback data lets the site render before Supabase env vars / tables exist
// (first `npm run dev` right after cloning), rather than crashing the page.
const FALLBACK_FUEL_PRICES: FuelPrice[] = [
  { id: "fallback-95", fuel_type: "petrol_95", price: 22.99, updated_at: new Date().toISOString() },
  { id: "fallback-93", fuel_type: "petrol_93", price: 22.79, updated_at: new Date().toISOString() },
  { id: "fallback-diesel", fuel_type: "diesel_50ppm", price: 20.49, updated_at: new Date().toISOString() },
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

export function getGalleryImageUrl(filename: string): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return "";
  return `${url}/storage/v1/object/public/station-photos/${filename}`;
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
