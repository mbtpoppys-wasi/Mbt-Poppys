import type { Metadata, Viewport } from "next";
import AdminPwaRegister from "@/components/admin/AdminPwaRegister";

export const metadata: Metadata = {
  manifest: "/manifest-admin.webmanifest",
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
      <AdminPwaRegister />
      {children}
    </>
  );
}
