"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRecentOrders } from "@/hooks/useRecentOrders";
import { 
  ChevronRight, 
  Clock, 
  ShoppingBag, 
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Package,
  Sparkles
} from "lucide-react";
import Link from "next/link";

// Status configuration with colors and icons
const statusConfig = {
  pending: {
    label: "অপেক্ষমাণ",
    gradient: "from-yellow-500 to-orange-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    text: "text-yellow-600 dark:text-yellow-400",
    icon: Clock,
  },
  processing: {
    label: "প্রক্রিয়াধীন",
    gradient: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-600 dark:text-blue-400",
    icon: Package,
  },
  completed: {
    label: "সম্পন্ন",
    gradient: "from-green-500 to-emerald-500",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    text: "text-green-600 dark:text-green-400",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "বাতিল",
    gradient: "from-red-500 to-pink-500",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    text: "text-red-600 dark:text-red-400",
    icon: AlertCircle,
  },
};

export default function RecentOrders() {
  const { data, isLoading } = useRecentOrders(5);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "এইমাত্র";
    if (diffInHours < 24) return `${diffInHours} ঘন্টা`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} দিন`;
    return date.toLocaleDateString("bn-BD", { month: 'short', day: 'numeric' });
  };

  const getStatusConfig = (status: string) => {
    return statusConfig[status.toLowerCase() as keyof typeof statusConfig] || statusConfig.pending;
  };

  return (
    <section className="relative py-6 md:py-10 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6 animate-fade-in">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-1 h-6 md:h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
            <div className="flex items-center gap-2">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">
                সাম্প্রতিক অর্ডার
              </h2>
              <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full">
                <TrendingUp className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary" />
                <span className="text-[10px] md:text-xs font-semibold text-primary">LIVE</span>
              </div>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-primary hover:text-primary/80 gap-1 hover:gap-2 transition-all text-xs md:text-sm font-semibold px-2 md:px-3"
            asChild
          >
            <Link href="/dashboard-admin/orders">
              <span className="hidden sm:inline">View All</span>
              <span className="sm:hidden">সব</span>
              <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile & Desktop Table */}
        <Card className="bg-card/80 backdrop-blur-sm border-border/50 rounded-xl md:rounded-2xl overflow-hidden animate-fade-in shadow-lg">
          <CardContent className="p-0">
            <div className="overflow-x-auto custom-scrollbar">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/50 bg-muted/30">
                    <TableHead className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase py-3 md:py-4 px-3 md:px-6">
                      নাম
                    </TableHead>
                    <TableHead className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase py-3 md:py-4 px-2 md:px-4">
                      সময়
                    </TableHead>
                    <TableHead className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase py-3 md:py-4 px-2 md:px-4">
                      স্ট্যাটাস
                    </TableHead>
                    <TableHead className="text-right text-[10px] md:text-xs font-bold text-muted-foreground uppercase py-3 md:py-4 px-3 md:px-6">
                      পরিমাণ
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    // Loading Skeleton
                    [...Array(3)].map((_, i) => (
                      <TableRow key={i} className="border-border/30">
                        <TableCell className="py-3 md:py-4 px-3 md:px-6">
                          <div className="h-4 md:h-5 bg-muted/50 rounded animate-pulse w-24 md:w-32" />
                        </TableCell>
                        <TableCell className="py-3 md:py-4 px-2 md:px-4">
                          <div className="h-4 md:h-5 bg-muted/50 rounded animate-pulse w-16 md:w-20" />
                        </TableCell>
                        <TableCell className="py-3 md:py-4 px-2 md:px-4">
                          <div className="h-6 md:h-7 bg-muted/50 rounded-lg animate-pulse w-16 md:w-24" />
                        </TableCell>
                        <TableCell className="py-3 md:py-4 px-3 md:px-6">
                          <div className="h-4 md:h-5 bg-muted/50 rounded animate-pulse w-16 md:w-20 ml-auto" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : data && data.length > 0 ? (
                    data.map((order, index) => {
                      const config = getStatusConfig(order.status);
                      const StatusIcon = config.icon;
                      
                      return (
                        <TableRow
                          key={order.id}
                          className="hover:bg-primary/5 transition-all duration-300 border-border/30 group animate-slide-up"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          {/* Name Column */}
                          <TableCell className="font-semibold text-foreground group-hover:text-primary transition-colors py-3 md:py-4 px-3 md:px-6">
                            <div className="flex items-center gap-2">
                              <div className={`hidden md:flex p-1.5 md:p-2 rounded-lg bg-gradient-to-br ${config.gradient} shadow-md`}>
                                <ShoppingBag className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" strokeWidth={2.5} />
                              </div>
                              <span className="text-xs md:text-sm truncate max-w-[80px] md:max-w-none">
                                {order.customerName}
                              </span>
                            </div>
                          </TableCell>
                          
                          {/* Time Column */}
                          <TableCell className="text-muted-foreground py-3 md:py-4 px-2 md:px-4">
                            <div className="flex items-center gap-1 md:gap-1.5">
                              <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                              <span className="text-[10px] md:text-sm whitespace-nowrap">
                                {formatTime(order.createdAt)}
                              </span>
                            </div>
                          </TableCell>
                          
                          {/* Status Column */}
                          <TableCell className="py-3 md:py-4 px-2 md:px-4">
                            <Badge 
                              className={`${config.bg} ${config.border} ${config.text} border font-medium text-[9px] md:text-xs px-1.5 md:px-2.5 py-0.5 md:py-1 rounded-md md:rounded-lg flex items-center gap-1 w-fit`}
                            >
                              <StatusIcon className="w-2.5 h-2.5 md:w-3 md:h-3 flex-shrink-0" />
                              <span className="hidden sm:inline">{config.label}</span>
                            </Badge>
                          </TableCell>
                          
                          {/* Amount Column */}
                          <TableCell className="text-right py-3 md:py-4 px-3 md:px-6">
                            <div className="flex flex-col items-end">
                              <span className="font-bold text-primary text-xs md:text-base lg:text-lg whitespace-nowrap">
                                ৳{Number(order.totalAmount).toLocaleString()}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 md:py-12">
                        <div className="flex flex-col items-center gap-3">
                          <div className="p-3 md:p-4 bg-muted/50 rounded-full">
                            <ShoppingBag className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground" />
                          </div>
                          <p className="text-xs md:text-sm text-muted-foreground">কোনো অর্ডার পাওয়া যায়নি</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Stats */}
        {data && data.length > 0 && (
          <div className="mt-4 md:mt-6 flex items-center justify-center gap-2 text-xs md:text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
            <span>সর্বশেষ <span className="font-bold text-foreground">{data.length}</span> টি অর্ডার</span>
          </div>
        )}
      </div>
    </section>
  );
}