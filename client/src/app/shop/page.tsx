"use client";

import RecentOrders from "@/components/home/RecentOrders";
import ProductCard from "@/components/shared/ProductCard";
import { FeaturedProductsSlider } from "@/components/shop/FeaturedProductsSlider";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllProducts } from "@/hooks/useAllProducts";
import { useActiveCategories } from "@/hooks/useCategories";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";
import { Grid3x3, List, Search } from "lucide-react";
import { useMemo, useState, useEffect } from "react";

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const limit = 20;
  const { trackSearch, trackViewItemList } = useGoogleAnalytics();

  // Fetch products from API
  // Only send categoryId if it's a valid UUID and exactly one category is selected
  const categoryIdToSend = useMemo(() => {
    if (selectedCategories.length !== 1) return undefined;
    const catId = selectedCategories[0];
    // Validate UUID format before sending
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(catId) ? catId : undefined;
  }, [selectedCategories]);

  const { data, isLoading } = useAllProducts({
    page,
    limit,
    sortBy,
    sortOrder,
    search: searchQuery || undefined,
    categoryId: categoryIdToSend,
    status: "active",
  });

  // Fetch categories for filter
  const { data: categories } = useActiveCategories();

  // Track search events
  useEffect(() => {
    if (searchQuery.trim() && searchQuery.length > 2) {
      // Debounce search tracking
      const timer = setTimeout(() => {
        trackSearch({ search_term: searchQuery });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [searchQuery, trackSearch]);

  // Track view_item_list when products are loaded
  useEffect(() => {
    if (formattedProducts.length > 0) {
      trackViewItemList({
        item_list_name: "Shop",
        items: formattedProducts.slice(0, 20).map((product) => ({
          item_id: String(product.id),
          item_name: product.title,
          item_category: product.categoryId ? String(product.categoryId) : undefined,
          price: product.priceValue,
        })),
      });
    }
  }, [ trackViewItemList]);

  // Format products for ProductCard component
  const formattedProducts = useMemo(() => {
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

  // Filter by price range and multiple categories (client-side since API doesn't support it)
  const filteredProducts = useMemo(() => {
    return formattedProducts.filter((product) => {
      // Price range filter
      const priceMatch =
        product.priceValue >= priceRange[0] &&
        product.priceValue <= priceRange[1];

      // Category filter - if multiple categories selected, show products from any of them
      // If single category selected, API already filtered it, so show all
      // If no categories selected, show all
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.length === 1 ||
        selectedCategories.includes(product.categoryId);

      return priceMatch && categoryMatch;
    });
  }, [formattedProducts, priceRange, selectedCategories]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
    setPage(1); // Reset to first page
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 100000]);
    setSearchQuery("");
    setSortBy("createdAt");
    setSortOrder("desc");
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    switch (value) {
      case "price-low":
        setSortBy("price");
        setSortOrder("asc");
        break;
      case "price-high":
        setSortBy("price");
        setSortOrder("desc");
        break;
      case "newest":
        setSortBy("createdAt");
        setSortOrder("desc");
        break;
      case "oldest":
        setSortBy("createdAt");
        setSortOrder("asc");
        break;
      default:
        setSortBy("createdAt");
        setSortOrder("desc");
    }
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Presentation/Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Our Digital Products Store
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover premium digital products, software licenses,
              subscriptions, and more. All products are authentic and ready to
              use.
            </p>
          </div>
        </div>
      </div>

      {/* Main Shop Content */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block">
            <FilterSidebar
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              onClearFilters={handleClearFilters}
              categories={categories || []}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 py-4">
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
                  categories={categories || []}
                />
              </div>

              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="প্রোডাক্ট খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  className="pl-10"
                />
              </div>

              {/* Sort Dropdown */}
              <Select
                value={
                  sortBy === "price" && sortOrder === "asc"
                    ? "price-low"
                    : sortBy === "price" && sortOrder === "desc"
                    ? "price-high"
                    : sortBy === "createdAt" && sortOrder === "desc"
                    ? "newest"
                    : "oldest"
                }
                onValueChange={handleSortChange}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="সাজান" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">নতুন প্রোডাক্ট</SelectItem>
                  <SelectItem value="price-low">মূল্য: কম থেকে বেশি</SelectItem>
                  <SelectItem value="price-high">
                    মূল্য: বেশি থেকে কম
                  </SelectItem>
                  <SelectItem value="oldest">পুরাতন প্রোডাক্ট</SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex gap-2 border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="h-7 w-7"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="h-7 w-7"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-4 text-sm text-muted-foreground">
              {isLoading ? (
                "লোড হচ্ছে..."
              ) : (
                <>
                  {data?.pagination?.total || 0} টি প্রোডাক্ট পাওয়া গেছে
                  {filteredProducts.length !== (data?.data?.length || 0) && (
                    <span className="ml-2">
                      ({filteredProducts.length} মূল্য পরিসরে)
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Products Grid/List */}
            {isLoading ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6"
                    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6"
                }
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="h-64 bg-muted animate-pulse rounded-lg"
                  />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
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

                {/* Pagination */}
                {data?.pagination && data.pagination.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Page {data.pagination.page} of{" "}
                      {data.pagination.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setPage((p) =>
                          Math.min(data.pagination.totalPages, p + 1)
                        )
                      }
                      disabled={page === data.pagination.totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
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
