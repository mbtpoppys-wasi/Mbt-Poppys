import type { FuelPrice } from "@/lib/types";

const LABELS: Record<FuelPrice["fuel_type"], string> = {
  petrol_95: "Petrol 95",
  petrol_93: "Petrol 93",
  diesel_50ppm: "Diesel 50ppm",
};

export default function FuelPriceCard({ fuel }: { fuel: FuelPrice }) {
  const updated = new Date(fuel.updated_at);
  const formatted = updated.toLocaleDateString("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl border border-mbt-yellow/20 bg-charcoal-card px-6 py-8 text-center shadow-led-glow">
      <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
        {LABELS[fuel.fuel_type]}
      </p>
      <p className="mt-4 font-display text-5xl font-bold text-mbt-yellow text-shadow-led sm:text-6xl">
        R{fuel.price.toFixed(2)}
      </p>
      <p className="mt-1 text-xs text-white/40">per litre</p>
      <p className="mt-6 text-xs text-white/40">Last updated: {formatted}</p>
    </div>
  );
}
