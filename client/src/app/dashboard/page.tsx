"use client";

import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { SimpleChart } from "@/components/dashboard/SimpleChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { dashboardStats } from "@/lib/dashboard-data";
import { Calendar, DollarSign, ShoppingBag, Zap } from "lucide-react";

export default function DashboardPage() {
  const categoryData = [
    { label: "AI Subscriptions", value: 2 },
    { label: "Software Licenses", value: 2 },
    { label: "Creative Tools", value: 2 },
    { label: "Courses", value: 2 },
  ];

  const statusData = [
    { label: "Active", value: 6 },
    { label: "Expired", value: 2 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your account summary.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Subscriptions"
          value={dashboardStats.totalActiveSubscriptions}
          icon={Zap}
          trend={{ value: "+2 this month", isPositive: true }}
        />
        <StatCard
          title="Total Purchases"
          value={dashboardStats.totalPurchases}
          icon={ShoppingBag}
        />
        <StatCard
          title="Upcoming Expiry"
          value={dashboardStats.upcomingExpiry}
          icon={Calendar}
          trend={{ value: "Next 30 days", isPositive: false }}
        />
        <StatCard
          title="Monthly Spend"
          value={`৳${dashboardStats.monthlySpend.toLocaleString()}`}
          icon={DollarSign}
        />
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SimpleChart
            title="Category-wise Purchases"
            data={categoryData}
            type="bar"
          />
        </div>
        <div>
          <SimpleChart
            title="Subscription Status"
            data={statusData}
            type="pie"
          />
        </div>
      </div>

      {/* Activity Feed */}
      <ActivityFeed activities={dashboardStats.recentActivities} />
    </div>
  );
}
