"use client";

import { useCart } from "@/contexts/cart-context";
import { ShoppingCart } from "lucide-react";

export function FloatingCartButton() {
  const { getTotalItems, setIsCartOpen } = useCart();
  const itemCount = getTotalItems();

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-44 right-3 sm:bottom-24 sm:right-4 lg:bottom-8 lg:right-8 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button
        className="relative group h-12 w-12 sm:h-12 sm:w-12 lg:h-[72px] lg:w-[72px] rounded-full bg-gradient-primary shadow-lg hover:shadow-2xl active:scale-95 transition-all duration-300 flex items-center justify-center"
        onClick={() => setIsCartOpen(true)}
        aria-label={`Shopping cart with ${itemCount} items`}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-primary blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300 animate-pulse-glow" />
        
        {/* Ripple Effect on Tap */}
        <div className="absolute inset-0 rounded-full bg-primary-foreground/20 scale-0 group-active:scale-100 transition-transform duration-300" />
        
        {/* Icon */}
        <ShoppingCart className="relative h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary-foreground drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
        
        {/* Badge */}
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-accent text-accent-foreground text-xs sm:text-sm font-bold flex items-center justify-center border-2 sm:border-[3px] border-background shadow-lg animate-scale-in">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
        
        {/* Pulse Ring Animation */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping opacity-75" />
      </button>
    </div>
  );
}