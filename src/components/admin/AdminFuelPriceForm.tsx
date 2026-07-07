"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updateFuelPriceAction, type ActionResult } from "@/lib/actions";
import type { FuelPrice } from "@/lib/types";

const initialState: ActionResult = { success: false, message: "" };

const LABELS: Record<FuelPrice["fuel_type"], string> = {
  petrol_95: "Petrol 95",
  petrol_93: "Petrol 93",
  diesel_50ppm: "Diesel 50ppm",
  diesel_10ppm: "Diesel 10ppm",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-mbt-yellow px-5 py-2 font-display text-xs font-bold uppercase tracking-wide text-charcoal transition hover:brightness-95 disabled:opacity-60"
    >
      {pending ? "Saving…" : "Save"}
    </button>
  );
}

export default function AdminFuelPriceForm({ fuel }: { fuel: FuelPrice }) {
  const [state, formAction] = useFormState(updateFuelPriceAction, initialState);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-3 rounded-xl border border-white/10 bg-charcoal p-5 sm:flex-row sm:items-center"
    >
      <input type="hidden" name="fuel_type" value={fuel.fuel_type} />
      <span className="w-32 font-display text-sm font-bold text-white">
        {LABELS[fuel.fuel_type]}
      </span>
      <div className="flex items-center gap-2">
        <span className="text-white/50">R</span>
        <input
          type="number"
          name="price"
          step="0.01"
          min="0"
          defaultValue={fuel.price}
          required
          className="w-28 rounded-lg border border-white/15 bg-charcoal-card px-3 py-2 text-white focus:border-mbt-yellow focus:outline-none"
        />
      </div>
      <SubmitButton />
      {state.message && (
        <span className={`text-xs ${state.success ? "text-mbt-yellow" : "text-red-400"}`}>
          {state.message}
        </span>
      )}
    </form>
  );
}
