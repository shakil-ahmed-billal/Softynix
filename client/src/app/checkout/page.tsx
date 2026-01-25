"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { 
  CreditCard, 
  Package, 
  ShoppingCart, 
  Shield, 
  Sparkles, 
  ChevronRight,
  User,
  Mail,
  Phone,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, getTotalPrice } = useCart();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  // Redirect to signup if not logged in
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast.error("Please sign up or login to continue");
      router.push(`/signup?redirect=${encodeURIComponent("/checkout")}`);
    }
  }, [isAuthenticated, authLoading, router]);

  // Form state - only name, email, phone
  const [formData, setFormData] = useState({
    customerName: user?.name || "",
    customerEmail: user?.email || "",
    customerPhone: user?.phone || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.customerName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!formData.customerEmail.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!formData.customerPhone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      router.push("/shop");
      return;
    }

    // Redirect to payment page with customer info
    const params = new URLSearchParams({
      name: formData.customerName.trim(),
      email: formData.customerEmail.trim(),
      phone: formData.customerPhone.trim(),
    });
    router.push(`/payment?${params.toString()}`);
  };

  const subtotal = getTotalPrice();
  const shipping = 0; // Free shipping for now
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12 min-h-[60vh] flex items-center justify-center">
        <Card className="max-w-md w-full bg-card/80 backdrop-blur-sm border-2 border-dashed border-border/50 rounded-2xl">
          <CardContent className="flex flex-col items-center justify-center py-12 md:py-16 text-center">
            <div className="p-4 md:p-5 bg-primary/10 rounded-full mb-4 md:mb-6">
              <ShoppingCart className="h-10 w-10 md:h-12 md:w-12 text-primary" strokeWidth={2} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-2 text-foreground">কার্ট খালি আছে</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
              চেকআউট করার আগে প্রোডাক্ট যোগ করুন
            </p>
            <Button size="lg" className="bg-gradient-primary text-primary-foreground px-6 md:px-8 rounded-xl shadow-lg glow-primary hover:scale-105 transition-all" asChild>
              <Link href="/shop">
                শপিং করুন
                <ChevronRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
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
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-muted-foreground hover:text-primary -ml-2"
              asChild
            >
              <Link href="/cart">
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span className="text-xs md:text-sm">কার্টে ফিরুন</span>
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 md:h-10 bg-gradient-primary rounded-full" />
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">চেকআউট</h1>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                অর্ডার রিভিউ করুন এবং সম্পন্ন করুন
              </p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mt-4 md:mt-6">
            <div className="flex items-center gap-2 flex-1">
              <div className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary text-white text-xs md:text-sm font-bold">
                1
              </div>
              <span className="text-xs md:text-sm font-semibold text-primary">তথ্য</span>
            </div>
            <div className="h-0.5 flex-1 bg-border" />
            <div className="flex items-center gap-2 flex-1">
              <div className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-muted text-muted-foreground text-xs md:text-sm font-bold">
                2
              </div>
              <span className="text-xs md:text-sm text-muted-foreground">পেমেন্ট</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Shipping Information */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 rounded-2xl overflow-hidden animate-slide-up shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/5 border-b border-border/50">
                <CardTitle className="flex items-center gap-2 md:gap-3 text-base md:text-lg">
                  <div className="p-2 md:p-2.5 bg-primary/20 rounded-xl">
                    <Package className="h-4 w-4 md:h-5 md:w-5 text-primary" strokeWidth={2.5} />
                  </div>
                  শিপিং তথ্য
                  <Badge variant="outline" className="ml-auto text-[10px] md:text-xs border-primary/30 bg-primary/10 text-primary">
                    প্রয়োজনীয়
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <form onSubmit={handleProceedToPayment} className="space-y-4 md:space-y-5">
                  <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <Label htmlFor="customerName" className="flex items-center gap-2 text-xs md:text-sm font-semibold">
                        <User className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                        সম্পূর্ণ নাম
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="customerName"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        placeholder="আপনার নাম লিখুন"
                        className="h-11 md:h-12 text-sm md:text-base rounded-xl border-2 focus:border-primary transition-all"
                        required
                      />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="customerEmail" className="flex items-center gap-2 text-xs md:text-sm font-semibold">
                        <Mail className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                        ইমেইল
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="customerEmail"
                        name="customerEmail"
                        type="email"
                        value={formData.customerEmail}
                        onChange={handleInputChange}
                        placeholder="example@email.com"
                        className="h-11 md:h-12 text-sm md:text-base rounded-xl border-2 focus:border-primary transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <Label htmlFor="customerPhone" className="flex items-center gap-2 text-xs md:text-sm font-semibold">
                      <Phone className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                      ফোন নাম্বার
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="customerPhone"
                      name="customerPhone"
                      type="tel"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      placeholder="01XXXXXXXXX"
                      className="h-11 md:h-12 text-sm md:text-base rounded-xl border-2 focus:border-primary transition-all"
                      required
                    />
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-start gap-3 p-3 md:p-4 bg-primary/5 border border-primary/20 rounded-xl">
                    <Shield className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="text-xs md:text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">আপনার তথ্য সুরক্ষিত।</span> আমরা আপনার ব্যক্তিগত তথ্য কখনো শেয়ার করি না।
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-12 md:h-14 text-sm md:text-base font-semibold bg-gradient-primary text-primary-foreground rounded-xl shadow-xl glow-primary hover:scale-[1.02] transition-all"
                  >
                    <CreditCard className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    পেমেন্টে যান
                    <ChevronRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Order Items - Mobile View */}
            <Card className="lg:hidden bg-card/80 backdrop-blur-sm border-border/50 rounded-2xl overflow-hidden animate-slide-up shadow-lg" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="bg-gradient-to-r from-accent/10 to-primary/5 border-b border-border/50">
                <CardTitle className="flex items-center gap-2 md:gap-3 text-base md:text-lg">
                  <div className="p-2 md:p-2.5 bg-accent/20 rounded-xl">
                    <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 text-accent" strokeWidth={2.5} />
                  </div>
                  অর্ডার আইটেম
                  <Badge variant="outline" className="ml-auto text-[10px] md:text-xs border-accent/30 bg-accent/10 text-accent">
                    {cartItems.length} টি
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-3 md:space-y-4">
                  {cartItems.map((item, index) => (
                    <div 
                      key={item.id} 
                      className="flex gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-muted/30 border border-border/30 hover:border-primary/30 transition-all"
                    >
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0 shadow-md">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-primary">
                            <Package className="h-6 w-6 md:h-8 md:w-8" />
                          </div>
                        )}
                        <div className="absolute top-1 right-1 w-5 h-5 md:w-6 md:h-6 bg-primary rounded-full flex items-center justify-center text-white text-[10px] md:text-xs font-bold shadow-lg">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm md:text-base text-foreground line-clamp-2 leading-tight mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs md:text-sm text-muted-foreground mb-2">
                          সংখ্যা: {item.quantity}
                        </p>
                        <p className="text-sm md:text-base font-bold text-primary">
                          {item.priceValue
                            ? `৳${(item.priceValue * item.quantity).toLocaleString()}`
                            : item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 bg-card/80 backdrop-blur-sm border-border/50 rounded-2xl overflow-hidden shadow-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-b border-border/50">
                <CardTitle className="flex items-center gap-2 md:gap-3 text-base md:text-lg">
                  <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  অর্ডার সামারি
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 space-y-4 md:space-y-5">
                {/* Items List - Desktop Only */}
                <div className="hidden lg:block space-y-2 md:space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs md:text-sm gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <span className="flex items-center gap-2 flex-1 min-w-0">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        <span className="truncate">{item.title} × {item.quantity}</span>
                      </span>
                      <span className="font-semibold text-primary flex-shrink-0">
                        {item.priceValue
                          ? `৳${(item.priceValue * item.quantity).toLocaleString()}`
                          : item.price}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator className="bg-border/50" />

                {/* Price Breakdown */}
                <div className="space-y-2.5 md:space-y-3">
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-muted-foreground">সাবটোটাল</span>
                    <span className="font-semibold text-foreground">৳{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-muted-foreground">শিপিং</span>
                    <Badge variant="outline" className="text-[10px] md:text-xs border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400">
                      ফ্রি
                    </Badge>
                  </div>
                  <Separator className="bg-border/50" />
                  <div className="flex justify-between items-center p-3 md:p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
                    <span className="text-base md:text-lg font-bold text-foreground">মোট</span>
                    <span className="text-xl md:text-2xl font-bold text-primary">৳{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="flex items-center gap-1.5 p-2 bg-primary/5 rounded-lg border border-primary/20">
                    <Shield className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary flex-shrink-0" />
                    <span className="text-[10px] md:text-xs font-semibold text-foreground">সুরক্ষিত</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 bg-accent/5 rounded-lg border border-accent/20">
                    <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4 text-accent flex-shrink-0" />
                    <span className="text-[10px] md:text-xs font-semibold text-foreground">বিশ্বস্ত</span>
                  </div>
                </div>

                <Separator className="bg-border/50" />

                {/* Back Button */}
                <Button 
                  variant="outline" 
                  className="w-full h-11 md:h-12 text-sm md:text-base rounded-xl border-2 hover:border-primary hover:bg-primary/5 transition-all" 
                  asChild
                >
                  <Link href="/cart">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    কার্টে ফিরুন
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}