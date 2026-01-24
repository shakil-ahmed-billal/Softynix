"use client";

import { useAuth } from "@/contexts/auth-context";
import { useMyOrders } from "@/hooks/useMyOrders";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, ShoppingBag, Package, User, ArrowRight, Sparkles, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const { data: ordersData, isLoading: ordersLoading } = useMyOrders({
    page: 1,
    limit: 5,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  if (!isAuthenticated || !user) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="glass-effect rounded-2xl p-8 md:p-12 text-center border border-border/50">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-6 shadow-lg glow-primary">
            <User className="h-8 w-8 md:h-10 md:w-10 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">Dashboard</h1>
          <p className="text-muted-foreground mb-6">
            অনুগ্রহ করে লগইন করুন আপনার ড্যাশবোর্ড দেখতে
          </p>
          <Button className="bg-gradient-primary text-white shadow-lg glow-primary">
            লগইন করুন
          </Button>
        </div>
      </div>
    );
  }

  const orders = ordersData?.data || [];
  const totalOrders = ordersData?.pagination?.total || 0;
  const totalSpent = orders.reduce(
    (sum, order) => sum + Number(order.totalAmount),
    0
  );
  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;
  const completedOrders = orders.filter(
    (order) => order.status === "delivered" || order.status === "completed"
  ).length;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "delivered":
      case "completed":
        return "default";
      case "cancelled":
        return "destructive";
      case "processing":
      case "shipped":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      

      {/* User Profile Card */}
      <Card className="glass-effect border-border/50 shadow-lg overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        <CardContent className="pt-6 relative">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <Avatar className="h-16 w-16 md:h-20 md:w-20 ring-4 ring-primary/20 shadow-lg">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xl font-bold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <h3 className="text-lg md:text-xl font-bold text-foreground">{user.name}</h3>
              <p className="text-sm md:text-base text-muted-foreground flex items-center gap-2">
                <span>{user.email}</span>
              </p>
              {user.phone && (
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <span>{user.phone}</span>
                </p>
              )}
            </div>
            <div className="flex flex-col items-start md:items-end gap-2 w-full md:w-auto">
              <Badge 
                variant={user.emailVerified ? "default" : "outline"}
                className={user.emailVerified ? "bg-gradient-primary text-white shadow-md" : ""}
              >
                <CheckCircle2 className="h-3 w-3 mr-1" />
                {user.emailVerified ? "Verified" : "Unverified"}
              </Badge>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid - Mobile Optimized */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <div className="glass-effect rounded-xl md:rounded-2xl p-4 md:p-6 border border-border/50 shadow-lg hover:shadow-xl transition-all group">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl md:text-3xl font-bold text-foreground">{totalOrders}</p>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">Total Orders</p>
          </div>
        </div>

        <div className="glass-effect rounded-xl md:rounded-2xl p-4 md:p-6 border border-border/50 shadow-lg hover:shadow-xl transition-all group">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-accent" />
            </div>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-xl md:text-2xl font-bold text-foreground">৳{totalSpent.toLocaleString()}</p>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">Total Spent</p>
          </div>
        </div>

        <div className="glass-effect rounded-xl md:rounded-2xl p-4 md:p-6 border border-border/50 shadow-lg hover:shadow-xl transition-all group">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" />
            </div>
            <Package className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl md:text-3xl font-bold text-foreground">{pendingOrders}</p>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">Pending Orders</p>
          </div>
        </div>

        <div className="glass-effect rounded-xl md:rounded-2xl p-4 md:p-6 border border-border/50 shadow-lg hover:shadow-xl transition-all group">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-green-500" />
            </div>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl md:text-3xl font-bold text-foreground">{completedOrders}</p>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">Completed Orders</p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <Card className="glass-effect border-border/50 shadow-xl overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
        <CardHeader className="relative border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-xl md:text-2xl font-bold flex items-center gap-2">
                <Package className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                Recent Orders
              </CardTitle>
              <p className="text-sm text-muted-foreground">আপনার সাম্প্রতিক অর্ডারের তালিকা</p>
            </div>
            <Link href="/dashboard/purchases">
              <Button variant="outline" className="border-border/50 hover:border-primary hover:bg-primary/5 transition-all shadow-sm w-full md:w-auto">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0 md:p-6 relative">
          {ordersLoading ? (
            <div className="text-center py-12 md:py-16">
              <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-sm md:text-base text-muted-foreground font-medium">Loading orders...</p>
            </div>
          ) : orders.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="font-bold text-xs md:text-sm">Order Number</TableHead>
                    <TableHead className="font-bold text-xs md:text-sm">Date</TableHead>
                    <TableHead className="font-bold text-xs md:text-sm">Items</TableHead>
                    <TableHead className="font-bold text-xs md:text-sm">Total</TableHead>
                    <TableHead className="font-bold text-xs md:text-sm">Status</TableHead>
                    <TableHead className="font-bold text-xs md:text-sm">Payment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-muted/30 transition-colors border-border/50">
                      <TableCell className="font-semibold text-xs md:text-sm">
                        {order.orderNumber}
                      </TableCell>
                      <TableCell className="text-xs md:text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-xs md:text-sm">
                        <Badge variant="outline" className="font-medium">
                          {order.items.length} items
                        </Badge>
                      </TableCell>
                      <TableCell className="font-bold text-xs md:text-sm text-primary">
                        ৳{Number(order.totalAmount).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={getStatusBadgeVariant(order.status)}
                          className="text-xs font-semibold"
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.paymentStatus === "paid"
                              ? "default"
                              : "outline"
                          }
                          className={order.paymentStatus === "paid" ? "bg-gradient-primary text-white" : ""}
                        >
                          {order.paymentStatus}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 md:py-20 animate-scale-in">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-8 w-8 md:h-10 md:w-10 text-muted-foreground" />
              </div>
              <p className="text-base md:text-lg font-bold text-foreground mb-2">No orders yet</p>
              <p className="text-sm text-muted-foreground mb-6">আপনার এখনো কোনো অর্ডার নেই</p>
              <Link href="/shop">
                <Button className="bg-gradient-primary text-white shadow-lg glow-primary hover:opacity-90">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Start Shopping
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}






// {/* Welcome Header */}
// <div className="relative overflow-hidden bg-gradient-primary rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl">
// {/* Decorative Elements */}
// <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-white/10 rounded-full blur-3xl"></div>
// <div className="absolute bottom-0 left-0 w-24 h-24 md:w-32 md:h-32 bg-accent/20 rounded-full blur-2xl"></div>

// <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//   <div className="space-y-2">
//     <div className="flex items-center gap-2">
//       <Sparkles className="h-5 w-5 text-white animate-pulse" />
//       <p className="text-sm md:text-base text-white/90 font-medium">স্বাগতম</p>
//     </div>
//     <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
//       Dashboard Overview
//     </h1>
//     <p className="text-sm md:text-base text-white/90">
//       Welcome back, <span className="font-semibold">{user.name}</span>! এখানে আপনার অ্যাকাউন্টের সারসংক্ষেপ।
//     </p>
//   </div>
  
//   <div className="flex items-center gap-3">
//     <Avatar className="h-14 w-14 md:h-16 md:w-16 ring-4 ring-white/30 shadow-xl">
//       <AvatarImage src={user.avatar} />
//       <AvatarFallback className="bg-gradient-to-br from-orange-500 to-pink-600 text-white text-lg font-bold">
//         {getInitials(user.name)}
//       </AvatarFallback>
//     </Avatar>
//   </div>
// </div>
// </div>