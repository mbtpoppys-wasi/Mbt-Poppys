import { getFuelPrices } from "@/lib/data";
import FuelPriceCard from "@/components/FuelPriceCard";
import Reveal from "@/components/Reveal";

export default async function FuelPricesSection() {
  const prices = await getFuelPrices();
  const order: Record<string, number> = {
    petrol_95: 0,
    petrol_93: 1,
    diesel_50ppm: 2,
    diesel_10ppm: 3,
  };
  const sorted = [...prices].sort((a, b) => order[a.fuel_type] - order[b.fuel_type]);

  const latestUpdate = prices.reduce<Date | null>((latest, fuel) => {
    const updated = new Date(fuel.updated_at);
    return !latest || updated > latest ? updated : latest;
  }, null);

  const formattedUpdate = latestUpdate
    ? latestUpdate.toLocaleDateString("en-ZA", { day: "2-digit", month: "short", year: "numeric" })
    : null;

  return (
    <section
      id="fuel-prices"
      className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-mbtDark to-[#1a1a1a] px-4 py-20 text-center"
    >
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 -translate-y-1/2 rounded-full bg-mbtYellow/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 translate-y-1/2 rounded-full bg-mbtYellow/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <span className="mb-6 inline-block rounded-full border border-mbtYellow/30 bg-mbtYellow/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-mbtYellow shadow-[0_0_10px_rgba(255,222,0,0.1)] sm:text-xs">
          ⛽ Official Regulated Rates
        </span>
        <h2 className="mb-4 font-display text-4xl font-black uppercase tracking-tight text-white drop-shadow-lg sm:text-6xl md:text-7xl">
          Live Fuel <span className="text-mbtYellow">Prices</span>
        </h2>
        <p className="mx-auto mb-16 max-w-xl text-sm font-medium text-white/50 sm:text-base">
          Real-time pump pricing at MBT Poppys Ventersdorp, 38 Hendrik Potgieter Street, Ventersdorp.
        </p>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {sorted.map((fuel, index) => (
            <Reveal key={fuel.id} delay={index * 100}>
              <FuelPriceCard fuel={fuel} featured={fuel.fuel_type === "diesel_10ppm"} />
            </Reveal>
          ))}
        </div>

        {formattedUpdate && (
          <div className="mx-auto mt-12 flex max-w-lg items-center justify-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-white/50">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span>Prices last verified: {formattedUpdate}. Reviewed regularly by the owner.</span>
          </div>
        )}
      </div>
    </section>
  );
}
