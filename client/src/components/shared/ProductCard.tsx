"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import { Product } from "@/types/product";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

// Gradient colors that cycle through products
const gradientColors = [
  "from-blue-500 via-blue-600 to-blue-700",
  "from-violet-500 via-purple-600 to-purple-700",
  "from-emerald-500 via-teal-600 to-green-700",
  "from-indigo-500 via-indigo-600 to-indigo-700",
  "from-pink-500 via-rose-600 to-red-700",
  "from-orange-500 via-orange-600 to-orange-700",
];

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  // Get random gradient or cycle based on product ID
  const gradientColor =
    gradientColors[Number(product.id) % gradientColors.length];

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
    toast.success("প্রোডাক্ট কার্টে যোগ করা হয়েছে");
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast.success(
      isFavorite ? "ফেভারিট থেকে সরানো হয়েছে" : "ফেভারিটে যোগ করা হয়েছে",
    );
  };

  // Mock rating - you can replace with actual rating from product data
  const rating = product.rating || 4.8;
  const reviews = product?.reviews || Math.floor(Math.random() * 500) + 50;

  return (
    <Card
      className="group bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
      onClick={handleCardClick}
    >
      {/* Product Image Area */}
      <div className="relative p-3 md:p-4 pb-0">
        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 md:top-5 md:right-5 z-20 w-7 h-7 md:w-8 md:h-8 rounded-full bg-background/90 dark:bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-muted-foreground hover:text-red-500"
            }`}
          />
        </button>

        {/* Badges */}
        {product.discount && (
          <Badge className="absolute top-4 left-4 md:top-5 md:left-5 z-20 bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 text-[10px] md:text-xs px-2 md:px-2.5 py-0.5 md:py-1 font-bold shadow-lg">
            HOT
          </Badge>
        )}
        {product.isNew && !product.discount && (
          <Badge className="absolute top-4 left-4 md:top-5 md:left-5 z-20 bg-accent text-accent-foreground border-0 text-[10px] md:text-xs px-2 md:px-2.5 py-0.5 md:py-1 font-bold shadow-lg flex items-center gap-1">
            <svg
              className="w-2.5 h-2.5 md:w-3 md:h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            NEW
          </Badge>
        )}

        {/* Product Icon/Image with Gradient */}
        <div
          className={`w-full aspect-square rounded-xl md:rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden relative`}
        >

           {/* Product Image */}
           {product?.image ? (
            <Image
              src={product.image}
              alt="Product Image"
              fill
              className="object-cover rounded-xl"
            />
          ) : (
            <span className="text-2xl md:text-4xl lg:text-5xl font-black text-white drop-shadow-2xl relative z-10">
            {/* Initials */}
            {getInitials(product.title)}
          </span>
          )}

          {/* Decorative circles */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-8 -right-8 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10" />
          </div>

          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full" />

        </div>
      </div>

      {/* Product Info */}
      <CardContent className="p-3 md:p-4 space-y-2 md:space-y-2.5">
        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 md:w-3.5 md:h-3.5 ${
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <span className="text-xs md:text-sm font-semibold text-foreground">
            {rating}
          </span>
          <span className="text-[10px] md:text-xs text-muted-foreground">
            ({reviews})
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-xs md:text-sm lg:text-base font-semibold text-foreground line-clamp-1 leading-tight min-h-[2rem] md:min-h-[2.5rem] group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        {/* Price Section */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-[10px] md:text-xs text-muted-foreground line-through leading-tight">
                {product.originalPrice}
              </span>
            )}
            <span className="text-primary font-bold text-base md:text-lg lg:text-xl">
              {product.price}
            </span>
          </div>

          {/* Add to Cart Button */}
          <Button
            size="sm"
            className="shrink-0 h-8 md:h-9 w-8 md:w-9 p-0 rounded-xl bg-primary hover:bg-primary/90 shadow-lg group-hover:scale-110 transition-transform"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
