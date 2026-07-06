export type FuelType = "petrol_95" | "petrol_93" | "diesel_50ppm";

export interface FuelPrice {
  id: string;
  fuel_type: FuelType;
  price: number;
  updated_at: string;
}

export type CafeCategory = "fresh_bakery" | "cold_drinks" | "travel_snacks";

export interface CafeProduct {
  id: string;
  category: CafeCategory;
  name: string;
  description: string;
  sort_order: number;
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
