"use client";

import { ToolCard } from "@/components/dashboard/ToolCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useState } from "react";
import { useUserPurchases } from "@/hooks/useUserProductAccess";
import { useAuth } from "@/contexts/auth-context";

export default function UtilityToolsPage() {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: purchases = [], isLoading } = useUserPurchases({
    productType: "software_license",
  });

  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">ইউটিলিটি টুলস</h1>
          <p className="text-muted-foreground">
            Please log in to view your utility tools
          </p>
        </div>
      </div>
    );
  }

  // Filter for utility tools
  const utilityTools = purchases.filter((p) => 
    p.product.category.name.toLowerCase().includes("utility") ||
    p.product.category.name.toLowerCase().includes("tool") ||
    p.productType === "software_license"
  );

  const filtered = utilityTools.filter((t) =>
    t.product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">ইউটিলিটি টুলস</h1>
          <p className="text-muted-foreground">
            Download and manage your utility tools and software
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (utilityTools.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">ইউটিলিটি টুলস</h1>
          <p className="text-muted-foreground">
            Download and manage your utility tools and software
          </p>
        </div>
        <EmptyState
          title="No Utility Tools Yet"
          description="You haven't purchased any utility tools yet. Browse our collection."
          ctaText="Browse Utility Tools"
          ctaHref="/shop"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">ইউটিলিটি টুলস</h1>
        <p className="text-muted-foreground">
          Download and manage your utility tools and software
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((purchase) => (
          <ToolCard
            key={purchase.id}
            tool={{
              id: purchase.id,
              toolName: purchase.product.name,
              downloadUrl: purchase.downloadUrl || "#",
              licenseType: purchase.product.category?.name || "Standard",
              fileSize: "N/A",
              lastUpdate: new Date().toISOString(),
              categoryId: 6,
            }}
          />
        ))}
      </div>
    </div>
  );
}

