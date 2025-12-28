"use client";

import { useParams, useRouter } from "next/navigation";
import { allProducts, categories } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowLeft, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { Separator } from "@/components/ui/separator";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const productId = parseInt(params.id as string);
  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-lg font-medium mb-2">প্রোডাক্ট পাওয়া যায়নি</p>
          <Button onClick={() => router.push("/shop")} variant="outline">
            শপে ফিরে যান
          </Button>
        </div>
      </div>
    );
  }

  const category = categories.find((cat) => cat.id === product.categoryId);
  const getInitials = (title: string) => {
    return title
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleBuyNow = () => {
    addToCart(product);
    router.push("/cart");
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        পেছনে যান
      </Button>
       {/* Category Badge */}
       {category && (
            <Badge variant="outline" className="text-sm">
              {category.nameBn}
            </Badge>
          )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="relative w-full aspect-square bg-muted flex items-center justify-center">
            <div className="text-6xl md:text-8xl font-bold text-muted-foreground/30">
                {getInitials(product.title)}
              </div>
              {product.discount && (
                <Badge className="absolute top-4 right-4 bg-red-500 text-white border-0 text-lg px-3 py-1">
                  -{product.discount}%
                </Badge>
              )}
              {product.isNew && !product.discount && (
                <Badge className="absolute top-4 right-4 bg-primary text-white border-0 text-lg px-3 py-1">
                  New
                </Badge>
              )}
            </div>
          </Card>
        </div>

        {/* Product Details */}
        <div className="space-y-4">
         

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-medium">{product.rating}</span>
            <span className="text-muted-foreground">(4.5k+ reviews)</span>
          </div>

          <Separator />

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <p className="text-4xl md:text-4xl font-bold text-primary">
                {product.price}
              </p>
              {product.originalPrice && (
                <p className="text-xl text-muted-foreground line-through">
                  {product.originalPrice}
                </p>
              )}
            </div>
            {product.discount && (
              <p className="text-sm text-muted-foreground">
                আপনি {product.discount}% ছাড় পাচ্ছেন
              </p>
            )}
          </div>

          <Separator />

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">বিবরণ</h2>
            <p className="text-muted-foreground leading-relaxed">
              এই প্রোডাক্টটি একটি উচ্চমানসম্পন্ন ডিজিটাল সমাধান যা আপনার
              প্রোডাক্টিভিটি বৃদ্ধি করবে। সম্পূর্ণ অরিজিনাল এবং গ্যারান্টিযুক্ত।
              দ্রুত ডেলিভারি এবং ২৪/৭ সাপোর্ট পাওয়া যায়।
            </p>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">বৈশিষ্ট্য</h2>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>১০০% অরিজিনাল প্রোডাক্ট</li>
              <li>তাৎক্ষণিক ডেলিভারি</li>
              <li>লাইফটাইম সাপোর্ট</li>
            </ul>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="flex-1 h-12 text-base"
              onClick={handleBuyNow}
            >
              এখনই কিনুন
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 h-12 text-base"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              কার্টে যোগ করুন
            </Button>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm font-semibold mb-1">ডেলিভারি</p>
              <p className="text-sm text-muted-foreground">
                তাৎক্ষণিক (১-২ মিনিট)
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">ওয়ারেন্টি</p>
              <p className="text-sm text-muted-foreground">৩০ দিন</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

