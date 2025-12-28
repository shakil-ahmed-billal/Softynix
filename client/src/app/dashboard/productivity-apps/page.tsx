"use client";

import { ProductivityAppCard } from "@/components/dashboard/ProductivityAppCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { productivityApps } from "@/lib/dashboard-data";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function ProductivityAppsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const userApps = productivityApps.filter((a) => a.categoryId === 4);
  const filtered = userApps.filter((a) =>
    a.appName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (userApps.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">প্রোডাক্টিভিটি অ্যাপ</h1>
          <p className="text-muted-foreground">
            Manage your productivity app subscriptions and access
          </p>
        </div>
        <EmptyState
          title="No Productivity Apps Yet"
          description="You haven't purchased any productivity apps yet. Browse our collection."
          ctaText="Browse Productivity Apps"
          ctaHref="/shop"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">প্রোডাক্টিভিটি অ্যাপ</h1>
        <p className="text-muted-foreground">
          Manage your productivity app subscriptions and access
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search apps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((app) => (
          <ProductivityAppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}

