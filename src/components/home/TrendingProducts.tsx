import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { trendingProducts } from "@/lib/dummy-data";
import { ArrowRight } from "lucide-react";

export default function TrendingProducts() {
  return (
    <section className="">
      <div className="container mx-auto px-4 py-12 ">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold">নতুন ও ট্রেন্ডিং প্রোডাক্ট</h2>
          <Button variant="ghost" className="gap-2">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
