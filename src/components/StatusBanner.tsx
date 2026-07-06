import { getStatusBanner } from "@/lib/data";
import StatusBannerClient from "@/components/StatusBannerClient";

export default async function StatusBanner() {
  const banner = await getStatusBanner();
  if (!banner || !banner.is_active || !banner.message) return null;

  return <StatusBannerClient message={banner.message} updatedAt={banner.updated_at} />;
}
