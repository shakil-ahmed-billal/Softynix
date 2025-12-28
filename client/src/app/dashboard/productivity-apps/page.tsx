"use client";

import { ProductivityAppCard } from "@/components/dashboard/ProductivityAppCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useState } from "react";
import { useProductivityApps } from "@/hooks/useUserProductAccess";
import { useAuth } from "@/contexts/auth-context";

export default function ProductivityAppsPage() {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: apps = [], isLoading } = useProductivityApps();

  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">প্রোডাক্টিভিটি অ্যাপ</h1>
          <p className="text-muted-foreground">
            Please log in to view your productivity apps
          </p>
        </div>
      </div>
    );
  }

  const filtered = apps.filter((a) =>
    a.product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">প্রোডাক্টিভিটি অ্যাপ</h1>
          <p className="text-muted-foreground">
            Manage your productivity app subscriptions and access
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (apps.length === 0) {
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
          <ProductivityAppCard
            key={app.id}
            app={{
              id: app.id,
              appName: app.product.name,
              loginInfo: {
                email: app.email || "",
                password: app.password || "",
              },
              expiryDate: app.expiresAt || undefined,
              isLifetime: !app.expiresAt,
              workspaceLink: app.accessUrl || undefined,
              accessLink: app.accessUrl || undefined,
              categoryId: 4,
            }}
          />
        ))}
      </div>
    </div>
  );
}

