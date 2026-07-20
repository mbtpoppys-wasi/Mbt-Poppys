import type { Metadata, Viewport } from "next";
import AdminPwaRegister from "@/components/admin/AdminPwaRegister";
import AdminInstallPrompt from "@/components/admin/AdminInstallPrompt";

export const metadata: Metadata = {
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MBT Admin",
  },
  icons: {
    icon: "/icons/admin-icon-192.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#151515",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Rendered directly instead of via metadata.manifest — Next.js hardcodes
          crossOrigin="use-credentials" on that field with no way to opt out,
          which forces a credentialed CORS fetch that fails against Vercel's
          wildcard Access-Control-Allow-Origin and can silently break PWA
          installability checks. */}
      <link rel="manifest" href="/manifest-admin.webmanifest" />
      <AdminPwaRegister />
      <AdminInstallPrompt />
      {children}
    </>
  );
}
