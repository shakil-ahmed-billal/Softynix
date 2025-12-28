"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from "@/components/shared/ProductCard";
import { featuredProducts } from "@/lib/dummy-data";

export function FeaturedProductsSlider() {
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
          {featuredProducts.map((product) => (
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

