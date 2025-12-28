"use client";

import { useCart } from "@/contexts/cart-context";
import { ShoppingCart } from "lucide-react";

export function FloatingCartButton() {
  const { getTotalItems, setIsCartOpen } = useCart();
  const itemCount = getTotalItems();

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button
        className="h-16 w-16 rounded-full shadow-lg hover:shadow-xl transition-all relative flex justify-center items-center bg-background border"
        onClick={() => setIsCartOpen(true)}
      >
        <ShoppingCart className="h-8 w-8" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center border-2 border-background">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </button>
    </div>
  );
}
