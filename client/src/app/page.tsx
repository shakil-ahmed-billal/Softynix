"use client";

import AboutSection from "@/components/home/AboutSection";
import BestSelling from "@/components/home/BestSelling";
import CategorySection from "@/components/home/CategorySection";
import { HeroSection } from "@/components/home/HeroSection";
import MobileAboutSection from "@/components/home/Mobile/MobileAboutSection";
import MobileCountdownSection from "@/components/home/Mobile/MobileCountdownSection";
import MobileTestimonials from "@/components/home/Mobile/MobileTestimonials";
import MobileTrendingProducts from "@/components/home/Mobile/MobileTrendingProducts";
import MobileTrustSection from "@/components/home/Mobile/MobileTrustSection";
import MobileViewCategoriesSection from "@/components/home/Mobile/MobileViewCategoriesSection";
import MobileViewProductsSection from "@/components/home/Mobile/MobileViewProductsSection";
import MobileViewRecentOrders from "@/components/home/Mobile/MobileViewRecentOrders";
import MobileWhyChooseUs from "@/components/home/Mobile/MobileWhyChooseUs";
import OfferBanner from "@/components/home/OfferBanner";
import RecentOrders from "@/components/home/RecentOrders";
import Reviews from "@/components/home/Reviews";
import TrendingProducts from "@/components/home/TrendingProducts";
import TrustSection from "@/components/home/TrustSection";
import VideoSection from "@/components/home/VideoSection";

export default function Home() {
  return (
    <div className="">
      <div className="flex flex-col">
        <HeroSection />
        {/* Categories */}
        <div className="">
          <div className="hidden md:block">
            <CategorySection />
          </div>
          <div className="block md:hidden">
            <MobileViewCategoriesSection />
          </div>
        </div>
        {/* Best Selling Products */}
        <div className="">
          <div className="hidden md:block">
            <BestSelling />
          </div>
          <div className="block md:hidden">
            <MobileViewProductsSection
              title="সেরা বিক্রিত প্রোডাক্টসমূহ"
              showViewAll={true}
            />
          </div>
        </div>
        {/* Offer Banner */}
        <div className="">
          <div className="hidden md:block">
            <OfferBanner />
          </div>
          <div className="block md:hidden">
            <MobileCountdownSection />
          </div>
        </div>
        {/* Trending Products */}
        <div className="">
          <div className="hidden md:block">
            <TrendingProducts />
          </div>
          <div className="block md:hidden">
            <MobileTrendingProducts/>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="">
          <div className="hidden md:block">
            <TrustSection />
          </div>
          <div className="block md:hidden">
            <MobileWhyChooseUs />
          </div>
        </div>
       {/* Recent Orders */}
        <div className="">
          <div className="hidden md:block">
            <RecentOrders />
          </div>
          <div className="block md:hidden">
            <MobileViewRecentOrders />
          </div>
        </div>
        {/* Testimonials */}
        <div className="">
          <div className="hidden md:block">
            <Reviews />
          </div>
          <div className="block md:hidden">
            <MobileTestimonials />
          </div>
        </div>
        {/* Why Choose Us */}
        <div className="">
          <div className="hidden md:block">
            <TrustSection />
          </div>
          <div className="block md:hidden">
            <MobileTrustSection />
          </div>
        </div>
        {/* About Section */}
        <div className="">
          <div className="hidden md:block">
            <AboutSection />
          </div>
          <div className="block md:hidden">
            <MobileAboutSection />
          </div>
        </div>
      </div>
    </div>
  );
}
