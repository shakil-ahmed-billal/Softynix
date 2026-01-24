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
import { Grid3x3, List, Search, Sparkles, TrendingUp, Package, Zap } from "lucide-react";
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
  const categoryIdToSend = useMemo(() => {
    if (selectedCategories.length !== 1) return undefined;
    const catId = selectedCategories[0];
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

  const { data: categories } = useActiveCategories();

  // Track search events
  useEffect(() => {
    if (searchQuery.trim() && searchQuery.length > 2) {
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
  }, [trackViewItemList]);

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

  // Filter by price range and multiple categories
  const filteredProducts = useMemo(() => {
    return formattedProducts.filter((product) => {
      const priceMatch =
        product.priceValue >= priceRange[0] &&
        product.priceValue <= priceRange[1];

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
    setPage(1);
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Enhanced Hero Section - Mobile Optimized */}
      

      {/* Main Shop Content */}
      <div className="container mx-auto px-3 md:px-4 -mt-2">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block sticky top-4 h-fit">
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
          <div className="flex-1 py-3 md:py-4">
            {/* Mobile-First Control Bar */}
            <div className="glass-effect rounded-2xl p-3 md:p-4 mb-4 md:mb-6 border border-border/50 shadow-lg">
              <div className="flex flex-col gap-3">
                {/* Row 1: Mobile Filter + Search */}
                <div className="flex gap-2">
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
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                    <Input
                      type="search"
                      placeholder="প্রোডাক্ট খুঁজুন..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setPage(1);
                      }}
                      className="pl-10 h-10 md:h-11 bg-background/80 border-border/50 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Sort + View Toggle */}
                <div className="flex gap-2">
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
                    <SelectTrigger className="flex-1 h-10 md:h-11 bg-background/80 border-border/50">
                      <SelectValue placeholder="সাজান" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">নতুন প্রোডাক্ট</SelectItem>
                      <SelectItem value="price-low">মূল্য: কম থেকে বেশি</SelectItem>
                      <SelectItem value="price-high">মূল্য: বেশি থেকে কম</SelectItem>
                      <SelectItem value="oldest">পুরাতন প্রোডাক্ট</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Toggle */}
                  <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="icon"
                      onClick={() => setViewMode("grid")}
                      className="h-8 w-8 md:h-9 md:w-9 transition-all"
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="icon"
                      onClick={() => setViewMode("list")}
                      className="h-8 w-8 md:h-9 md:w-9 transition-all"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedCategories.length > 0 || searchQuery) && (
              <div className="flex flex-wrap items-center gap-2 mb-4 px-1">
                <span className="text-xs text-muted-foreground">ফিল্টার:</span>
                {selectedCategories.map((catId) => {
                  const cat = categories?.find(c => c.id === catId);
                  return cat ? (
                    <span key={catId} className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-lg text-xs font-medium">
                      {cat.name}
                      <button onClick={() => handleCategoryChange(catId)} className="hover:bg-primary/20 rounded">×</button>
                    </span>
                  ) : null;
                })}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 bg-accent/10 text-accent px-2 py-1 rounded-lg text-xs font-medium">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery("")} className="hover:bg-accent/20 rounded">×</button>
                  </span>
                )}
                <Button variant="ghost" size="sm" onClick={handleClearFilters} className="h-6 text-xs">
                  সব মুছুন
                </Button>
              </div>
            )}

            {/* Results Count */}
            <div className="mb-4 px-1">
              {isLoading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span>লোড হচ্ছে...</span>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-sm md:text-base font-medium text-foreground">
                    <span className="text-primary font-bold">{data?.pagination?.total || 0}</span> টি প্রোডাক্ট পাওয়া গেছে
                    {filteredProducts.length !== (data?.data?.length || 0) && (
                      <span className="text-muted-foreground ml-2 text-xs md:text-sm">
                        ({filteredProducts.length} মূল্য পরিসরে)
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* Products Grid/List */}
            {isLoading ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 lg:gap-6"
                    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
                }
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="h-64 md:h-80 bg-gradient-card rounded-xl md:rounded-2xl animate-pulse shadow-lg"
                  />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 lg:gap-6 animate-fade-in"
                      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 animate-fade-in"
                  }
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Enhanced Pagination */}
                {data?.pagination && data.pagination.totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mt-8 md:mt-12 px-2">
                    <Button
                      variant="outline"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="w-full sm:w-auto h-10 md:h-11 font-medium border-border/50 hover:border-primary hover:bg-primary/5"
                    >
                      পূর্ববর্তী
                    </Button>
                    <div className="flex items-center gap-2">
                      <span className="text-sm md:text-base text-muted-foreground">
                        পৃষ্ঠা <span className="text-primary font-bold">{data.pagination.page}</span> / {data.pagination.totalPages}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setPage((p) =>
                          Math.min(data.pagination.totalPages, p + 1)
                        )
                      }
                      disabled={page === data.pagination.totalPages}
                      className="w-full sm:w-auto h-10 md:h-11 font-medium border-border/50 hover:border-primary hover:bg-primary/5"
                    >
                      পরবর্তী
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 md:py-20 text-center glass-effect rounded-2xl md:rounded-3xl p-6 md:p-8 border border-border/50 animate-scale-in">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Package className="h-8 w-8 md:h-10 md:w-10 text-muted-foreground" />
                </div>
                <p className="text-lg md:text-xl font-bold mb-2 text-foreground">
                  কোন প্রোডাক্ট পাওয়া যায়নি
                </p>
                <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-md">
                  অনুগ্রহ করে আপনার ফিল্টার পরিবর্তন করুন অথবা অন্য কিছু খুঁজে দেখুন
                </p>
                <Button 
                  onClick={handleClearFilters}
                  className="bg-gradient-primary text-white hover:opacity-90 h-10 md:h-11 px-6 md:px-8 shadow-lg glow-primary"
                >
                  সব ফিল্টার মুছুন
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Products Slider */}
      <div className="bg-gradient-to-br from-muted/30 to-muted/10 py-6 md:py-10 mt-8 md:mt-12">
        <FeaturedProductsSlider />
      </div>

      {/* Recent Orders */}
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 py-6 md:py-10">
        <RecentOrders />
      </div>
    </div>
  );
}



// {/* <div className="relative overflow-hidden bg-gradient-primary">
//         {/* Animated Background Pattern */}
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
//         {/* Floating Shapes */}
//         <div className="absolute top-10 right-10 w-20 h-20 md:w-32 md:h-32 bg-white/10 rounded-full blur-2xl animate-float"></div>
//         <div className="absolute bottom-10 left-10 w-24 h-24 md:w-40 md:h-40 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        
//         <div className="relative container mx-auto px-3 md:px-4 py-6 md:py-12 lg:py-16">
//           <div className="text-center space-y-3 md:space-y-5 animate-fade-in">
//             {/* Badge */}
//             <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 md:px-5 md:py-2 rounded-full text-white text-xs md:text-sm font-semibold shadow-lg glow-primary">
//               <Sparkles className="h-3 w-3 md:h-4 md:w-4 animate-pulse" />
//               <span>প্রিমিয়াম ডিজিটাল স্টোর</span>
//             </div>
            
//             {/* Main Title */}
//             <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight px-2">
//               আমাদের ডিজিটাল
//               <span className="block md:inline text-accent-foreground animate-pulse-glow"> প্রোডাক্ট স্টোর</span>
//             </h1>
            
//             {/* Description */}
//             <p className="text-sm md:text-lg text-white/90 max-w-2xl mx-auto px-4 leading-relaxed">
//               প্রিমিয়াম ডিজিটাল প্রোডাক্ট, সফটওয়্যার লাইসেন্স এবং সাবস্ক্রিপশন।
//               <span className="block mt-1">সব প্রোডাক্ট অরিজিনাল এবং ব্যবহারের জন্য প্রস্তুত।</span>
//             </p>

//             {/* Stats */}
//             <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 pt-2">
//               <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 md:px-4 py-2 md:py-2.5 rounded-xl text-white text-xs md:text-sm font-medium">
//                 <Package className="h-4 w-4 md:h-5 md:w-5" />
//                 <span>{data?.pagination?.total || 0}+ প্রোডাক্ট</span>
//               </div>
//               <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 md:px-4 py-2 md:py-2.5 rounded-xl text-white text-xs md:text-sm font-medium">
//                 <TrendingUp className="h-4 w-4 md:h-5 md:w-5" />
//                 <span>সর্বোচ্চ রেটিং</span>
//               </div>
//               <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 md:px-4 py-2 md:py-2.5 rounded-xl text-white text-xs md:text-sm font-medium">
//                 <Zap className="h-4 w-4 md:h-5 md:w-5" />
//                 <span>দ্রুত ডেলিভারি</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Wave */}
//         <div className="absolute bottom-0 left-0 right-0 h-6 md:h-8 bg-gradient-to-t from-background to-transparent"></div>
//       </div> */}