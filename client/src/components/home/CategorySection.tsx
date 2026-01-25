"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useActiveCategories } from "@/hooks/useCategories";
import Link from "next/link";
import { Package } from "lucide-react";

// Gradient color combinations for icons
const gradientColors = [
  "from-purple-500 to-purple-600",
  "from-blue-500 to-blue-600",
  "from-orange-500 to-orange-600",
  "from-pink-500 to-pink-600",
  "from-teal-500 to-teal-600",
  "from-indigo-500 to-indigo-600",
];

export default function CategorySection() {
  const { data: categories, isLoading } = useActiveCategories();

  if (isLoading) {
    return (
      <section className="relative py-6 md:py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-4 md:mb-6">
            জনপ্রিয় ক্যাটাগরি
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i} 
                className="h-32 md:h-36 bg-card/50 animate-pulse rounded-2xl border border-border/50"
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
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-4 md:mb-6">
          জনপ্রিয় ক্যাটাগরি
        </h2>
        
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {categories && categories.length > 0 ? (
            categories.map((category, index) => {
              const gradientColor = gradientColors[index % gradientColors.length];
              
              return (
                <Link 
                  key={category.id} 
                  href={`/categories?category=${category.slug}`}
                  className="block"
                >
                  <Card className="h-full bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer group hover:scale-105 rounded-2xl">
                    <CardContent className="flex flex-col items-center justify-center p-4 md:p-5 space-y-2.5 md:space-y-3">
                      {/* Icon with Gradient Background */}
                      <div className={`bg-gradient-to-br ${gradientColor} p-3 md:p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                        <Package className="h-6 w-6 md:h-7 md:w-7 text-white" strokeWidth={2.5} />
                      </div>

                      {/* Category Name */}
                      <div className="text-center w-full">
                        <p className="text-xs md:text-sm font-semibold text-foreground line-clamp-1 leading-tight">
                          {category.name}
                        </p>
                        <p className="text-[10px] md:text-xs text-muted-foreground mt-1">
                          {category._count?.products || 0} প্রোডাক্ট
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full text-center py-8 md:py-12">
              <div className="inline-flex flex-col items-center gap-3">
                <div className="p-4 bg-muted/50 rounded-full">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-sm md:text-base text-muted-foreground">
                  কোনো ক্যাটাগরি পাওয়া যায়নি
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}