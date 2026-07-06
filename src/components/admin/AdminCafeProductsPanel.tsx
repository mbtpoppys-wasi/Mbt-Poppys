"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  addCafeProductAction,
  deleteCafeProductAction,
  type ActionResult,
} from "@/lib/actions";
import type { CafeProduct } from "@/lib/types";

const initialState: ActionResult = { success: false, message: "" };

const CATEGORY_LABELS: Record<CafeProduct["category"], string> = {
  fresh_bakery: "Fresh Bakery",
  cold_drinks: "Cold Drinks",
  travel_snacks: "Travel Snacks",
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

function DeleteProductForm({ id }: { id: string }) {
  const [, formAction] = useFormState(deleteCafeProductAction, initialState);
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <DeleteButton />
    </form>
  );
}

export default function AdminCafeProductsPanel({ products }: { products: CafeProduct[] }) {
  const [state, formAction] = useFormState(addCafeProductAction, initialState);

  return (
    <div className="space-y-6">
      <form
        action={formAction}
        className="grid grid-cols-1 gap-3 rounded-xl border border-white/10 bg-charcoal p-5 sm:grid-cols-2"
      >
        <select
          name="category"
          required
          className="rounded-lg border border-white/15 bg-charcoal-card px-3 py-2 text-white focus:border-mbt-yellow focus:outline-none"
        >
          <option value="fresh_bakery">Fresh Bakery</option>
          <option value="cold_drinks">Cold Drinks</option>
          <option value="travel_snacks">Travel Snacks</option>
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
        <div className="flex items-center gap-3 sm:col-span-2">
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
            className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-charcoal p-4"
          >
            <div>
              <p className="text-xs uppercase tracking-wide text-mbt-yellow">
                {CATEGORY_LABELS[product.category]}
              </p>
              <p className="font-semibold text-white">{product.name}</p>
              {product.description && (
                <p className="text-sm text-white/50">{product.description}</p>
              )}
            </div>
            <DeleteProductForm id={product.id} />
          </div>
        ))}
        {products.length === 0 && (
          <p className="text-sm text-white/40">No products yet — add one above.</p>
        )}
      </div>
    </div>
  );
}
