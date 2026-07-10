import type { Metadata } from "next";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  getAllFuelAnnouncements,
  getAllSpecials,
  getCafeProducts,
  getFuelPrices,
  getStatusBanner,
} from "@/lib/data";
import AdminLoginScreen from "@/components/admin/AdminLoginScreen";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Owner Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

// Hidden owner portal: never linked from public navigation and disallowed in
// robots.txt. Auth is enforced server-side (HMAC session cookie), all writes
// go through server actions behind requireAdmin() — the browser never holds
// a privileged key.
export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return <AdminLoginScreen />;
  }

  const [fuelPrices, statusBanner, cafeProducts, specials, fuelAnnouncements] =
    await Promise.all([
      getFuelPrices(),
      getStatusBanner(),
      getCafeProducts(),
      getAllSpecials(),
      getAllFuelAnnouncements(),
    ]);

  return (
    <AdminDashboard
      fuelPrices={fuelPrices}
      statusBanner={statusBanner}
      cafeProducts={cafeProducts}
      specials={specials}
      fuelAnnouncements={fuelAnnouncements}
    />
  );
}
