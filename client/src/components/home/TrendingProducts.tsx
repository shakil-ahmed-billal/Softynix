"use client";

import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { useFeaturedProducts } from "@/hooks/useFeaturedProducts";
import { ArrowRight } from "lucide-react";
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
    }));
  }, [products]);

  if (isLoading) {
    return (
      <section className="">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-semibold">নতুন ও ট্রেন্ডিং প্রোডাক্ট</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="">
      <div className="container mx-auto px-4 py-12 ">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold">নতুন ও ট্রেন্ডিং প্রোডাক্ট</h2>
          <Button variant="ghost" className="gap-2" asChild>
            <Link href="/shop">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {formattedProducts.length > 0 ? (
            formattedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">
              No featured products available
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
