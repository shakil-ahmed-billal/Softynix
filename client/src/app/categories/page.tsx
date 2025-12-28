"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useActiveCategories } from "@/hooks/useCategories";
import { Package } from "lucide-react";
import Link from "next/link";

export default function CategoriesPage() {
  const { data: categories, isLoading } = useActiveCategories();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold mb-8 text-center">
          সব ক্যাটাগরি
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        সব ক্যাটাগরি
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <Link key={category.id} href={`/shop?category=${category.slug}`}>
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-primary h-full">
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                  <div className="bg-muted p-4 rounded-2xl group-hover:bg-muted/80 transition-colors">
                    <Package className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-sm font-medium text-center group-hover:text-primary transition-colors">
                    {category.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {category._count?.products || 0} প্রোডাক্ট
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">
            No categories available
          </p>
        )}
      </div>
    </div>
  );
}

