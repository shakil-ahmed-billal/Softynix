"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from "@/components/shared/ProductCard";
import { useFeaturedProducts } from "@/hooks/useFeaturedProducts";
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
      <section className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">ফিচার্ড প্রোডাক্ট</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </section>
    );
  }

  if (!formattedProducts || formattedProducts.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">ফিচার্ড প্রোডাক্ট</h2>
        <p className="text-muted-foreground text-sm md:text-base">
          বিশেষ অফার এবং জনপ্রিয় প্রোডাক্টসমূহ
        </p>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {formattedProducts.map((product) => (
            <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-12" />
        <CarouselNext className="hidden md:flex -right-12" />
      </Carousel>
    </section>
  );
}

