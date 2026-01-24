"use client";

import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { useFeaturedProducts } from "@/hooks/useFeaturedProducts";
import { ChevronRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export default function TrendingProducts() {
  const { data: products, isLoading } = useFeaturedProducts(8);

  const formattedProducts = useMemo(() => {
    if (!products) return [];
    return products.map((p) => ({
      id: p.id,
      title: p.name,
      price: `৳${Number(p.price).toLocaleString()}`,
      categoryId: p.categoryId,
      featured: p.featured,
      priceValue: Number(p.price),
      image: p.image || "/api/placeholder/300/300",
      isNew: true, // Mark as new/trending
    }));
  }, [products]);

  if (isLoading) {
    return (
      <section className="relative py-6 md:py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 md:h-8 bg-gradient-to-b from-accent to-primary rounded-full" />
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">
                নতুন ও ট্রেন্ডিং প্রোডাক্ট
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="h-72 md:h-80 bg-card/50 animate-pulse rounded-2xl border border-border/50"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-6 md:py-10 bg-gradient-to-b from-transparent via-accent/5 to-transparent">
      <div className="container mx-auto px-4">
        {/* Section Header with Trending Icon */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-1 h-6 md:h-8 bg-gradient-to-b from-accent to-primary rounded-full" />
            <div className="flex items-center gap-2">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">
                নতুন ও ট্রেন্ডিং প্রোডাক্ট
              </h2>
              <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-accent/10 rounded-full">
                <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-accent" />
                <span className="text-[10px] md:text-xs font-semibold text-accent">TRENDING</span>
              </div>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-primary hover:text-primary/80 gap-1 hover:gap-2 transition-all text-xs md:text-sm font-semibold px-2 md:px-3"
            asChild
          >
            <Link href="/shop">
              View All
              <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {formattedProducts.length > 0 ? (
            formattedProducts.map((product, index) => (
              <div 
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 md:py-12">
              <div className="inline-flex flex-col items-center gap-3">
                <div className="p-4 bg-accent/10 rounded-full">
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
                <p className="text-sm md:text-base text-muted-foreground">
                  কোনো ট্রেন্ডিং প্রোডাক্ট পাওয়া যায়নি
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Optional: Show More Button for mobile */}
        {formattedProducts.length >= 4 && (
          <div className="flex justify-center mt-6 md:hidden">
            <Button 
              variant="outline"
              className="w-full max-w-xs rounded-xl border-2 border-accent/30 hover:border-accent hover:bg-accent/5 text-accent font-semibold"
              asChild
            >
              <Link href="/shop" className="flex items-center justify-center gap-2">
                আরও দেখুন
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}