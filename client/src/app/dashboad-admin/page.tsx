"use client";

import { useAdminDashboardStats } from "@/hooks/useAdminDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  FolderTree,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { SimpleChart } from "@/components/dashboard/SimpleChart";

export default function DashboardAdminPage() {
  const { data: stats, isLoading } = useAdminDashboardStats();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Loading statistics...</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your platform statistics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value={stats?.products?.total || 0}
          icon={Package}
          trend={{
            value: `${stats?.products?.active || 0} active`,
            isPositive: true,
          }}
        />
        <StatCard
          title="Categories"
          value={stats?.categories?.total || 0}
          icon={FolderTree}
        />
        <StatCard
          title="Total Orders"
          value={stats?.orders?.total || 0}
          icon={ShoppingCart}
        />
        <StatCard
          title="Total Revenue"
          value={`৳${Number(stats?.revenue?.total || 0).toLocaleString()}`}
          icon={DollarSign}
        />
      </div>

      {/* Charts and Recent Orders */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleChart 
              title="Revenue Overview" 
              data={[
                { label: "This Month", value: stats?.revenue?.total || 0 },
                { label: "Last Month", value: 0 },
              ]} 
            />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.recentOrders && stats.recentOrders.length > 0 ? (
              <div className="space-y-4">
                {stats.recentOrders.slice(0, 5).map((order: any) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customerName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ৳{Number(order.totalAmount).toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No recent orders</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
