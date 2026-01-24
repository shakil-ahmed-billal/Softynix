"use client";

import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { useAllProducts } from "@/hooks/useAllProducts";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export default function BestSelling() {
  const { data, isLoading } = useAllProducts({
    limit: 4,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const products = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((p) => ({
      id: p.id,
      title: p.name,
      price: `৳${Number(p.price).toLocaleString()}`,
      categoryId: p.categoryId,
      featured: p.featured,
      priceValue: Number(p.price),
      image: p.image || "/api/placeholder/300/300",
    }));
  }, [data]);

  if (isLoading) {
    return (
      <section className="relative py-6 md:py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 md:h-8 bg-gradient-primary rounded-full" />
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">
                সেরা বিক্রিত প্রোডাক্টসমূহ
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
    <section className="relative py-6 md:py-10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-1 h-6 md:h-8 bg-gradient-primary rounded-full" />
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">
              সেরা বিক্রিত প্রোডাক্টসমূহ
            </h2>
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
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-8 md:py-12">
              <p className="text-sm md:text-base text-muted-foreground">
                কোনো প্রোডাক্ট পাওয়া যায়নি
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}