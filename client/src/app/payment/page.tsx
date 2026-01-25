"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { useFacebookPixel } from "@/hooks/useFacebookPixel";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";
import { useCreateOrder } from "@/hooks/useOrderMutations";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  Hash,
  Loader2,
  Mail,
  Phone as PhoneIcon,
  Shield,
  Smartphone,
  Sparkles,
  User,
  Wallet,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";

const PAYMENT_METHODS = [
  { value: "Bkash", label: "bKash", color: "from-[#E2136E] to-[#C90D5E]" },
  { value: "Nagad", label: "Nagad", color: "from-[#EE3124] to-[#D91E13]" },
  { value: "Rocket", label: "Rocket", color: "from-[#8B3A9C] to-[#7A2D8C]" },
  { value: "Upay", label: "Upay", color: "from-[#FF6B00] to-[#E85D00]" },
];

const PAYMENT_ACCOUNT = "01966254437";
const QR_CODE_URL =
  "https://img.freepik.com/premium-vector/qr-code-isolated-transparent-background_389832-976.jpg?w=1380";
const BKASH_LOGO_URL =
  "https://freepnglogo.com/images/all_img/1701541755bkash-logo-png.png";

function PaymentPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const createOrder = useCreateOrder();
  const { trackInitiateCheckout, trackPurchase } = useFacebookPixel();
  const { trackBeginCheckout, trackPurchase: trackGAPurchase } =
    useGoogleAnalytics();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const customerName = searchParams.get("name") || user?.name || "";
  const customerEmail = searchParams.get("email") || user?.email || "";
  const customerPhone = searchParams.get("phone") || user?.phone || "";

  const [formData, setFormData] = useState({
    paymentMethod: "",
    senderPhone: "",
    transactionId: "",
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      router.push("/cart");
      return;
    }

    const total = getTotalPrice();
    trackInitiateCheckout({
      value: total,
      currency: "BDT",
      content_ids: cartItems.map((item) => String(item.id)),
      num_items: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    });

    trackBeginCheckout({
      currency: "BDT",
      value: total,
      items: cartItems.map((item) => ({
        item_id: String(item.id),
        item_name: item.title,
        item_category: item.categoryId ? String(item.categoryId) : undefined,
        price: item.priceValue,
        quantity: item.quantity,
      })),
    });
  }, [
    cartItems,
    router,
    getTotalPrice,
    trackInitiateCheckout,
    trackBeginCheckout,
  ]);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(PAYMENT_ACCOUNT);
    setCopied(true);
    toast.success("Account number copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (!formData.senderPhone.trim()) {
      toast.error("Please enter sender phone number");
      return;
    }

    if (!formData.transactionId.trim()) {
      toast.error("Please enter transaction ID");
      return;
    }

    if (
      !customerName.trim() ||
      !customerEmail.trim() ||
      !customerPhone.trim()
    ) {
      toast.error("Customer information is required");
      router.push("/checkout");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      router.push("/cart");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderItems = cartItems.map((item) => ({
        productId: String(item.id),
        quantity: Number(item.quantity) || 1,
      }));

      const result = await createOrder.mutateAsync({
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerPhone.trim(),
        paymentMethod: formData.paymentMethod,
        senderPhone: formData.senderPhone.trim(),
        transactionId: formData.transactionId.trim(),
        items: orderItems,
      });

      const total = getTotalPrice();

      trackPurchase({
        value: total,
        currency: "BDT",
        content_name: `Order ${result.data.orderNumber}`,
        content_ids: cartItems.map((item) => String(item.id)),
        contents: cartItems.map((item) => ({
          id: String(item.id),
          quantity: item.quantity,
        })),
      });

      trackGAPurchase({
        transaction_id: result.data.orderNumber,
        value: total,
        currency: "BDT",
        items: cartItems.map((item) => ({
          item_id: String(item.id),
          item_name: item.title,
          item_category: item.categoryId ? String(item.categoryId) : undefined,
          price: item.priceValue,
          quantity: item.quantity,
        })),
      });

      clearCart();
      toast.success("Order placed successfully!");
      router.push(
        `/checkout/success?orderId=${result.data.id}&orderNumber=${result.data.orderNumber}`,
      );
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to place order. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const subtotal = getTotalPrice();
  const shipping = 0;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-transparent via-[#E2136E]/5 to-transparent">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E2136E]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C90D5E]/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 py-6 md:py-10 relative z-10">
        {/* Header */}
        <div className="mb-6 md:mb-8 animate-fade-in">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-3 md:mb-4 text-muted-foreground hover:text-primary -ml-2"
            size="sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="text-xs md:text-sm">চেকআউটে ফিরুন</span>
          </Button>

          <div className="flex items-center gap-3">
            <div className="w-1 h-8 md:h-10 bg-gradient-to-b from-[#E2136E] to-[#C90D5E] rounded-full" />
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                পেমেন্ট
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                অর্ডার সম্পন্ন করতে পেমেন্ট করুন
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* bKash Style Payment Card */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 rounded-2xl overflow-hidden shadow-xl animate-slide-up">
              <CardHeader className="bg-gradient-to-r from-[#E2136E] to-[#C90D5E] border-b border-white/10 relative overflow-hidden">
                {/* bKash Logo */}
                <div className="absolute top-2 right-2 md:top-3 md:right-3 opacity-20">
                  <img
                    src={BKASH_LOGO_URL}
                    alt="bKash"
                    className="h-12 md:h-16 w-auto"
                  />
                </div>
                <CardTitle className="flex items-center gap-2 md:gap-3 text-white text-base md:text-lg relative z-10">
                  <Wallet className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} />
                  পেমেন্ট তথ্য
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className=" md:flex w-full">
                  {/* Payment Instructions */}
                  <div className="mb-5 md:mb-6 p-4 md:p-5 bg-gradient-to-br from-[#E2136E]/10 to-[#C90D5E]/5 border-2 border-[#E2136E]/20 rounded-xl w-full">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm md:text-base text-foreground mb-2 md:mb-3">
                          পেমেন্ট পাঠান:
                        </h3>
                        <div className="space-y-2 md:space-y-2.5">
                          <div className="flex items-center justify-between p-2 md:p-3 bg-white dark:bg-muted rounded-lg">
                            <div>
                              <p className="text-[10px] md:text-xs text-muted-foreground mb-0.5">
                                অ্যাকাউন্ট নাম্বার
                              </p>
                              <p className="font-mono text-lg md:text-2xl font-bold text-[#E2136E]">
                                {PAYMENT_ACCOUNT}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleCopyAccount}
                              className="h-8 w-8 md:h-9 md:w-9 p-0 hover:bg-[#E2136E]/10"
                            >
                              {copied ? (
                                <Check className="h-4 w-4 md:h-5 md:w-5 text-[#E2136E]" />
                              ) : (
                                <Copy className="h-4 w-4 md:h-5 md:w-5 text-[#E2136E]" />
                              )}
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-2 md:p-3 bg-white dark:bg-muted rounded-lg">
                            <div>
                              <p className="text-[10px] md:text-xs text-muted-foreground mb-0.5">
                                পরিমাণ
                              </p>
                              <p className="text-xl md:text-3xl font-bold text-[#E2136E]">
                                ৳{total.toLocaleString()}
                              </p>
                            </div>
                            <Badge className="bg-[#E2136E] text-white text-[10px] md:text-xs px-2 md:px-3 py-1">
                              পে করুন
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* QR Code Section */}
                  <div className="mb-5 md:mb-6 p-4 md:p-5 bg-gradient-to-br from-muted/50 to-transparent border border-border/50 rounded-xl text-center w-full">
                    <p className="text-xs md:text-sm font-semibold text-foreground mb-3 md:mb-4 flex items-center justify-center gap-2">
                      <Sparkles className="h-4 w-4 text-[#E2136E]" />
                      QR কোড স্ক্যান করুন
                    </p>
                    <div className="inline-block p-3 md:p-4 bg-white rounded-xl shadow-lg">
                      <img
                        src={QR_CODE_URL}
                        alt="Payment QR Code"
                        className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto"
                      />
                    </div>
                    <p className="text-[10px] md:text-xs text-muted-foreground mt-3">
                      bKash, Nagad, Rocket অথবা Upay দিয়ে স্ক্যান করুন
                    </p>
                  </div>
                </div>

                {/* Payment Form */}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-5"
                >
                  {/* Payment Method */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="paymentMethod"
                      className="flex items-center gap-2 text-xs md:text-sm font-semibold"
                    >
                      <Wallet className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#E2136E]" />
                      পেমেন্ট মেথড
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.paymentMethod}
                      onValueChange={handlePaymentMethodChange}
                      required
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="h-11 md:h-12 rounded-xl border-2 focus:border-[#E2136E]">
                        <SelectValue placeholder="পেমেন্ট মেথড সিলেক্ট করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {PAYMENT_METHODS.map((method) => (
                          <SelectItem key={method.value} value={method.value}>
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-3 h-3 rounded-full bg-gradient-to-r ${method.color}`}
                              />
                              {method.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sender Phone */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="senderPhone"
                      className="flex items-center gap-2 text-xs md:text-sm font-semibold"
                    >
                      <Smartphone className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#E2136E]" />
                      সেন্ডার ফোন নাম্বার
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="senderPhone"
                      name="senderPhone"
                      type="tel"
                      value={formData.senderPhone}
                      onChange={handleInputChange}
                      placeholder="01XXXXXXXXX"
                      className="h-11 md:h-12 text-sm md:text-base rounded-xl border-2 focus:border-[#E2136E]"
                      required
                      disabled={isSubmitting}
                    />
                    <p className="text-[10px] md:text-xs text-muted-foreground">
                      যে নাম্বার থেকে পেমেন্ট পাঠিয়েছেন
                    </p>
                  </div>

                  {/* Transaction ID */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="transactionId"
                      className="flex items-center gap-2 text-xs md:text-sm font-semibold"
                    >
                      <Hash className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#E2136E]" />
                      ট্রানজেকশন আইডি
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="transactionId"
                      name="transactionId"
                      value={formData.transactionId}
                      onChange={handleInputChange}
                      placeholder="TRX ID লিখুন"
                      className="h-11 md:h-12 text-sm md:text-base rounded-xl border-2 focus:border-[#E2136E]"
                      required
                      disabled={isSubmitting}
                    />
                    <p className="text-[10px] md:text-xs text-muted-foreground">
                      পেমেন্ট করার পর প্রাপ্ত ট্রানজেকশন আইডি
                    </p>
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-start gap-3 p-3 md:p-4 bg-[#E2136E]/5 border border-[#E2136E]/20 rounded-xl">
                    <Shield className="h-4 w-4 md:h-5 md:w-5 text-[#E2136E] flex-shrink-0 mt-0.5" />
                    <div className="text-xs md:text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        সুরক্ষিত পেমেন্ট।
                      </span>{" "}
                      আপনার তথ্য সম্পূর্ণ এনক্রিপ্টেড এবং নিরাপদ।
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-12 md:h-14 text-sm md:text-base font-semibold bg-gradient-to-r from-[#E2136E] to-[#C90D5E] hover:from-[#C90D5E] hover:to-[#E2136E] text-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin" />
                        প্রসেসিং...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                        অর্ডার সম্পন্ন করুন
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Order Summary - Mobile */}
            <Card
              className="lg:hidden bg-card/80 backdrop-blur-sm border-border/50 rounded-2xl overflow-hidden shadow-lg animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/5 border-b border-border/50">
                <CardTitle className="text-base md:text-lg">
                  অর্ডার সামারি
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-2 mb-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-xs md:text-sm"
                    >
                      <span className="text-muted-foreground truncate flex-1 mr-2">
                        {item.title} × {item.quantity}
                      </span>
                      <span className="font-semibold text-foreground flex-shrink-0">
                        {item.priceValue
                          ? `৳${(item.priceValue * item.quantity).toLocaleString()}`
                          : item.price}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-muted-foreground">সাবটোটাল</span>
                    <span className="font-semibold">
                      ৳{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-muted-foreground">শিপিং</span>
                    <Badge
                      variant="outline"
                      className="text-[10px] md:text-xs border-green-500/30 bg-green-500/10 text-green-600"
                    >
                      ফ্রি
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#E2136E]/10 to-[#C90D5E]/10 rounded-xl border border-[#E2136E]/20">
                    <span className="text-base md:text-lg font-bold">মোট</span>
                    <span className="text-xl md:text-2xl font-bold text-[#E2136E]">
                      ৳{total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6">
            {/* Customer Info */}
            <Card
              className=" bg-card/80 backdrop-blur-sm border-border/50 rounded-2xl overflow-hidden shadow-xl animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-b border-border/50">
                <CardTitle className="text-base md:text-lg flex items-center gap-2">
                  <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  গ্রাহকের তথ্য
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 space-y-3 md:space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">নাম</p>
                    <p className="font-semibold text-sm md:text-base text-foreground truncate">
                      {customerName}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">
                      ইমেইল
                    </p>
                    <p className="font-semibold text-sm md:text-base text-foreground truncate">
                      {customerEmail}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <PhoneIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">ফোন</p>
                    <p className="font-semibold text-sm md:text-base text-foreground">
                      {customerPhone}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary - Desktop */}
            <Card className="hidden lg:block bg-card/80 backdrop-blur-sm border-border/50 rounded-2xl overflow-hidden shadow-xl">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/5 border-b border-border/50">
                <CardTitle className="text-lg">অর্ডার সামারি</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground truncate flex-1 mr-2">
                        {item.title} × {item.quantity}
                      </span>
                      <span className="font-semibold flex-shrink-0">
                        {item.priceValue
                          ? `৳${(item.priceValue * item.quantity).toLocaleString()}`
                          : item.price}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">সাবটোটাল</span>
                    <span className="font-semibold">
                      ৳{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">শিপিং</span>
                    <Badge
                      variant="outline"
                      className="text-xs border-green-500/30 bg-green-500/10 text-green-600"
                    >
                      ফ্রি
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[#E2136E]/10 to-[#C90D5E]/10 rounded-xl border border-[#E2136E]/20">
                    <span className="text-lg font-bold">মোট</span>
                    <span className="text-2xl font-bold text-[#E2136E]">
                      ৳{total.toLocaleString()}
                    </span>
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

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-12 pb-12">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-muted-foreground">
                    Loading payment page...
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      }
    >
      <PaymentPageContent />
    </Suspense>
  );
}
