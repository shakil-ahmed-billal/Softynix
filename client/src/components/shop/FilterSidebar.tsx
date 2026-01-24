"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: {
    products: number;
  };
}

interface FilterSidebarProps {
  selectedCategories: string[];
  onCategoryChange: (categoryId: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  onClearFilters: () => void;
  isMobile?: boolean;
  categories?: Category[];
}

export function FilterSidebar({
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  onClearFilters,
  isMobile = false,
  categories = [],
}: FilterSidebarProps) {
  const [minPrice, setMinPrice] = useState(priceRange[0].toString());
  const [maxPrice, setMaxPrice] = useState(priceRange[1].toString());

  const handlePriceChange = () => {
    const min = parseInt(minPrice) || 0;
    const max = parseInt(maxPrice) || 10000;
    onPriceRangeChange([min, max]);
  };

  const filterContent = (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mt-4">
        <h3 className="text-lg font-semibold">ফিল্টার</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-xs"
        >
          সব মুছুন
        </Button>
      </div>

      <Separator />

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">ক্যাটাগরি</h4>
        <div className="space-y-2">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => onCategoryChange(category.id)}
                />
                <Label
                  htmlFor={`category-${category.id}`}
                  className="text-sm font-normal cursor-pointer flex-1 flex items-center justify-between"
                >
                  <span>{category.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({category._count?.products || 0})
                  </span>
                </Label>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No categories available</p>
          )}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">মূল্য পরিসীমা</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="সর্বনিম্ন"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              onBlur={handlePriceChange}
              className="h-9"
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              placeholder="সর্বোচ্চ"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              onBlur={handlePriceChange}
              className="h-9"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePriceChange}
            className="w-full"
          >
            প্রয়োগ করুন
          </Button>
        </div>
      </div>

      <Separator />

      {/* Rating Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">রেটিং</h4>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={`rating-${rating}`} />
              <Label
                htmlFor={`rating-${rating}`}
                className="text-sm font-normal cursor-pointer flex items-center gap-1"
              >
                <span>{rating}+</span>
                <span className="text-yellow-500">★</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Discount Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">অফার</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="discount" />
            <Label
              htmlFor="discount"
              className="text-sm font-normal cursor-pointer"
            >
              ছাড় আছে
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="new" />
            <Label htmlFor="new" className="text-sm font-normal cursor-pointer">
              নতুন প্রোডাক্ট
            </Label>
          </div>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden">
            <Filter className="h-4 w-4 mr-2" />
            ফিল্টার
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
          {filterContent}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="w-64 shrink-0 border-r bg-background px-4 space-y-6 overflow-y-auto h-[calc(100vh-4rem)] sticky top-16">
      {filterContent}
    </aside>
  );
}
