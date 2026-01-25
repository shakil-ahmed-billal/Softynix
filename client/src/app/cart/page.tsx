"use client";

import { CartItemCard } from "@/components/cart/CartItemCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/cart-context";
import { useActiveCategories } from "@/hooks/useCategories";
import { 
  ArrowRight, 
  ShoppingCart, 
  Trash2, 
  Package, 
  Shield, 
  Sparkles,
  CheckCircle2,
  TrendingUp
} from "lucide-react";
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
      <div className="relative min-h-[60vh] bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          <div className="mb-6 md:mb-8 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 md:h-10 bg-gradient-primary rounded-full" />
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">শপিং কার্ট</h1>
            </div>
          </div>

          <Card className="max-w-md mx-auto bg-card/80 backdrop-blur-sm border-2 border-dashed border-border/50 rounded-2xl animate-scale-in">
            <CardContent className="flex flex-col items-center justify-center py-12 md:py-16 text-center">
              <div className="p-5 md:p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full mb-4 md:mb-6">
                <ShoppingCart className="h-12 w-12 md:h-16 md:w-16 text-primary" strokeWidth={2} />
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-2 text-foreground">কার্ট খালি আছে</h2>
              <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-sm">
                প্রোডাক্ট যোগ করতে "কার্টে যোগ করুন" বাটনে ক্লিক করুন
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-primary text-primary-foreground px-8 py-6 text-sm md:text-base font-semibold rounded-xl shadow-xl glow-primary hover:scale-105 transition-all" 
                asChild
              >
                <Link href="/shop">
                  শপিং শুরু করুন
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 py-6 md:py-10 relative z-10">
        {/* Header */}
        <div className="mb-6 md:mb-8 animate-fade-in">
          <div className="flex items-center justify-between gap-4 mb-3 md:mb-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 md:h-10 bg-gradient-primary rounded-full" />
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">শপিং কার্ট</h1>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  {getTotalItems()} টি প্রোডাক্ট
                </p>
              </div>
            </div>
            
            {cartItems.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearCart}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 border-2 rounded-xl h-9 md:h-10 px-3 md:px-4 text-xs md:text-sm"
              >
                <Trash2 className="mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                <span className="hidden sm:inline">কার্ট খালি করুন</span>
                <span className="sm:hidden">খালি</span>
              </Button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-primary transition-all duration-500"
                style={{ width: `${Math.min((getTotalItems() / 10) * 100, 100)}%` }}
              />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
              {getTotalItems()}/10
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-5 md:space-y-6">
            {Object.entries(groupedItems).map(([categoryName, items], catIndex) => (
              <div key={categoryName} className="animate-slide-up" style={{ animationDelay: `${catIndex * 0.05}s` }}>
                <Card className="bg-card/80 backdrop-blur-sm border-border/50 rounded-2xl overflow-hidden shadow-lg">
                  {/* Category Header */}
                  <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-b border-border/50 p-3 md:p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="p-1.5 md:p-2 bg-primary/20 rounded-lg">
                          <Package className="h-4 w-4 md:h-5 md:w-5 text-primary" strokeWidth={2.5} />
                        </div>
                        <h2 className="text-base md:text-lg lg:text-xl font-bold text-foreground">
                          {categoryName}
                        </h2>
                      </div>
                      <Badge 
                        variant="outline" 
                        className="text-[10px] md:text-xs border-primary/30 bg-primary/10 text-primary font-semibold"
                      >
                        {items.length} টি
                      </Badge>
                    </div>
                  </div>

                  {/* Items List */}
                  <CardContent className="p-3 md:p-5 space-y-3 md:space-y-4">
                    {items.map((item, itemIndex) => (
                      <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${(catIndex * 0.05) + (itemIndex * 0.03)}s` }}>
                        <CartItemCard
                          item={item}
                          onUpdateQuantity={updateQuantity}
                          onRemove={removeFromCart}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 bg-card/80 backdrop-blur-sm border-border/50 rounded-2xl overflow-hidden shadow-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-b border-border/50 p-4 md:p-5">
                <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  অর্ডার সারাংশ
                </h2>
              </div>

              <CardContent className="p-4 md:p-6 space-y-4 md:space-y-5">
                {/* Summary Details */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      মোট আইটেম:
                    </span>
                    <span className="font-semibold text-foreground">{getTotalItems()} টি</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-muted-foreground">সাবটোটাল:</span>
                    <span className="font-semibold text-foreground">৳{getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-muted-foreground">ডেলিভারি ফি:</span>
                    <Badge variant="outline" className="text-[10px] md:text-xs border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400">
                      ফ্রি
                    </Badge>
                  </div>
                  
                  <Separator className="bg-border/50" />
                  
                  <div className="flex justify-between items-center p-3 md:p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
                    <span className="text-base md:text-lg font-bold text-foreground">মোট:</span>
                    <span className="text-xl md:text-2xl font-bold text-primary">
                      ৳{getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-2">
                  <Button 
                    size="lg" 
                    className="w-full h-12 md:h-14 text-sm md:text-base font-semibold bg-gradient-primary text-primary-foreground rounded-xl shadow-xl glow-primary hover:scale-[1.02] transition-all" 
                    onClick={handleBuyNow}
                  >
                    এখনই কিনুন
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full h-11 md:h-12 text-sm md:text-base rounded-xl border-2 hover:border-primary hover:bg-primary/5 transition-all" 
                    asChild
                  >
                    <Link href="/shop">
                      আরও প্রোডাক্ট দেখুন
                    </Link>
                  </Button>
                </div>

                <Separator className="bg-border/50" />

                {/* Trust Badges */}
                <div className="space-y-2 md:space-y-2.5">
                  <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                    <div className="p-1.5 bg-primary/10 rounded-lg">
                      <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">তাৎক্ষণিক ডেলিভারি</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                    <div className="p-1.5 bg-primary/10 rounded-lg">
                      <Shield className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">১০০% অরিজিনাল প্রোডাক্ট</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                    <div className="p-1.5 bg-primary/10 rounded-lg">
                      <TrendingUp className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">মুদ্রা ফেরতের গ্যারান্টি</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}