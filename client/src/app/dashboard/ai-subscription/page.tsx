"use client";

import { EmptyState } from "@/components/dashboard/EmptyState";
import { SubscriptionCard } from "@/components/dashboard/SubscriptionCard";
import { Input } from "@/components/ui/input";
import { subscriptions } from "@/lib/dashboard-data";
import { Search } from "lucide-react";
import { useState } from "react";

export default function AISubscriptionPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const userSubscriptions = subscriptions.filter((s) => s.categoryId === 1);
  const activeSubscriptions = userSubscriptions.filter(
    (s) => s.status === "active"
  );
  const expiredSubscriptions = userSubscriptions.filter(
    (s) => s.status === "expired"
  );

  const filteredActive = activeSubscriptions.filter((s) =>
    s.appName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredExpired = expiredSubscriptions.filter((s) =>
    s.appName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (userSubscriptions.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI সাবস্ক্রিপশন</h1>
          <p className="text-muted-foreground">
            Manage your AI tool subscriptions and access credentials
          </p>
        </div>
        <EmptyState
          title="No AI Subscriptions Yet"
          description="You haven't purchased any AI subscriptions yet. Browse our AI tools and start your subscription."
          ctaText="Browse AI Tools"
          ctaHref="/shop"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">AI সাবস্ক্রিপশন</h1>
        <p className="text-muted-foreground">
          Manage your AI tool subscriptions and access credentials
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search subscriptions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Active Subscriptions */}
      {filteredActive.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Active Subscriptions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActive.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
              />
            ))}
          </div>
        </div>
      )}

      {/* Expired Subscriptions */}
      {filteredExpired.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold  mb-4">Expired Subscriptions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExpired.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
