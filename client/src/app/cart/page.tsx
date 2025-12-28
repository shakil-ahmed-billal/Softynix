"use client";

import { CartItemCard } from "@/components/cart/CartItemCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/cart-context";
import { useActiveCategories } from "@/hooks/useCategories";
import { ArrowRight, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
    clearCart,
  } = useCart();
  const router = useRouter();
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

  const handleBuyNow = () => {
    // Navigate to checkout page
    router.push("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold mb-8">শপিং কার্ট</h1>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mb-4" />
          <p className="text-lg font-medium mb-2">আপনার কার্ট খালি</p>
          <p className="text-sm text-muted-foreground mb-6">
            প্রোডাক্ট যোগ করতে "কার্টে যোগ করুন" বাটনে ক্লিক করুন
          </p>
          <Button asChild>
            <Link href="/shop">শপিং শুরু করুন</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">শপিং কার্ট</h1>
        {cartItems.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearCart}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            কার্ট খালি করুন
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {Object.entries(groupedItems).map(([categoryName, items]) => (
            <div key={categoryName} className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold text-primary">
                  {categoryName}
                </h2>
                <Separator className="flex-1" />
                <span className="text-sm text-muted-foreground">
                  {items.length} টি আইটেম
                </span>
              </div>
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>
              {Object.keys(groupedItems).indexOf(categoryName) <
                Object.keys(groupedItems).length - 1 && (
                <Separator className="my-6" />
              )}
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="border rounded-lg p-6 space-y-6 bg-card">
              <h2 className="text-xl font-semibold">অর্ডার সারাংশ</h2>
              <Separator />

              {/* Summary Details */}
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">মোট আইটেম:</span>
                  <span className="font-medium">{getTotalItems()} টি</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">সাবটোটাল:</span>
                  <span className="font-medium">
                    ৳{getTotalPrice().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ডেলিভারি ফি:</span>
                  <span className="font-medium">ফ্রি</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>মোট:</span>
                  <span className="text-primary">
                    ৳{getTotalPrice().toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button size="lg" className="w-full" onClick={handleBuyNow}>
                  এখনই কিনুন
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/shop">আরও প্রোডাক্ট দেখুন</Link>
                </Button>
              </div>

              {/* Additional Info */}
              <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
                <p>✓ তাৎক্ষণিক ডেলিভারি</p>
                <p>✓ ১০০% অরিজিনাল প্রোডাক্ট</p>
                <p>✓ মুদ্রা ফেরতের গ্যারান্টি</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
