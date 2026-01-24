"use client";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Mobile Header with Menu Button */}
      <div className="lg:hidden sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-3 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-primary shadow-lg glow-primary flex items-center justify-center">
                <span className="text-sm font-bold text-white">S</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Softynix
                </span>
                <span className="text-xs text-muted-foreground">Dashboard</span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-border/50 hover:border-primary hover:bg-primary/5"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="left" 
                className="p-0 w-[280px] border-r border-border/50"
              >
                {/* Mobile Sidebar */}
                <div className="h-full overflow-y-auto">
                  <DashboardSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-3 md:px-4 py-3 md:py-0">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-6">
          {/* Desktop Sidebar - Hidden on Mobile */}
          <div className="hidden lg:block">
            <DashboardSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 py-3 md:py-4 lg:py-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}