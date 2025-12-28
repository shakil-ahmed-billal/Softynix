"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  FolderTree,
  LayoutDashboard,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  Users,
  X,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboad-admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/dashboad-admin/products",
    icon: Package,
  },
  {
    title: "Categories",
    href: "/dashboad-admin/categories",
    icon: FolderTree,
  },
  {
    title: "Pending Orders",
    href: "/dashboad-admin/pending-orders",
    icon: Clock,
  },
  {
    title: "Orders",
    href: "/dashboad-admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Users",
    href: "/dashboad-admin/users",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/dashboad-admin/settings",
    icon: Settings,
  },
];

export default function DashboardAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden border-b bg-card sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:sticky top-0 left-0 z-40 h-screen w-64 border-r bg-card transition-transform duration-300",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          <div className="flex flex-col h-full">
            {/* Logo/Title */}
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold hidden lg:block">Admin Panel</h2>
              <h2 className="text-lg font-bold lg:hidden">Admin</h2>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        isActive && "bg-secondary"
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.title}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            <Separator />

            {/* Footer */}
            <div className="p-4">
              <p className="text-xs text-muted-foreground">
                Softynix Admin Panel
              </p>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
