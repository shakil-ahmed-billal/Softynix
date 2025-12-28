"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cart-context";
import { Product } from "@/types/product";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  // Generate initials from product title
  const getInitials = (title: string) => {
    return title
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success("Product added to cart");
  };

  return (
    <Card
      className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <div className="relative w-full aspect-square bg-muted flex items-center justify-center overflow-hidden">
          <div className="relative z-10 text-2xl md:text-4xl font-bold text-muted-foreground/30">
            {getInitials(product.title)}
          </div>
        </div>
        {product.discount && (
          <Badge className="absolute top-1 right-1 md:top-2 md:right-2 bg-red-500 text-white border-0 z-20 text-[10px] md:text-xs px-1 md:px-2 py-0.5 md:py-1">
            -{product.discount}%
          </Badge>
        )}
        {product.isNew && !product.discount && (
          <Badge className="absolute top-1 right-1 md:top-2 md:right-2 bg-primary text-white border-0 z-20 text-[10px] md:text-xs px-1 md:px-2 py-0.5 md:py-1">
            New
          </Badge>
        )}
        <div className="absolute bottom-1 left-1 md:bottom-2 md:left-2 flex items-center gap-0.5 md:gap-1 bg-black/60 backdrop-blur-sm px-1 md:px-2 py-0.5 md:py-1 rounded z-20">
          <Star className="h-2.5 w-2.5 md:h-3 md:w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-[10px] md:text-xs text-white font-medium">{product.rating}</span>
        </div>
      </div>
      <CardContent className="p-2 md:p-4 space-y-1.5 md:space-y-3">
        <h3 className="font-semibold text-sm md:text-lg line-clamp-2 leading-tight">{product.title}</h3>
        <div className="flex items-center gap-1 md:gap-2 flex-wrap">
          <p className="font-bold text-primary text-sm md:text-xl">{product.price}</p>
          {product.originalPrice && (
            <p className="text-[10px] md:text-sm text-muted-foreground line-through">
              {product.originalPrice}
            </p>
          )}
        </div>
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-xs md:text-sm h-8 md:h-10 py-1 md:py-2"
          onClick={handleAddToCart}
        >
          কার্টে যোগ করুন
        </Button>
      </CardContent>
    </Card>
  );
}
