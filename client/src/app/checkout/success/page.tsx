"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Home, Loader2, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const orderNum = searchParams.get("orderNumber");
    const order = searchParams.get("orderId");
    setOrderNumber(orderNum);
    setOrderId(order);
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-12 pb-12">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="rounded-full bg-green-100 dark:bg-green-900 p-4">
                <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-bold">Order Placed Successfully!</h1>
                <p className="text-muted-foreground text-lg">
                  Thank you for your purchase. We've received your order and will process it shortly.
                </p>
              </div>

              {orderNumber && (
                <div className="bg-muted rounded-lg p-4 w-full">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Package className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Order Number</span>
                  </div>
                  <p className="text-2xl font-bold text-center">{orderNumber}</p>
                </div>
              )}

              <div className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">
                  You will receive an email confirmation shortly with your order details.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="outline">
                    <Link href="/dashboard/purchases">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      View My Orders
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="/shop">
                      <Home className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="pt-12 pb-12">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-muted-foreground">Loading order details...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      }
    >

            <CheckoutSuccessContent />

    </Suspense>
  );
}

