import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatusBanner from "@/components/StatusBanner";
import FuelPricesSection from "@/components/FuelPricesSection";
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
      <Gallery />
      <CafeSection />
      <ServicesSection />
      <Reviews />
      <LocationSection />
      <NotificationSection />
      <Footer />
    </>
  );
}
