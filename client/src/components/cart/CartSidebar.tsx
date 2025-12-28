"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { CartItemCard } from "./CartItemCard";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useActiveCategories } from "@/hooks/useCategories";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

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

  // Group cart items by category
  const groupedItems = cartItems.reduce((acc, item) => {
    const category = categories?.find((cat) => cat.id === item.categoryId);
    const categoryName = category?.name || "Other";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(item);
    return acc;
  }, {} as Record<string, typeof cartItems>);

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            শপিং কার্ট ({getTotalItems()})
          </h2>
        </div>

        <div className="mt-6 flex flex-col h-[calc(100vh-120px)]">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center flex-1">
              <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <p className="text-lg font-medium mb-2">আপনার কার্ট খালি</p>
              <p className="text-sm text-muted-foreground mb-6">
                প্রোডাক্ট যোগ করতে "কার্টে যোগ করুন" বাটনে ক্লিক করুন
              </p>
              <Button
                onClick={() => setIsCartOpen(false)}
                asChild
                className="w-full sm:w-auto"
              >
                <Link href="/shop">শপিং শুরু করুন</Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items by Category */}
              <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                {Object.entries(groupedItems).map(([categoryName, items]) => (
                  <div key={categoryName} className="space-y-3">
                    <h3 className="text-lg font-semibold text-primary sticky top-0 bg-background py-2 z-10">
                      {categoryName}
                    </h3>
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
                    <Separator className="my-4" />
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t pt-4 mt-4 space-y-4 bg-background sticky bottom-0">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>মোট মূল্য:</span>
                  <span className="text-primary">
                    ৳{getTotalPrice().toLocaleString()}
                  </span>
                </div>

                <div className="space-y-2">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => {
                      setIsCartOpen(false);
                      // Navigate to checkout - you can update this path
                      window.location.href = "/cart";
                    }}
                  >
                    কার্ট দেখুন
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
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

