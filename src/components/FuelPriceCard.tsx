import type { FuelPrice } from "@/lib/types";

const LABELS: Record<FuelPrice["fuel_type"], string> = {
  petrol_95: "Petrol 95",
  petrol_93: "Petrol 93",
  diesel_50ppm: "Diesel 50ppm",
};

export default function FuelPriceCard({
  fuel,
  featured = false,
}: {
  fuel: FuelPrice;
  featured?: boolean;
}) {
  const updated = new Date(fuel.updated_at);
  const formatted = updated.toLocaleDateString("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className={`relative rounded-2xl bg-mbtNear px-6 py-8 text-center transition ${
        featured
          ? "border-2 border-mbtYellow shadow-led-glow-lg sm:-translate-y-4"
          : "border border-white/10 shadow-led-glow"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-mbtYellow px-4 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-mbtDark shadow-led-glow">
          Premium Grade
        </span>
      )}

      <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
        {LABELS[fuel.fuel_type]}
      </p>
      <p className="mt-4 animate-glow-pulse font-display text-5xl font-bold text-mbtYellow sm:text-6xl">
        R{fuel.price.toFixed(2)}
      </p>
      <p className="mt-1 text-xs text-white/40">per litre</p>
      <p className="mt-6 text-xs text-white/40">Last updated: {formatted}</p>

      <div className="mt-5">
        {featured ? (
          <span className="inline-block rounded-full bg-mbtYellow px-4 py-1.5 font-display text-[10px] font-bold uppercase tracking-widest text-mbtDark">
            Best Fleet Rate
          </span>
        ) : (
          <span className="inline-block rounded-full bg-emerald-500/15 px-4 py-1.5 font-display text-[10px] font-bold uppercase tracking-widest text-emerald-400">
            Official Locked
          </span>
        )}
      </div>
    </div>
  );
}
