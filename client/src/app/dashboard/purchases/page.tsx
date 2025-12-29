"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useUserPurchases } from "@/hooks/useUserProductAccess";
import { useAuth } from "@/contexts/auth-context";
import { EmptyState } from "@/components/dashboard/EmptyState";

const getProductTypeHref = (productType: string) => {
  const typeMap: Record<string, string> = {
    ai_subscription: "/dashboard/ai-subscription",
    software_license: "/dashboard/software-license",
    productivity_app: "/dashboard/productivity-apps",
    course: "/dashboard/learning-platform",
  };
  return typeMap[productType] || "/dashboard/purchases";
};

export default function PurchasesPage() {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  
  const { data: purchases, isLoading } = useUserPurchases({
    page,
    limit: 20,
    search: searchQuery || undefined,
  });

  console.log(purchases)
  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Purchases</h1>
          <p className="text-muted-foreground">
            Please log in to view your purchases
          </p>
        </div>
      </div>
    );
  }

  const filtered = purchases?.filter((p) =>
    p.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Purchases</h1>
        <p className="text-muted-foreground">
          View all your purchased products and subscriptions
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search purchases..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Purchases List */}
      {isLoading ? (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No Purchases Yet"
          description="You haven't purchased any products yet. Browse our shop and make your first purchase."
          ctaText="Browse Shop"
          ctaHref="/shop"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filtered.map((purchase) => (
                <Link
                  key={purchase.id}
                  href={getProductTypeHref(purchase.productType)}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{purchase.product.name}</p>
                      <Badge
                        variant={
                          purchase.status === "active" ? "default" : "secondary"
                        }
                      >
                        {purchase.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {purchase.product.category.name} •{" "}
                      {new Date(purchase.order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ৳{Number(purchase.order.totalAmount).toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

