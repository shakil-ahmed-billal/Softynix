"use client";

import { LicenseCard } from "@/components/dashboard/LicenseCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useState } from "react";
import { useSoftwareLicenses } from "@/hooks/useUserProductAccess";
import { useAuth } from "@/contexts/auth-context";

export default function SoftwareLicensePage() {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: licenses = [], isLoading } = useSoftwareLicenses();

  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">সফটওয়্যার লাইসেন্স</h1>
          <p className="text-muted-foreground">
            Please log in to view your software licenses
          </p>
        </div>
      </div>
    );
  }

  const filtered = licenses.filter((l) =>
    l.product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">সফটওয়্যার লাইসেন্স</h1>
          <p className="text-muted-foreground">
            Manage your software licenses and activation keys
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (licenses.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">সফটওয়্যার লাইসেন্স</h1>
          <p className="text-muted-foreground">
            Manage your software licenses and activation keys
          </p>
        </div>
        <EmptyState
          title="No Software Licenses Yet"
          description="You haven't purchased any software licenses yet. Browse our software collection."
          ctaText="Browse Software"
          ctaHref="/shop"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">সফটওয়্যার লাইসেন্স</h1>
        <p className="text-muted-foreground">
          Manage your software licenses and activation keys
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search licenses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Licenses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((license) => (
          <LicenseCard
            key={license.id}
            license={{
              id: license.id,
              softwareName: license.product.name,
              version: "1.0",
              licenseKey: license.licenseKey || "",
              activationStatus: license.status === "active" ? "activated" : "pending",
              deviceLimit: 1,
              expiryDate: license.expiresAt || undefined,
              downloadUrl: license.downloadUrl || undefined,
              categoryId: 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

