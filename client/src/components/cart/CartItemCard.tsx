"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Plus, Minus, Trash2 } from "lucide-react";
import { CartItem } from "@/types/product";
import { Badge } from "@/components/ui/badge";

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (productId: string | number, quantity: number) => void;
  onRemove: (productId: string | number) => void;
}

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

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Product Image/Icon */}
        <div className="relative w-20 h-20 md:w-36 md:h-36 bg-muted flex items-center justify-center rounded-lg flex-shrink-0">
          <div className="text-xl md:text-2xl font-bold text-muted-foreground/30">
            {getInitials(item.title)}
          </div>
          {item.discount && (
            <Badge className="absolute -top-1 -right-1 bg-red-500 text-white border-0 text-[10px] px-1 py-0">
              -{item.discount}%
            </Badge>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-1">
            {item.title}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-muted-foreground">{item.rating}</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <p className="font-bold text-primary text-sm md:text-base">
              {item.price}
            </p>
            {item.originalPrice && (
              <p className="text-xs text-muted-foreground line-through">
                {item.originalPrice}
              </p>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-sm font-medium w-8 text-center">
                {item.quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => onRemove(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Subtotal */}
          <p className="text-xs text-muted-foreground mt-2">
            Subtotal: ৳{(item.priceValue * item.quantity).toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
}

