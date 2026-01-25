"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Minus, Trash2, Sparkles } from "lucide-react";
import { CartItem } from "@/types/product";

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (productId: string | number, quantity: number) => void;
  onRemove: (productId: string | number) => void;
}

// Gradient colors for product backgrounds
const gradientColors = [
  "from-blue-500 via-blue-600 to-blue-700",
  "from-violet-500 via-purple-600 to-purple-700",
  "from-emerald-500 via-teal-600 to-green-700",
  "from-indigo-500 via-indigo-600 to-indigo-700",
  "from-pink-500 via-rose-600 to-red-700",
  "from-orange-500 via-orange-600 to-orange-700",
];

export function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemCardProps) {
  const getInitials = (title: string) => {
    return title
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get gradient based on item ID
  const gradientColor = gradientColors[Number(item.id) % gradientColors.length];

  return (
    <Card className="group p-3 md:p-4 bg-gradient-to-br from-card to-muted/20 border border-border/50 hover:border-primary/50 rounded-xl transition-all duration-300 hover:shadow-lg">
      <div className="flex gap-3 md:gap-4">
        {/* Product Image/Icon */}
        <div className="relative flex-shrink-0">
          <div className={`relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br ${gradientColor} flex items-center justify-center rounded-xl shadow-lg group-hover:shadow-xl transition-all overflow-hidden`}>
            {/* Decorative circles */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-white/20" />
              <div className="absolute -bottom-3 -left-3 w-10 h-10 rounded-full bg-white/10" />
            </div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full" />
            
            {/* Initials */}
            <span className="text-xl md:text-2xl font-black text-white drop-shadow-lg relative z-10">
              {getInitials(item.title)}
            </span>
          </div>
          
          {/* Discount Badge */}
          {item.discount && (
            <Badge className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 font-bold shadow-lg">
              -{item.discount}%
            </Badge>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Title */}
          <h3 className="font-semibold text-sm md:text-base text-foreground line-clamp-2 mb-1.5 md:mb-2 leading-tight group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 md:gap-1.5 mb-2 md:mb-2.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3 h-3 md:w-3.5 md:h-3.5 ${
                    i < Math.floor(item.rating || 0) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-muted-foreground/30'
                  }`} 
                />
              ))}
            </div>
            <span className="text-xs md:text-sm font-medium text-foreground">{item.rating}</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3 md:mb-4 flex-wrap">
            <p className="font-bold text-primary text-base md:text-lg">
              {item.price}
            </p>
            {item.originalPrice && (
              <p className="text-xs md:text-sm text-muted-foreground line-through">
                {item.originalPrice}
              </p>
            )}
            {item.discount && (
              <Badge variant="outline" className="text-[9px] md:text-[10px] border-primary/30 bg-primary/10 text-primary px-1.5 py-0">
                Save {item.discount}%
              </Badge>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-2 mt-auto">
            {/* Quantity Controls */}
            <div className="flex items-center gap-1 md:gap-2 border-2 border-border rounded-xl bg-muted/30 p-0.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 md:h-8 md:w-8 rounded-lg hover:bg-primary/10 hover:text-primary transition-all"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              >
                <Minus className="h-3 w-3 md:h-3.5 md:w-3.5" strokeWidth={3} />
              </Button>
              <span className="text-sm md:text-base font-bold w-7 md:w-8 text-center text-foreground">
                {item.quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 md:h-8 md:w-8 rounded-lg hover:bg-primary/10 hover:text-primary transition-all"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-3 w-3 md:h-3.5 md:w-3.5" strokeWidth={3} />
              </Button>
            </div>

            {/* Subtotal & Remove */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="text-right">
                <p className="text-[10px] md:text-xs text-muted-foreground">সাবটোটাল</p>
                <p className="text-sm md:text-base font-bold text-primary">
                  ৳{(item.priceValue * item.quantity).toLocaleString()}
                </p>
              </div>

              {/* Remove Button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 md:h-9 md:w-9 rounded-lg text-destructive hover:text-white hover:bg-destructive transition-all hover:scale-110"
                onClick={() => onRemove(item.id)}
              >
                <Trash2 className="h-4 w-4 md:h-4.5 md:w-4.5" strokeWidth={2.5} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}