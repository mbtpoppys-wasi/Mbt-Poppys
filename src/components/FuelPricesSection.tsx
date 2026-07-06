import { getFuelPrices } from "@/lib/data";
import FuelPriceCard from "@/components/FuelPriceCard";

export default async function FuelPricesSection() {
  const prices = await getFuelPrices();
  const order: Record<string, number> = { petrol_95: 0, petrol_93: 1, diesel_50ppm: 2 };
  const sorted = [...prices].sort((a, b) => order[a.fuel_type] - order[b.fuel_type]);

  return (
    <section id="fuel-prices" className="bg-charcoal py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
            Live Fuel Prices
          </h2>
          <p className="mt-3 text-white/60">
            Straight off the pump board at 13 Carmichael Street, Ventersdorp.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {sorted.map((fuel) => (
            <FuelPriceCard key={fuel.id} fuel={fuel} />
          ))}
        </div>
      </div>
    </section>
  );
}
