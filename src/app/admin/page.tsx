import type { Metadata } from "next";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  getAllSpecials,
  getCafeProducts,
  getFuelPrices,
  getGalleryImages,
  getStatusBanner,
} from "@/lib/data";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import AdminFuelPriceForm from "@/components/admin/AdminFuelPriceForm";
import AdminStatusBannerForm from "@/components/admin/AdminStatusBannerForm";
import AdminCafeProductsPanel from "@/components/admin/AdminCafeProductsPanel";
import AdminGalleryPanel from "@/components/admin/AdminGalleryPanel";
import AdminSpecialsPanel from "@/components/admin/AdminSpecialsPanel";

export const metadata: Metadata = {
  title: "Owner Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-charcoal px-4 py-12">
        <AdminLoginForm />
      </main>
    );
  }

  const [fuelPrices, statusBanner, cafeProducts, galleryImages, specials] = await Promise.all([
    getFuelPrices(),
    getStatusBanner(),
    getCafeProducts(),
    getGalleryImages(),
    getAllSpecials(),
  ]);

  const order: Record<string, number> = {
    petrol_95: 0,
    petrol_93: 1,
    diesel_50ppm: 2,
    diesel_10ppm: 3,
  };
  const sortedFuel = [...fuelPrices].sort((a, b) => order[a.fuel_type] - order[b.fuel_type]);

  return (
    <main className="min-h-screen bg-charcoal px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
            Owner Admin
          </h1>
          <AdminLogoutButton />
        </div>

        <section>
          <h2 className="font-display text-lg font-bold uppercase tracking-wide text-mbt-yellow">
            Fuel Prices
          </h2>
          <div className="mt-4 space-y-3">
            {sortedFuel.map((fuel) => (
              <AdminFuelPriceForm key={fuel.id} fuel={fuel} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold uppercase tracking-wide text-mbt-yellow">
            Generator / Load-Shedding Banner
          </h2>
          <div className="mt-4">
            {statusBanner ? (
              <AdminStatusBannerForm banner={statusBanner} />
            ) : (
              <p className="text-sm text-white/40">
                No banner row found — run the status_banner migration first.
              </p>
            )}
          </div>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold uppercase tracking-wide text-mbt-yellow">
            BUZZ Café Products
          </h2>
          <div className="mt-4">
            <AdminCafeProductsPanel products={cafeProducts} />
          </div>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold uppercase tracking-wide text-mbt-yellow">
            Photo Gallery
          </h2>
          <div className="mt-4">
            <AdminGalleryPanel images={galleryImages} />
          </div>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold uppercase tracking-wide text-mbt-yellow">
            Specials
          </h2>
          <div className="mt-4">
            <AdminSpecialsPanel specials={specials} />
          </div>
        </section>
      </div>
    </main>
  );
}
