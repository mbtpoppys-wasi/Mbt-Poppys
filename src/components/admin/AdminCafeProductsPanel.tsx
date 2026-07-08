"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  addCafeProductAction,
  deleteCafeProductAction,
  toggleCafeProductBestPriceAction,
  updateCafeProductStatusAction,
  type ActionResult,
} from "@/lib/actions";
import type { CafeProduct, CafeProductStatus } from "@/lib/types";
import { getStoragePhotoUrl } from "@/lib/storage-url";
import AutosaveIndicator from "@/components/admin/AutosaveIndicator";

const initialState: ActionResult = { success: false, message: "" };

const CATEGORY_LABELS: Record<CafeProduct["category"], string> = {
  fresh_bakery: "Fresh Bakery",
  cold_drinks: "Cold Drinks",
  travel_snacks: "Travel Snacks",
  tobacco_vapes: "Tobacco & Vapes",
  braai_outdoor: "Braai & Outdoor",
  essentials: "Essentials",
};

const STATUS_LABELS: Record<CafeProductStatus, string> = {
  available: "Available",
  out_of_stock: "Out of Stock",
  coming_soon: "Coming Soon",
  temporarily_removed: "Temporarily Removed",
};

function AddSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-mbt-yellow px-5 py-2 font-display text-xs font-bold uppercase tracking-wide text-charcoal transition hover:brightness-95 disabled:opacity-60"
    >
      {pending ? "Adding…" : "Add Product"}
    </button>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full border border-red-400/40 px-3 py-1 text-xs font-semibold text-red-400 transition hover:bg-red-400/10 disabled:opacity-60"
    >
      {pending ? "Removing…" : "Remove"}
    </button>
  );
}

function DeleteProductForm({ id, imageFilename }: { id: string; imageFilename: string | null }) {
  const [, formAction] = useFormState(deleteCafeProductAction, initialState);
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="image_filename" value={imageFilename ?? ""} />
      <DeleteButton />
    </form>
  );
}

function StatusSelectForm({ id, status }: { id: string; status: CafeProductStatus }) {
  const [state, formAction] = useFormState(updateCafeProductStatusAction, initialState);
  return (
    <form action={formAction} className="flex items-center gap-2">
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="rounded-lg border border-white/15 bg-charcoal-card px-2 py-1 text-xs text-white focus:border-mbt-yellow focus:outline-none"
      >
        {Object.entries(STATUS_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <AutosaveIndicator pending={false} success={state.success} message="" />
    </form>
  );
}

function BestPriceToggleForm({ id, isBestPrice }: { id: string; isBestPrice: boolean }) {
  const [, formAction] = useFormState(toggleCafeProductBestPriceAction, initialState);
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="is_best_price" value={String(isBestPrice)} />
      <button
        type="submit"
        className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
          isBestPrice
            ? "border-mbt-yellow/60 bg-mbt-yellow/10 text-mbt-yellow"
            : "border-white/20 text-white/40 hover:bg-white/10"
        }`}
      >
        ★ Best Price
      </button>
    </form>
  );
}

export default function AdminCafeProductsPanel({ products }: { products: CafeProduct[] }) {
  const [state, formAction] = useFormState(addCafeProductAction, initialState);

  return (
    <div className="space-y-6">
      <form
        action={formAction}
        encType="multipart/form-data"
        className="grid grid-cols-1 gap-3 rounded-xl border border-white/10 bg-charcoal p-5 sm:grid-cols-2"
      >
        <select
          name="category"
          required
          className="rounded-lg border border-white/15 bg-charcoal-card px-3 py-2 text-white focus:border-mbt-yellow focus:outline-none"
        >
          {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="sort_order"
          placeholder="Sort order (optional)"
          defaultValue={0}
          className="rounded-lg border border-white/15 bg-charcoal-card px-3 py-2 text-white placeholder:text-white/40 focus:border-mbt-yellow focus:outline-none"
        />
        <input
          type="text"
          name="name"
          required
          placeholder="Product name"
          className="rounded-lg border border-white/15 bg-charcoal-card px-3 py-2 text-white placeholder:text-white/40 focus:border-mbt-yellow focus:outline-none sm:col-span-2"
        />
        <textarea
          name="description"
          placeholder="Short description"
          rows={2}
          className="rounded-lg border border-white/15 bg-charcoal-card px-3 py-2 text-white placeholder:text-white/40 focus:border-mbt-yellow focus:outline-none sm:col-span-2"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          className="rounded-lg border border-white/15 bg-charcoal-card px-3 py-2 text-white file:mr-3 file:rounded-full file:border-0 file:bg-mbt-yellow file:px-3 file:py-1 file:text-xs file:font-bold file:text-charcoal sm:col-span-2"
        />
        <label className="flex items-center gap-2 text-sm text-white">
          <input type="checkbox" name="is_best_price" className="h-4 w-4 accent-mbt-yellow" />
          Best price in town
        </label>
        <div className="flex items-center gap-3">
          <AddSubmitButton />
          {state.message && (
            <span className={`text-xs ${state.success ? "text-mbt-yellow" : "text-red-400"}`}>
              {state.message}
            </span>
          )}
        </div>
      </form>

      <div className="space-y-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col gap-3 rounded-xl border border-white/10 bg-charcoal p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              {product.image_filename && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={getStoragePhotoUrl(product.image_filename)}
                  alt={product.name}
                  className="h-12 w-12 flex-shrink-0 rounded-lg object-cover"
                />
              )}
              <div>
                <p className="text-xs uppercase tracking-wide text-mbt-yellow">
                  {CATEGORY_LABELS[product.category]}
                </p>
                <p className="font-semibold text-white">{product.name}</p>
                {product.description && (
                  <p className="text-sm text-white/50">{product.description}</p>
                )}
              </div>
            </div>
            <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
              <StatusSelectForm id={product.id} status={product.status} />
              <BestPriceToggleForm id={product.id} isBestPrice={product.is_best_price} />
              <DeleteProductForm id={product.id} imageFilename={product.image_filename} />
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <p className="text-sm text-white/40">No products yet — add one above.</p>
        )}
      </div>
    </div>
  );
}
