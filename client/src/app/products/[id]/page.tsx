"use client";

import { useParams, useRouter } from "next/navigation";
import { useSingleProduct } from "@/hooks/useSingleProduct";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const productId = params.id as string;
  const { data: product, isLoading } = useSingleProduct(productId);

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
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-muted w-32 rounded" />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-96 bg-muted rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-6 bg-muted rounded w-1/2" />
              <div className="h-32 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoading && (!product || !formattedProduct)) {
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

  if (!product || !formattedProduct) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        ফিরে যান
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <img
                  src={formattedProduct.image}
                  alt={formattedProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.category && (
                <Badge variant="secondary">{product.category.name}</Badge>
              )}
              {product.featured && (
                <Badge variant="default">Featured</Badge>
              )}
              {product.status === "out_of_stock" && (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-4">{formattedProduct.title}</h1>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-primary">
                {formattedProduct.price}
              </span>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold mb-2">বিবরণ</h2>
            <p className="text-muted-foreground">
              {formattedProduct.description || "No description available"}
            </p>
          </div>

          <Separator />

          {/* Stock Info */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Stock: {product.stock} available
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={product.status === "out_of_stock" || product.stock === 0}
              className="flex-1"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              কার্টে যোগ করুন
            </Button>
            <Button
              size="lg"
              onClick={handleBuyNow}
              disabled={product.status === "out_of_stock" || product.stock === 0}
              className="flex-1"
            >
              এখনই কিনুন
            </Button>
          </div>

          {product.status === "out_of_stock" || product.stock === 0 ? (
            <p className="text-sm text-destructive">
              This product is currently out of stock
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
