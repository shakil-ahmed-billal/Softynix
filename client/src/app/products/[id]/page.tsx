"use client";

import { StructuredData } from "@/components/seo/StructuredData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/cart-context";
import { useFacebookPixel } from "@/hooks/useFacebookPixel";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";
import { useReviewsByProductId } from "@/hooks/useReviews";
import { useSingleProduct } from "@/hooks/useSingleProduct";
import { generateBreadcrumbSchema, generateProductSchema } from "@/lib/seo";
import { ArrowLeft, Loader2, ShoppingCart, Star, Package, MessageSquare, Award, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { trackViewContent } = useFacebookPixel();
  const { trackViewItem } = useGoogleAnalytics();
  const productId = params.id as string;
  const { data: product, isLoading, error: productError } = useSingleProduct(productId);
  const { data: reviews = [], isLoading: reviewsLoading, error: reviewsError } = useReviewsByProductId(productId);

  const formattedProduct = useMemo(() => {
    if (!product) return null;
    return {
      id: product.id,
      title: product.name,
      price: `৳${Number(product.price).toLocaleString()}`,
      priceValue: Number(product.price),
      categoryId: product.categoryId,
      image: product.image || "/api/placeholder/300/300",
      description: product.description || "",
      category: product.category,
    };
  }, [product]);

  useEffect(() => {
    if (formattedProduct) {
      trackViewContent({
        content_name: formattedProduct.title,
        content_ids: [String(formattedProduct.id)],
        content_type: "product",
        value: formattedProduct.priceValue,
        currency: "BDT",
      });

      trackViewItem({
        currency: "BDT",
        value: formattedProduct.priceValue,
        items: [
          {
            item_id: String(formattedProduct.id),
            item_name: formattedProduct.title,
            item_category: formattedProduct.category?.name,
            price: formattedProduct.priceValue,
          },
        ],
      });
    }
  }, [formattedProduct, trackViewContent, trackViewItem]);

  const handleBuyNow = () => {
    if (!formattedProduct) return;
    addToCart(formattedProduct);
    toast.success("Product added to cart");
    router.push("/cart");
  };

  const handleAddToCart = () => {
    if (!formattedProduct) return;
    addToCart(formattedProduct);
    toast.success("Product added to cart");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          {/* Mobile Header Skeleton */}
          <div className="lg:hidden sticky top-0 z-50 bg-background border-b border-border/50 px-4 py-3">
            <div className="h-6 bg-muted w-20 rounded" />
          </div>
          
          {/* Desktop Header Skeleton */}
          <div className="hidden lg:block container mx-auto px-6 py-6">
            <div className="h-8 bg-muted w-32 rounded" />
          </div>
          
          {/* Mobile: Image Skeleton */}
          <div className="lg:hidden aspect-square bg-muted" />
          
          {/* Desktop: Grid Layout Skeleton */}
          <div className="hidden lg:block container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="aspect-square bg-muted rounded-2xl" />
              <div className="space-y-6">
                <div className="h-10 bg-muted w-3/4 rounded" />
                <div className="h-12 bg-muted w-40 rounded" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted w-5/6 rounded" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Content Skeleton */}
          <div className="lg:hidden p-4 space-y-4">
            <div className="flex gap-2">
              <div className="h-6 bg-muted w-20 rounded-full" />
              <div className="h-6 bg-muted w-16 rounded-full" />
            </div>
            <div className="h-8 bg-muted w-3/4 rounded" />
            <div className="h-10 bg-muted w-32 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (productError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="border-destructive/50 bg-destructive/5 max-w-md w-full">
          <CardContent className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
              <Package className="w-8 h-8 sm:w-10 sm:h-10 text-destructive" />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold text-destructive mb-2">
                Error loading product
              </p>
              <p className="text-sm text-muted-foreground">
                Please try again later
              </p>
            </div>
            <Button onClick={() => router.push("/shop")} variant="outline" className="w-full" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              শপে ফিরে যান
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isLoading && (!product || !formattedProduct)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-muted flex items-center justify-center">
              <Package className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
            </div>
            <p className="text-base sm:text-lg font-semibold">প্রোডাক্ট পাওয়া যায়নি</p>
            <Button onClick={() => router.push("/shop")} variant="outline" className="w-full" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              শপে ফিরে যান
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!product || !formattedProduct) {
    return null;
  }

  const productSchema = generateProductSchema({
    name: product.name,
    description: product.description || `${product.name} - Available at Softynix`,
    price: Number(product.price),
    image: product.image || undefined,
    category: product.category?.name,
    availability: product.stock > 0 ? "InStock" : "OutOfStock",
    sku: product.id,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
    { name: product.category?.name || "Products", url: `/shop?category=${product.categoryId}` },
    { name: product.name, url: `/products/${product.id}` },
  ]);

  const structuredData = [productSchema, breadcrumbSchema];

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <>
      <StructuredData data={structuredData} />
      
      <div className="min-h-screen bg-background pb-12 lg:pb-8">
        
        {/* MOBILE: Sticky Header */}
        <div className="lg:hidden sticky top-14 z-10 bg-background/95 backdrop-blur-xl border-b border-primary/10 shadow-sm">
          <div className="container mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="h-9 px-3 hover:bg-primary/5"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">ফিরে যান</span>
            </Button>
          </div>
        </div>

        {/* DESKTOP: Normal Header */}
        <div className="hidden lg:block container mx-auto px-6 xl:px-8 py-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 hover:bg-primary/5"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="text-base font-medium">ফিরে যান</span>
          </Button>
        </div>

        {/* MOBILE: Full-Width Image */}
        <div className="lg:hidden relative bg-gradient-to-b from-muted/30 to-background">
          {product?.course?.videoUrl ? (
            <div className="aspect-video relative overflow-hidden">
              <iframe
                src={product.course.videoUrl}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={formattedProduct.image}
                alt={formattedProduct.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* DESKTOP & MOBILE: Content Container */}
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          
          {/* DESKTOP: Two-Column Grid */}
          <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-5 gap-8 xl:gap-10 mb-10">
            
            {/* Left: Image - Desktop */}
            <div className="xl:col-span-2">
              <div className="sticky top-24">
                {product?.course?.videoUrl ? (
                  <Card className="border-primary/20 shadow-xl overflow-hidden">
                    <CardContent className="p-0">
                      <div className="aspect-video relative overflow-hidden rounded-lg">
                        <iframe
                          src={product.course.videoUrl}
                          className="w-full h-full"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-primary/20 shadow-xl overflow-hidden">
                    <CardContent className="p-0">
                      <div className="aspect-square relative overflow-hidden rounded-lg">
                        <Image
                          src={formattedProduct.image}
                          alt={formattedProduct.title}
                          fill
                          priority
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Right: Product Details - Desktop */}
            <div className="xl:col-span-3 space-y-6">
              <Card className="border-primary/20 shadow-lg">
                <CardContent className="p-6 xl:p-8 space-y-6">
                  
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    {product.category && (
                      <Badge variant="secondary" className="text-sm px-3 py-1.5">
                        {product.category.name}
                      </Badge>
                    )}
                    {product.featured && (
                      <Badge className="bg-gradient-primary text-primary-foreground text-sm px-3 py-1.5">
                        <Award className="w-3.5 h-3.5 mr-1" />
                        Featured
                      </Badge>
                    )}
                    {product.status === "out_of_stock" && (
                      <Badge variant="destructive" className="text-sm px-3 py-1.5">
                        Out of Stock
                      </Badge>
                    )}
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl xl:text-4xl font-bold text-foreground leading-tight">
                    {formattedProduct.title}
                  </h1>

                  {/* Price & Rating */}
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl xl:text-5xl font-bold text-gradient-primary">
                        {formattedProduct.price}
                      </span>
                    </div>
                    
                    {reviews.length > 0 && (
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-400/10 border border-yellow-400/20">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-lg font-bold text-foreground">{averageRating}</span>
                        <span className="text-sm text-muted-foreground">({reviews.length} reviews)</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Description */}
                  <div className="space-y-3">
                    <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <div className="w-1 h-6 bg-gradient-primary rounded-full" />
                      বিবরণ
                    </h2>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {formattedProduct.description || "No description available"}
                    </p>
                  </div>

                  <Separator />

                  {/* Stock Info */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md">
                        <Package className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Stock Available</p>
                        <p className="text-lg font-bold text-foreground">{product.stock} units</p>
                      </div>
                    </div>
                    {product.stock > 0 && product.stock <= 10 && (
                      <Badge variant="outline" className="border-yellow-400/50 text-yellow-600 dark:text-yellow-400">
                        <TrendingUp className="w-3.5 h-3.5 mr-1" />
                        Low Stock
                      </Badge>
                    )}
                  </div>

                  {/* Desktop Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={handleAddToCart}
                      disabled={product.status === "out_of_stock" || product.stock === 0}
                      className="flex-1 h-14 text-base border-primary/30 hover:bg-primary/5 hover:border-primary"
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      কার্টে যোগ করুন
                    </Button>
                    <Button
                      size="lg"
                      onClick={handleBuyNow}
                      disabled={product.status === "out_of_stock" || product.stock === 0}
                      className="flex-1 h-14 bg-gradient-primary hover:opacity-90 shadow-lg text-base font-bold"
                    >
                      এখনই কিনুন
                    </Button>
                  </div>
                  
                  {product.status === "out_of_stock" || product.stock === 0 ? (
                    <p className="text-sm text-destructive text-center">
                      This product is currently out of stock
                    </p>
                  ) : null}

                </CardContent>
              </Card>
            </div>
          </div>

          {/* MOBILE: Product Info Card */}
          <div className="lg:hidden -mt-6 sm:-mt-8 relative z-10">
            <Card className="border-primary/20 shadow-xl">
              <CardContent className="p-4 sm:p-5 space-y-4 sm:space-y-5">
                
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  {product.category && (
                    <Badge variant="secondary" className="text-xs px-2.5 py-1">
                      {product.category.name}
                    </Badge>
                  )}
                  {product.featured && (
                    <Badge className="bg-gradient-primary text-primary-foreground text-xs px-2.5 py-1">
                      <Award className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  {product.status === "out_of_stock" && (
                    <Badge variant="destructive" className="text-xs px-2.5 py-1">
                      Out of Stock
                    </Badge>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                  {formattedProduct.title}
                </h1>

                {/* Price & Rating */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-bold text-gradient-primary">
                    {formattedProduct.price}
                  </span>
                  
                  {reviews.length > 0 && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-foreground">{averageRating}</span>
                      <span className="text-xs text-muted-foreground">({reviews.length})</span>
                    </div>
                  )}
                </div>

                <Separator className="bg-border/50" />

                {/* Description */}
                <div className="space-y-2">
                  <h2 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
                    <div className="w-1 h-5 bg-gradient-primary rounded-full" />
                    বিবরণ
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {formattedProduct.description || "No description available"}
                  </p>
                </div>

                <Separator className="bg-border/50" />

                {/* Stock Info */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Package className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Stock Available</p>
                      <p className="text-sm font-semibold text-foreground">{product.stock} units</p>
                    </div>
                  </div>
                  {product.stock > 0 && product.stock <= 10 && (
                    <Badge variant="outline" className="border-yellow-400/50 text-yellow-600 dark:text-yellow-400 text-xs">
                      Low Stock
                    </Badge>
                  )}
                </div>

              </CardContent>
            </Card>
          </div>

          {/* REVIEWS SECTION - Both Mobile & Desktop */}
          <div className="mt-6 sm:mt-8 lg:mt-10">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground flex items-center gap-2">
                <div className="w-1 h-6 lg:h-7 bg-gradient-primary rounded-full" />
                গ্রাহকদের মতামত
              </h2>
              {reviews.length > 0 && (
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-card border border-border/50">
                  <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  <span className="text-xs sm:text-sm font-semibold">{reviews.length}</span>
                </div>
              )}
            </div>

            {reviewsLoading ? (
              <div className="flex items-center justify-center py-12 lg:py-16">
                <div className="text-center space-y-3">
                  <Loader2 className="h-8 w-8 lg:h-10 lg:w-10 animate-spin text-primary mx-auto" />
                  <p className="text-sm text-muted-foreground">Loading reviews...</p>
                </div>
              </div>
            ) : reviewsError ? (
              <Card className="border-destructive/30 bg-destructive/5">
                <CardContent className="p-6 lg:p-8 text-center">
                  <p className="text-sm lg:text-base text-muted-foreground">
                    Unable to load reviews. Please try again later.
                  </p>
                </CardContent>
              </Card>
            ) : reviews && reviews.length > 0 ? (
              <div className="grid gap-3 sm:gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {reviews.map((review: any) => (
                  <Card key={review.id} className="border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-start gap-3">
                        <Avatar className="ring-2 ring-primary/10 flex-shrink-0 w-10 h-10">
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground text-sm font-semibold">
                            {review.user?.name
                              ? review.user.name
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")
                                  .slice(0, 2)
                                  .toUpperCase()
                              : "U"}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm text-foreground truncate">
                                {review.user?.name || "Anonymous"}
                              </p>
                              <p className="text-[11px] text-muted-foreground">
                                {new Date(review.createdAt).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-0.5 flex-shrink-0">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3.5 w-3.5 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-muted-foreground/30"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          
                          {review.comment && (
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              {review.comment}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed border-2">
                <CardContent className="p-8 sm:p-12 lg:p-16 text-center">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto rounded-full bg-muted/50 flex items-center justify-center mb-4">
                    <MessageSquare className="w-8 h-8 lg:w-10 lg:h-10 text-muted-foreground" />
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg text-muted-foreground font-medium mb-2">
                    No reviews yet
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Be the first to review this product!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

        </div>

        {/* MOBILE: Fixed Bottom Action Bar */}
        <div className="lg:hidden fixed bottom-20 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-primary/10 shadow-[0_-8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_-8px_32px_rgba(0,0,0,0.4)] pb-safe">
          <div className="container mx-auto px-3 py-3">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <Button
                size="lg"
                variant="outline"
                onClick={handleAddToCart}
                disabled={product.status === "out_of_stock" || product.stock === 0}
                className="h-12 sm:h-13 border-primary/30 hover:bg-primary/5 hover:border-primary"
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                <span className="text-sm sm:text-base font-semibold">কার্টে যোগ করুন</span>
              </Button>
              <Button
                size="lg"
                onClick={handleBuyNow}
                disabled={product.status === "out_of_stock" || product.stock === 0}
                className="h-12 sm:h-13 bg-gradient-primary hover:opacity-90 shadow-lg"
              >
                <span className="text-sm sm:text-base font-bold">এখনই কিনুন</span>
              </Button>
            </div>
            
            {product.status === "out_of_stock" || product.stock === 0 ? (
              <p className="text-xs sm:text-sm text-destructive text-center mt-2">
                This product is currently out of stock
              </p>
            ) : null}
          </div>
        </div>

      </div>
    </>
  );
}