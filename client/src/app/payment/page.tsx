"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { useCreateOrder } from "@/hooks/useOrderMutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, CheckCircle2, ArrowLeft, Wallet, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

const PAYMENT_METHODS = [
  { value: "Bkash", label: "Bkash" },
  { value: "Nagad", label: "Nagad" },
  { value: "Rocket", label: "Rocket" },
  { value: "Upay", label: "Upay" },
];

const PAYMENT_ACCOUNT = "01966254437";

function PaymentPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const createOrder = useCreateOrder();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get order data from query params (passed from checkout)
  const customerName = searchParams.get("name") || user?.name || "";
  const customerEmail = searchParams.get("email") || user?.email || "";
  const customerPhone = searchParams.get("phone") || user?.phone || "";

  const [formData, setFormData] = useState({
    paymentMethod: "",
    senderPhone: "",
    transactionId: "",
  });

  useEffect(() => {
    // Redirect if cart is empty
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      router.push("/cart");
    }
  }, [cartItems, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
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

    if (!customerName.trim()) {
      toast.error("Customer name is required");
      router.push("/checkout");
      return;
    }

    if (!customerEmail.trim()) {
      toast.error("Customer email is required");
      router.push("/checkout");
      return;
    }

    if (!customerPhone.trim()) {
      toast.error("Customer phone is required");
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
      // Prepare order items - ensure proper data types
      const orderItems = cartItems.map((item) => ({
        productId: String(item.id),
        quantity: Number(item.quantity) || 1,
      }));

      // Create order with payment info
      const result = await createOrder.mutateAsync({
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerPhone.trim(),
        paymentMethod: formData.paymentMethod,
        senderPhone: formData.senderPhone.trim(),
        transactionId: formData.transactionId.trim(),
        items: orderItems,
      });

      // Clear cart on success
      clearCart();

      // Show success message
      toast.success("Order placed successfully!");

      // Redirect to order confirmation
      router.push(
        `/checkout/success?orderId=${result.data.id}&orderNumber=${result.data.orderNumber}`
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
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Checkout
        </Button>
        <h1 className="text-3xl font-bold">Payment</h1>
        <p className="text-muted-foreground mt-2">
          Complete your payment to place the order
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Static Payment Details */}
              <div className="mb-6 p-4 bg-muted rounded-lg space-y-2">
                <h3 className="font-semibold mb-3">Send Payment To:</h3>
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">Account Type:</span> Bkash / Nagad / Rocket / Upay
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Account Number:</span>{" "}
                    <span className="font-mono text-lg font-bold">{PAYMENT_ACCOUNT}</span>
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="paymentMethod">
                    Payment Method <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={handlePaymentMethodChange}
                    required
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {PAYMENT_METHODS.map((method) => (
                        <SelectItem key={method.value} value={method.value}>
                          {method.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="senderPhone">
                    Sender Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="senderPhone"
                    name="senderPhone"
                    type="tel"
                    value={formData.senderPhone}
                    onChange={handleInputChange}
                    placeholder="01XXXXXXXXX"
                    required
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Phone number used to send the payment
                  </p>
                </div>

                <div>
                  <Label htmlFor="transactionId">
                    Transaction ID <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="transactionId"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleInputChange}
                    placeholder="Enter transaction ID"
                    required
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Transaction ID received after payment
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                  size="lg"
                >
                  {isSubmitting ? (
                    "Processing..."
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Complete Order
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span className="font-medium">
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
                  <span>Subtotal</span>
                  <span className="font-medium">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Info Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{customerName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{customerEmail}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{customerPhone}</p>
              </div>
            </CardContent>
          </Card>
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
                  <p className="text-muted-foreground">Loading payment page...</p>
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

