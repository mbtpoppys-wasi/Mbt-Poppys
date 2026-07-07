import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatusBanner from "@/components/StatusBanner";
import FuelPricesSection from "@/components/FuelPricesSection";
import ImageFeatureRow from "@/components/ImageFeatureRow";
import NightShowcase from "@/components/NightShowcase";
import CafeSection from "@/components/CafeSection";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import LocationSection from "@/components/LocationSection";
import ServicesSection from "@/components/ServicesSection";
import NotificationSection from "@/components/NotificationSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <StatusBanner />
      <Hero />
      <FuelPricesSection />

      <ImageFeatureRow
        src="/images/buzz-cafe-ventersdorp-convenience-store-entrance.webp"
        alt="BUZZ Café convenience store entrance at MBT Poppys Ventersdorp during the day"
        label="BUZZ Café"
        title="Fresh, Fast,"
        highlight="Friendly"
        description="Bakery, cold drinks, and travel snacks — served with a smile any hour of the day."
        tint="bg-mbtDark"
      />

      <NightShowcase />

      <CafeSection />

      <ImageFeatureRow
        src="/images/buzz-cafe-ventersdorp-convenience-store-interior.webp"
        alt="Inside the BUZZ Café convenience store showing snack aisles and drinks fridges"
        label="Take A Look Inside"
        title="Stocked &"
        highlight="Ready"
        description="Well-lit aisles, cold drinks fridges, and fresh snacks — always tidy, always stocked."
        reverse
        tint="bg-mbtCard"
      />

      <ServicesSection />

      <ImageFeatureRow
        src="/images/buzz-cafe-ventersdorp-storefront-night.webp"
        alt="BUZZ Café storefront at MBT Poppys Ventersdorp lit up at night"
        label="Round The Clock"
        title="Open Through"
        highlight="The Night"
        description="Whatever time you pull in, the BUZZ Café doors are open and the lights are on."
        tint="bg-mbtDark"
      />

      <Reviews />

      <ImageFeatureRow
        src="/images/buzz-cafe-ventersdorp-snack-shelves-interior.webp"
        alt="Snack and chocolate shelving at the BUZZ Café till point in Ventersdorp"
        label="Before You Hit The Road"
        title="Stock Up For"
        highlight="The Trip"
        description="Chips, chocolates, and travel snacks by the till point — grab and go."
        reverse
        tint="bg-mbtCard"
      />

      <Gallery />
      <LocationSection />
      <NotificationSection />
      <Footer />
    </>
  );
}
