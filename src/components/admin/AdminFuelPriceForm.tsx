"use client";

import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { updateFuelPriceAction, type ActionResult } from "@/lib/actions";
import type { FuelPrice } from "@/lib/types";
import AutosaveIndicator from "@/components/admin/AutosaveIndicator";

const initialState: ActionResult = { success: false, message: "" };

const LABELS: Record<FuelPrice["fuel_type"], string> = {
  petrol_95: "Petrol 95",
  petrol_93: "Petrol 93",
  diesel_50ppm: "Diesel 50ppm",
  diesel_10ppm: "Diesel 10ppm",
};

function StatusSlot({ success, message }: { success: boolean; message: string }) {
  const { pending } = useFormStatus();
  return <AutosaveIndicator pending={pending} success={success} message={message} />;
}

export default function AdminFuelPriceForm({ fuel }: { fuel: FuelPrice }) {
  const [state, formAction] = useFormState(updateFuelPriceAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const lastSaved = useRef(fuel.price);

  const autosave = () => {
    const input = formRef.current?.elements.namedItem("price") as HTMLInputElement | null;
    const value = Number(input?.value);
    if (!Number.isFinite(value) || value <= 0 || value === lastSaved.current) return;
    lastSaved.current = value;
    formRef.current?.requestSubmit();
  };

  return (
    <form
      ref={formRef}
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
          onBlur={autosave}
          className="w-28 rounded-lg border border-white/15 bg-charcoal-card px-3 py-2 text-white focus:border-mbt-yellow focus:outline-none"
        />
      </div>
      <span className="text-xs text-white/30">Saves automatically when you click away</span>
      <StatusSlot success={state.success} message={state.message} />
    </form>
  );
}
