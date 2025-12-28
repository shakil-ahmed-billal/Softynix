import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { allProducts } from "@/lib/dummy-data";
import { ArrowRight } from "lucide-react";

// Best selling products IDs: 1, 2, 3, 4
const bestSellingIds = [1, 2, 3, 4];
const bestSellingProducts = allProducts.filter((p) =>
  bestSellingIds.includes(p.id)
);

export default function BestSelling() {
  return (
    <section className="relative">
      <div className="container mx-auto px-4 py-12 ">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold">সেরা বিক্রিত প্রোডাক্টসমূহ</h2>
          <Button variant="ghost" className="gap-2">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {bestSellingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
