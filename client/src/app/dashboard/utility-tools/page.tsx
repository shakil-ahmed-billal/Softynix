"use client";

import { ToolCard } from "@/components/dashboard/ToolCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { utilityTools } from "@/lib/dashboard-data";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function UtilityToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const userTools = utilityTools.filter((t) => t.categoryId === 6);
  const filtered = userTools.filter((t) =>
    t.toolName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (userTools.length === 0) {
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
        {filtered.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}

