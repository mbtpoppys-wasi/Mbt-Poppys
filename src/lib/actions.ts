"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkAdminPassword, clearAdminSession, isAdminAuthenticated, setAdminSession } from "@/lib/auth";
import { createServiceRoleClient } from "@/lib/supabase/server";
import type { CafeCategory, CafeProductStatus, FuelType } from "@/lib/types";

const CAFE_STATUSES = ["available", "out_of_stock", "coming_soon", "temporarily_removed"];

export type ActionResult = { success: boolean; message: string };

export async function loginAction(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  const password = String(formData.get("password") ?? "");

  if (!checkAdminPassword(password)) {
    return { success: false, message: "Incorrect password." };
  }

  await setAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin");
}

async function requireAdmin() {
  const ok = await isAdminAuthenticated();
  if (!ok) throw new Error("Not authenticated");
}

export async function updateFuelPriceAction(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  const fuelType = String(formData.get("fuel_type") ?? "") as FuelType;
  const priceRaw = String(formData.get("price") ?? "");
  const price = Number(priceRaw);

  if (!["petrol_95", "petrol_93", "diesel_50ppm", "diesel_10ppm"].includes(fuelType)) {
    return { success: false, message: "Invalid fuel type." };
  }
  if (!Number.isFinite(price) || price <= 0) {
    return { success: false, message: "Enter a valid price." };
  }

  const supabase = createServiceRoleClient();
  const { error } = await supabase
    .from("fuel_prices")
    .update({ price, updated_at: new Date().toISOString() })
    .eq("fuel_type", fuelType);

  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true, message: "Price updated." };
}

export async function updateStatusBannerAction(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const isActive = formData.get("is_active") === "on";
  const message = String(formData.get("message") ?? "").trim();

  const supabase = createServiceRoleClient();
  const { error } = await supabase
    .from("status_banner")
    .update({ is_active: isActive, message, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true, message: "Banner updated." };
}

export async function addCafeProductAction(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  const category = String(formData.get("category") ?? "") as CafeCategory;
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const sortOrder = Number(formData.get("sort_order") ?? 0);
  const isBestPrice = formData.get("is_best_price") === "on";
  const file = formData.get("image");

  if (
    !["fresh_bakery", "cold_drinks", "travel_snacks", "tobacco_vapes", "braai_outdoor", "essentials"].includes(
      category
    )
  ) {
    return { success: false, message: "Invalid category." };
  }
  if (!name) return { success: false, message: "Product name is required." };

  const supabase = createServiceRoleClient();

  let imageFilename: string | null = null;
  if (file instanceof File && file.size > 0) {
    imageFilename = slugifyFilename("cafe-product", name, file.name);
    const { error: uploadError } = await supabase.storage
      .from("station-photos")
      .upload(imageFilename, await file.arrayBuffer(), {
        contentType: file.type || "image/jpeg",
        upsert: false,
      });
    if (uploadError) return { success: false, message: uploadError.message };
  }

  const { error } = await supabase.from("cafe_products").insert({
    category,
    name,
    description,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
    is_best_price: isBestPrice,
    image_filename: imageFilename,
  });

  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true, message: "Product added." };
}

export async function updateCafeProductStatusAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as CafeProductStatus;
  if (!id) return { success: false, message: "Missing product id." };
  if (!CAFE_STATUSES.includes(status)) return { success: false, message: "Invalid status." };

  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("cafe_products").update({ status }).eq("id", id);
  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true, message: "Status updated." };
}

export async function toggleCafeProductBestPriceAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const current = formData.get("is_best_price") === "true";
  if (!id) return { success: false, message: "Missing product id." };

  const supabase = createServiceRoleClient();
  const { error } = await supabase
    .from("cafe_products")
    .update({ is_best_price: !current })
    .eq("id", id);
  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true, message: "Updated." };
}

export async function deleteCafeProductAction(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const imageFilename = String(formData.get("image_filename") ?? "");
  if (!id) return { success: false, message: "Missing product id." };

  const supabase = createServiceRoleClient();

  if (imageFilename) {
    await supabase.storage.from("station-photos").remove([imageFilename]);
  }

  const { error } = await supabase.from("cafe_products").delete().eq("id", id);

  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true, message: "Product removed." };
}

function slugifyFilename(businessSlug: string, alt: string, originalName: string): string {
  const ext = originalName.includes(".") ? originalName.split(".").pop() : "jpg";
  const descriptor = alt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
  const unique = Date.now().toString(36);
  return `${businessSlug}-${descriptor}-${unique}.${ext}`;
}

export async function addGalleryImageAction(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  const file = formData.get("file");
  const altText = String(formData.get("alt_text") ?? "").trim();
  const caption = String(formData.get("caption") ?? "").trim();
  const sortOrder = Number(formData.get("sort_order") ?? 0);

  if (!(file instanceof File) || file.size === 0) {
    return { success: false, message: "Please choose a photo to upload." };
  }
  if (!altText) {
    return { success: false, message: "Alt text is required for SEO and accessibility." };
  }

  const filename = slugifyFilename("mbt-poppys-ventersdorp", altText, file.name);
  const supabase = createServiceRoleClient();

  const { error: uploadError } = await supabase.storage
    .from("station-photos")
    .upload(filename, await file.arrayBuffer(), {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });

  if (uploadError) return { success: false, message: uploadError.message };

  const { error: insertError } = await supabase.from("gallery_images").insert({
    filename,
    alt_text: altText,
    caption,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
  });

  if (insertError) return { success: false, message: insertError.message };

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true, message: "Photo uploaded." };
}

export async function deleteGalleryImageAction(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const filename = String(formData.get("filename") ?? "");
  if (!id) return { success: false, message: "Missing image id." };

  const supabase = createServiceRoleClient();

  if (filename) {
    await supabase.storage.from("station-photos").remove([filename]);
  }

  const { error } = await supabase.from("gallery_images").delete().eq("id", id);
  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true, message: "Photo removed." };
}

export async function addSpecialAction(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const sortOrder = Number(formData.get("sort_order") ?? 0);
  const file = formData.get("image");

  if (!title) return { success: false, message: "Title is required." };

  const supabase = createServiceRoleClient();

  let imageFilename: string | null = null;
  if (file instanceof File && file.size > 0) {
    imageFilename = slugifyFilename("special", title, file.name);
    const { error: uploadError } = await supabase.storage
      .from("station-photos")
      .upload(imageFilename, await file.arrayBuffer(), {
        contentType: file.type || "image/jpeg",
        upsert: false,
      });
    if (uploadError) return { success: false, message: uploadError.message };
  }

  const { error } = await supabase.from("specials").insert({
    title,
    description,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
    image_filename: imageFilename,
  });

  if (error) return { success: false, message: error.message };

  revalidatePath("/specials");
  revalidatePath("/admin");
  return { success: true, message: "Special added." };
}

export async function moveSpecialAction(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");
  if (!id || (direction !== "up" && direction !== "down")) {
    return { success: false, message: "Invalid move." };
  }

  const supabase = createServiceRoleClient();
  const { data: all, error: fetchError } = await supabase
    .from("specials")
    .select("id, sort_order")
    .order("sort_order", { ascending: true });

  if (fetchError || !all) return { success: false, message: fetchError?.message ?? "Could not load specials." };

  const index = all.findIndex((row) => row.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= all.length) {
    return { success: true, message: "" };
  }

  const current = all[index];
  const swap = all[swapIndex];

  const [{ error: e1 }, { error: e2 }] = await Promise.all([
    supabase.from("specials").update({ sort_order: swap.sort_order }).eq("id", current.id),
    supabase.from("specials").update({ sort_order: current.sort_order }).eq("id", swap.id),
  ]);

  if (e1 || e2) return { success: false, message: (e1 ?? e2)?.message ?? "Reorder failed." };

  revalidatePath("/specials");
  revalidatePath("/admin");
  return { success: true, message: "Reordered." };
}

export async function toggleSpecialAction(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const isActive = formData.get("is_active") === "true";
  if (!id) return { success: false, message: "Missing special id." };

  const supabase = createServiceRoleClient();
  const { error } = await supabase
    .from("specials")
    .update({ is_active: !isActive, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { success: false, message: error.message };

  revalidatePath("/specials");
  revalidatePath("/admin");
  return { success: true, message: "Special updated." };
}

export async function deleteSpecialAction(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const imageFilename = String(formData.get("image_filename") ?? "");
  if (!id) return { success: false, message: "Missing special id." };

  const supabase = createServiceRoleClient();

  if (imageFilename) {
    await supabase.storage.from("station-photos").remove([imageFilename]);
  }

  const { error } = await supabase.from("specials").delete().eq("id", id);
  if (error) return { success: false, message: error.message };

  revalidatePath("/specials");
  revalidatePath("/admin");
  return { success: true, message: "Special removed." };
}

export async function addFuelAnnouncementAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  const message = String(formData.get("message") ?? "").trim();
  if (!message) return { success: false, message: "Message is required." };

  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("fuel_announcements").insert({ message });

  if (error) return { success: false, message: error.message };

  revalidatePath("/fuel-updates");
  revalidatePath("/admin");
  return { success: true, message: "Announcement posted." };
}

export async function toggleFuelAnnouncementAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const isActive = formData.get("is_active") === "true";
  if (!id) return { success: false, message: "Missing announcement id." };

  const supabase = createServiceRoleClient();
  const { error } = await supabase
    .from("fuel_announcements")
    .update({ is_active: !isActive })
    .eq("id", id);

  if (error) return { success: false, message: error.message };

  revalidatePath("/fuel-updates");
  revalidatePath("/admin");
  return { success: true, message: "Updated." };
}

export async function deleteFuelAnnouncementAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) return { success: false, message: "Missing announcement id." };

  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("fuel_announcements").delete().eq("id", id);
  if (error) return { success: false, message: error.message };

  revalidatePath("/fuel-updates");
  revalidatePath("/admin");
  return { success: true, message: "Announcement removed." };
}
