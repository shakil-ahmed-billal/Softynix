"use client";

import { ToolCard } from "@/components/dashboard/ToolCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useState } from "react";
import { useUserPurchases } from "@/hooks/useUserProductAccess";
import { useAuth } from "@/contexts/auth-context";

export default function CreativeToolsPage() {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: purchases = [], isLoading } = useUserPurchases({
    productType: "software_license", // Creative tools are typically software licenses
  });

  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">ক্রিয়েটিভ টুলস</h1>
          <p className="text-muted-foreground">
            Please log in to view your creative tools
          </p>
        </div>
      </div>
    );
  }

  // Filter for creative tools (you may need to adjust this based on your category structure)
  const creativeTools = purchases.filter((p) => 
    p.product.category.name.toLowerCase().includes("creative") ||
    p.product.category.name.toLowerCase().includes("design") ||
    p.productType === "software_license"
  );

  const filtered = creativeTools.filter((t) =>
    t.product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">ক্রিয়েটিভ টুলস</h1>
          <p className="text-muted-foreground">
            Download and manage your creative tools, presets, and resources
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (creativeTools.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">ক্রিয়েটিভ টুলস</h1>
          <p className="text-muted-foreground">
            Download and manage your creative tools, presets, and resources
          </p>
        </div>
        <EmptyState
          title="No Creative Tools Yet"
          description="You haven't purchased any creative tools yet. Browse our collection of presets, UI kits, and design resources."
          ctaText="Browse Creative Tools"
          ctaHref="/shop"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">ক্রিয়েটিভ টুলস</h1>
        <p className="text-muted-foreground">
          Download and manage your creative tools, presets, and resources
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
              categoryId: 3,
            }}
          />
        ))}
      </div>
    </div>
  );
}

