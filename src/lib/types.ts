export type FuelType = "petrol_95" | "petrol_93" | "diesel_50ppm" | "diesel_10ppm";

export interface FuelPrice {
  id: string;
  fuel_type: FuelType;
  price: number;
  updated_at: string;
}

export type CafeCategory =
  | "fresh_bakery"
  | "cold_drinks"
  | "travel_snacks"
  | "tobacco_vapes"
  | "braai_outdoor"
  | "essentials";

export type CafeProductStatus =
  | "available"
  | "out_of_stock"
  | "coming_soon"
  | "temporarily_removed";

export interface CafeProduct {
  id: string;
  category: CafeCategory;
  name: string;
  description: string;
  sort_order: number;
  status: CafeProductStatus;
  is_best_price: boolean;
  image_filename: string | null;
}

export interface GalleryImage {
  id: string;
  filename: string;
  alt_text: string;
  caption: string;
  sort_order: number;
}

export interface StatusBanner {
  id: string;
  is_active: boolean;
  message: string;
  updated_at: string;
}

export interface Special {
  id: string;
  title: string;
  description: string;
  image_filename: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface FuelAnnouncement {
  id: string;
  message: string;
  is_active: boolean;
  created_at: string;
}
