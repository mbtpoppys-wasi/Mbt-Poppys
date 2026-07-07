import type { FuelPrice } from "@/lib/types";

const LABELS: Record<FuelPrice["fuel_type"], { kind: string; name: string }> = {
  petrol_95: { kind: "Unleaded", name: "Petrol 95" },
  petrol_93: { kind: "Unleaded", name: "Petrol 93" },
  diesel_50ppm: { kind: "Diesel", name: "50ppm" },
};

export default function FuelPriceCard({
  fuel,
  featured = false,
}: {
  fuel: FuelPrice;
  featured?: boolean;
}) {
  const label = LABELS[fuel.fuel_type];

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-mbtNear px-6 py-8 text-left transition duration-300 ${
        featured
          ? "border-2 border-mbtYellow shadow-[0_10px_40px_rgba(255,222,0,0.15)] sm:-translate-y-4"
          : "border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-white/30"
      }`}
    >
      <span
        className={`absolute inset-x-0 top-0 h-1 ${
          featured ? "bg-mbtYellow" : "bg-white/10 group-hover:bg-mbtYellow"
        } transition-colors`}
      />

      {featured && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-mbtYellow px-4 py-1 font-display text-[10px] font-black uppercase tracking-widest text-mbtDark shadow-lg">
          Premium Grade
        </span>
      )}

      <div className={featured ? "mt-2" : ""}>
        <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-white/50">
          {label.kind}
        </span>
        <span className="font-display text-xl font-bold uppercase text-white">{label.name}</span>
      </div>

      <p className="animate-glow-pulse py-4 font-display text-5xl font-black text-mbtYellow">
        R{fuel.price.toFixed(2)}
      </p>

      <div>
        {featured ? (
          <span className="inline-block rounded bg-mbtYellow px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-widest text-mbtDark">
            ★ Best Fleet Rate
          </span>
        ) : (
          <span className="inline-block rounded border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-widest text-emerald-400">
            ✓ Official Locked
          </span>
        )}
      </div>
    </div>
  );
}
