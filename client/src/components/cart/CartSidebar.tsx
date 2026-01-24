"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { CartItemCard } from "./CartItemCard";
import { ShoppingCart, ArrowRight, X, ShoppingBag } from "lucide-react";
import { useActiveCategories } from "@/hooks/useCategories";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CartSidebar() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
    clearCart,
  } = useCart();
  const { data: categories } = useActiveCategories();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Group cart items by category
  const groupedItems = cartItems.reduce((acc, item) => {
    const category = categories?.find((cat) => cat.id === item.categoryId);
    const categoryName = category?.name || "অন্যান্য";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(item);
    return acc;
  }, {} as Record<string, typeof cartItems>);

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent 
        side={isMobile ? "bottom" : "right"} 
        className={`
          ${isMobile 
            ? "w-full h-[70vh] rounded-t-3xl border-t-4 border-primary/20" 
            : "w-full sm:max-w-lg h-full rounded-none"
          }
          overflow-hidden p-0 flex flex-col
        `}
      >
        {/* Header with Handle (Mobile) or Close Button */}
        <div className={`
          ${isMobile ? "pt-3 pb-4" : "pt-6 pb-4"}
          px-6 bg-gradient-to-b from-primary/5 to-transparent
          border-b border-border/50 shrink-0
        `}>
          {isMobile && (
            <div className="flex justify-center mb-4">
              <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <div className="relative bg-gradient-primary p-2 rounded-xl">
                  <ShoppingBag className="h-4 w-4 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-sm sm:text-2xl font-bold text-foreground">
                  শপিং কার্ট
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {getTotalItems()} টি পণ্য নির্বাচিত
                </p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(false)}
              className="h-10 w-10 rounded-full hover:bg-destructive/10 border border-red-700 hover:text-destructive transition-all duration-200 shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center flex-1">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full" />
                <div className="relative bg-gradient-card p-6 rounded-2xl border border-border/50">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground/40" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                আপনার কার্ট খালি
              </h3>
              <p className="text-sm text-muted-foreground mb-8 max-w-xs">
                প্রোডাক্ট যোগ করতে "কার্টে যোগ করুন" বাটনে ক্লিক করুন
              </p>
              <Button
                onClick={() => setIsCartOpen(false)}
                asChild
                size="lg"
                className="w-full sm:w-auto bg-gradient-primary hover:opacity-90 transition-opacity rounded-xl px-8">
                <Link href="/shop">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  শপিং শুরু করুন
                </Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items by Category */}
              <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4">
                <div className="space-y-6 pb-4">
                  {Object.entries(groupedItems).map(([categoryName, items], idx) => (
                    <div 
                      key={categoryName} 
                      className="animate-slide-up"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                        <h3 className="text-sm font-semibold text-primary px-3 py-1 bg-primary/5 rounded-full">
                          {categoryName}
                        </h3>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                      </div>
                      
                      <div className="space-y-3">
                        {items.map((item) => (
                          <CartItemCard
                            key={item.id}
                            item={item}
                            onUpdateQuantity={updateQuantity}
                            onRemove={removeFromCart}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Summary Footer */}
              <div className="shrink-0 border-t border-border/50 bg-gradient-to-t from-background via-background to-transparent px-6 py-4 space-y-4">
                {/* Price Breakdown */}
                <div className="bg-gradient-card rounded-2xl p-4 border border-border/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">সাবটোটাল</span>
                    <span className="text-sm font-medium">
                      ৳{getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg font-bold text-foreground">
                      মোট মূল্য
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-gradient-primary">
                      ৳{getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-200 rounded-xl h-12 sm:h-14 text-base font-semibold shadow-lg hover:shadow-xl group"
                    onClick={() => {
                      setIsCartOpen(false);
                      window.location.href = "/cart";
                    }}
                  >
                    অর্ডার সম্পন্ন করুন
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full rounded-xl h-11 text-sm hover:bg-destructive/5 hover:text-destructive hover:border-destructive/30 transition-all duration-200"
                    onClick={clearCart}
                  >
                    কার্ট খালি করুন
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}