"use client";

import { useState, useMemo } from "react";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { FeaturedProductsSlider } from "@/components/shop/FeaturedProductsSlider";
import ProductCard from "@/components/shared/ProductCard";
import { allProducts, Product } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Grid3x3, List, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RecentOrders from "@/components/home/RecentOrders";

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered: Product[] = [...allProducts];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.categoryId)
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product) =>
        product.priceValue >= priceRange[0] &&
        product.priceValue <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.priceValue - b.priceValue);
        break;
      case "price-high":
        filtered.sort((a, b) => b.priceValue - a.priceValue);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategories, priceRange, searchQuery, sortBy]);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 10000]);
    setSearchQuery("");
    setSortBy("default");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Shop Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block">
            <FilterSidebar
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar - Search, Sort, View Toggle */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Mobile Filter Button */}
              <div className="lg:hidden">
                <FilterSidebar
                  selectedCategories={selectedCategories}
                  onCategoryChange={handleCategoryChange}
                  priceRange={priceRange}
                  onPriceRangeChange={setPriceRange}
                  onClearFilters={handleClearFilters}
                  isMobile={true}
                />
              </div>

              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="প্রোডাক্ট খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="সাজান" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">ডিফল্ট</SelectItem>
                  <SelectItem value="price-low">মূল্য: কম থেকে বেশি</SelectItem>
                  <SelectItem value="price-high">মূল্য: বেশি থেকে কম</SelectItem>
                  <SelectItem value="rating">সর্বোচ্চ রেটিং</SelectItem>
                  <SelectItem value="newest">নতুন প্রোডাক্ট</SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex gap-2 border rounded-md p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="h-9 w-9"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="h-9 w-9"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-4 text-sm text-muted-foreground">
              {filteredProducts.length} টি প্রোডাক্ট পাওয়া গেছে
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6"
                    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-lg font-medium mb-2">
                  কোন প্রোডাক্ট পাওয়া যায়নি
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  অনুগ্রহ করে আপনার ফিল্টার পরিবর্তন করুন
                </p>
                <Button variant="outline" onClick={handleClearFilters}>
                  সব ফিল্টার মুছুন
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Featured Products Slider */}
      <div className="bg-muted/30 py-8">
        <FeaturedProductsSlider />
      </div>
      <div className="bg-muted/30 py-8">
        <RecentOrders />
      </div>
    </div>
  );
}

