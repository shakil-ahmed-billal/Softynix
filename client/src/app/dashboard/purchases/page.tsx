"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const allPurchases = [
  {
    id: "1",
    productName: "ChatGPT Plus",
    category: "AI Subscription",
    purchaseDate: "2024-01-15",
    amount: "৳1,100",
    status: "active",
    href: "/dashboard/ai-subscription",
  },
  {
    id: "2",
    productName: "Microsoft Office 2021 Pro",
    category: "Software License",
    purchaseDate: "2024-01-10",
    amount: "৳1,000",
    status: "active",
    href: "/dashboard/software-license",
  },
  {
    id: "3",
    productName: "Complete Web Development Course",
    category: "Learning Platform",
    purchaseDate: "2024-01-05",
    amount: "৳2,500",
    status: "active",
    href: "/dashboard/learning-platform",
  },
];

export default function PurchasesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const filtered = allPurchases.filter((p) =>
    p.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <Card>
        <CardHeader>
          <CardTitle>All Purchases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filtered.map((purchase) => (
              <Link
                key={purchase.id}
                href={purchase.href}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{purchase.productName}</p>
                    <Badge variant="default">{purchase.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {purchase.category} •{" "}
                    {new Date(purchase.purchaseDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{purchase.amount}</p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

