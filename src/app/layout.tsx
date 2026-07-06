import type { Metadata } from "next";
import { Orbitron, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { getPlaceRating } from "@/lib/google-places";
import { buildGasStationJsonLd } from "@/lib/json-ld";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "MBT Poppys Ventersdorp | 24 Hour Fuel Station & Filling Station Ventersdorp",
    template: "%s | MBT Poppys Ventersdorp",
  },
  description:
    "MBT Poppys Ventersdorp is a 24 hour filling station and garage in Ventersdorp offering petrol 95, petrol 93, and 50ppm diesel, plus the BUZZ Café convenience store, drive-thru deli, and tyre & spares desk at 13 Carmichael Street. Your reliable petrol station near me stop in Ventersdorp, day or night.",
  keywords: [
    "fuel station Ventersdorp",
    "garage Ventersdorp",
    "petrol station near me Ventersdorp",
    "24 hour filling station Ventersdorp",
    "diesel Ventersdorp",
    "BUZZ Café Ventersdorp",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: siteConfig.url,
    siteName: siteConfig.businessName,
    title: "MBT Poppys Ventersdorp | 24 Hour Fuel Station & Filling Station Ventersdorp",
    description:
      "24-hour fuel station and BUZZ Café convenience store at 13 Carmichael Street, Ventersdorp. Petrol 95, Petrol 93, and 50ppm diesel — open around the clock.",
    images: [
      {
        url: "/images/hero-canopy.jpg",
        width: 1200,
        height: 630,
        alt: "MBT Poppys Ventersdorp fuel station canopy at night, 13 Carmichael Street Ventersdorp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MBT Poppys Ventersdorp | 24 Hour Fuel Station Ventersdorp",
    description:
      "24-hour fuel station and BUZZ Café convenience store at 13 Carmichael Street, Ventersdorp.",
    images: ["/images/hero-canopy.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rating = await getPlaceRating();
  const jsonLd = buildGasStationJsonLd(rating);

  return (
    <html lang="en-ZA" className={`${orbitron.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body bg-charcoal text-white antialiased">{children}</body>
    </html>
  );
}
