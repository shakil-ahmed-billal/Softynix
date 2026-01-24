"use client";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Menu, Sparkles, X } from "lucide-react";
import { useState, useEffect } from "react";

// Mobile Bottom Sheet Component
function MobileBottomSheet({ 
  isOpen, 
  onClose, 
  children 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  children: React.ReactNode 
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl border-t-4 border-primary/20 shadow-2xl animate-slide-up max-h-[88vh] flex flex-col overflow-hidden"
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2 shrink-0 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
        </div>
        
        {/* Close Button - Mobile Only */}
        <div className="absolute top-5 right-5 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-destructive/10 hover:text-destructive transition-all shadow-lg border border-border/50"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {children}
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Mobile Header with Menu Button */}
      <div className="lg:hidden sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 py-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary shadow-lg glow-primary flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Softynix
                </span>
                <span className="text-xs text-muted-foreground font-medium">Dashboard</span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              onClick={() => setMobileMenuOpen(true)}
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-xl border-border/50 hover:border-primary hover:bg-primary/5 transition-all"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      <MobileBottomSheet 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
      >
        <DashboardSidebar onNavigate={() => setMobileMenuOpen(false)} />
      </MobileBottomSheet>

      {/* Main Container */}
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-0">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-6">
          {/* Desktop Sidebar - Hidden on Mobile */}
          <div className="hidden lg:block">
            <div className="sticky top-6">
              <div className="w-72 h-[calc(100vh-48px)] overflow-hidden rounded-2xl border border-border/50 shadow-xl bg-background">
                <DashboardSidebar />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 py-4 lg:py-6">
            <div className="animate-fade-in">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}