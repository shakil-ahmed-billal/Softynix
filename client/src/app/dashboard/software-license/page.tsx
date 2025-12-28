"use client";

import { LicenseCard } from "@/components/dashboard/LicenseCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { softwareLicenses } from "@/lib/dashboard-data";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function SoftwareLicensePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const userLicenses = softwareLicenses.filter((l) => l.categoryId === 2);
  const filtered = userLicenses.filter((l) =>
    l.softwareName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (userLicenses.length === 0) {
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
          <LicenseCard key={license.id} license={license} />
        ))}
      </div>
    </div>
  );
}

