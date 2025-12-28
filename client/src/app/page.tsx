import AboutSection from "@/components/home/AboutSection";
import BestSelling from "@/components/home/BestSelling";
import CategorySection from "@/components/home/CategorySection";
import { HeroSection } from "@/components/home/HeroSection";
import OfferBanner from "@/components/home/OfferBanner";
import RecentOrders from "@/components/home/RecentOrders";
import Reviews from "@/components/home/Reviews";
import TrendingProducts from "@/components/home/TrendingProducts";
import TrustSection from "@/components/home/TrustSection";
import VideoSection from "@/components/home/VideoSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection/>
      <CategorySection />
      <BestSelling />
      <OfferBanner />
      <TrendingProducts />
      <TrustSection />
      <RecentOrders />
      <Reviews />
      <VideoSection />
      <AboutSection />
    </div>
  );
}
