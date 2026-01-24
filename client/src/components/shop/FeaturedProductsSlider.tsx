"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from "@/components/shared/ProductCard";
import { Badge } from "@/components/ui/badge";
import { useFeaturedProducts } from "@/hooks/useFeaturedProducts";
import { Sparkles, Star, TrendingUp, Flame } from "lucide-react";
import { useMemo } from "react";

export function FeaturedProductsSlider() {
  const { data: products, isLoading } = useFeaturedProducts(12);

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
    }));
  }, [products]);

  if (isLoading) {
    return (
      <section className="relative py-6 md:py-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-5 md:mb-7">
            <div className="h-8 md:h-10 bg-muted/50 rounded-lg w-48 md:w-64 animate-pulse mb-2" />
            <div className="h-4 md:h-5 bg-muted/50 rounded-lg w-64 md:w-80 animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-72 md:h-80 bg-card/50 animate-pulse rounded-2xl border border-border/50" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!formattedProducts || formattedProducts.length === 0) {
    return null;
  }

  return (
    <section className="relative py-6 md:py-10 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="mb-5 md:mb-7 animate-fade-in">
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className="flex-1">
              {/* Badge & Title */}
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <div className="w-1 h-6 md:h-8 bg-gradient-to-b from-primary via-accent to-primary rounded-full animate-pulse" />
                <Badge 
                  variant="outline" 
                  className="px-2.5 md:px-3 py-1 border-primary/30 bg-primary/10 text-primary font-semibold text-[10px] md:text-xs rounded-full inline-flex items-center gap-1.5"
                >
                  <Flame className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  HOT DEALS
                </Badge>
              </div>
              
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1.5 md:mb-2 flex items-center gap-2 md:gap-3">
                <span>ফিচার্ড প্রোডাক্ট</span>
                <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-full">
                  <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-xs md:text-sm font-semibold text-yellow-600 dark:text-yellow-400">FEATURED</span>
                </div>
              </h2>
              
              <p className="text-xs md:text-sm lg:text-base text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                বিশেষ অফার এবং জনপ্রিয় প্রোডাক্টসমূহ
              </p>
            </div>

            {/* Product Counter */}
            <div className="hidden md:flex flex-col items-end">
              <div className="px-4 py-2 bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl">
                <div className="text-2xl font-bold text-primary">{formattedProducts.length}</div>
                <div className="text-xs text-muted-foreground">প্রোডাক্ট</div>
              </div>
            </div>
          </div>

          {/* Decorative Line */}
          <div className="flex items-center gap-2 mt-3 md:mt-4">
            <div className="h-1 flex-1 bg-gradient-to-r from-primary via-accent to-transparent rounded-full" />
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary animate-pulse" />
            <div className="h-1 flex-1 bg-gradient-to-l from-primary via-accent to-transparent rounded-full" />
          </div>
        </div>

        {/* Carousel */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-3 lg:-ml-4">
              {formattedProducts.map((product, index) => (
                <CarouselItem 
                  key={product.id} 
                  className="pl-2 md:pl-3 lg:pl-4 basis-1/3 xs:basis-1/3 sm:basis-1/3 lg:basis-1/3 xl:basis-1/4 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation Buttons - Enhanced Design */}
            <CarouselPrevious className="hidden lg:flex -left-4 xl:-left-12 h-12 w-12 border-2 border-primary/30 bg-card/90 backdrop-blur-sm hover:bg-primary hover:border-primary shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-110" />
            <CarouselNext className="hidden lg:flex -right-4 xl:-right-12 h-12 w-12 border-2 border-primary/30 bg-card/90 backdrop-blur-sm hover:bg-primary hover:border-primary shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-110" />
          </Carousel>
        </div>

        {/* Bottom Info Bar - Mobile Only */}
        <div className="mt-4 md:hidden flex items-center justify-between px-3 py-2.5 bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            </div>
            <span className="text-xs font-semibold text-foreground">{formattedProducts.length} প্রোডাক্ট</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            সোয়াইপ করুন
          </div>
        </div>

        {/* Navigation Dots - Mobile Only */}
        <div className="flex lg:hidden justify-center gap-1.5 mt-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {Array.from({ length: Math.min(5, Math.ceil(formattedProducts.length / 2)) }).map((_, i) => (
            <div 
              key={i} 
              className="h-1.5 rounded-full bg-primary/30 hover:bg-primary transition-all duration-300"
              style={{ width: i === 0 ? '24px' : '8px' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}