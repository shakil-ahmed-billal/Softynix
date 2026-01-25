"use client";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

// Mobile Bottom Sheet Component - 60% height with scrollable background
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
      // Prevent background scroll but keep it visible
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop - 40% visible area (stays scrollable visually) */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
        style={{
          animation: 'fadeIn 0.2s ease-out'
        }}
      />
      
      {/* Bottom Sheet - 60% height */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-background rounded-t-[28px] shadow-2xl flex flex-col overflow-hidden border-t-2 border-primary/20"
        style={{
          height: '60vh',
          animation: 'slideUpSheet 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2 shrink-0 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="w-10 h-1 bg-muted-foreground/40 rounded-full" />
        </div>
        
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-muted/80 hover:bg-destructive/10 hover:text-destructive transition-all shadow-md"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUpSheet {
          from { 
            transform: translateY(100%);
            opacity: 0;
          }
          to { 
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
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
    <div className="min-h-screen bg-background">
      {/* Mobile Header - App-like design */}
      <div className="lg:hidden sticky top-0 z-40 bg-background/98 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="p-4 py-3">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <div className="flex items-center gap-2.5">
              
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold text-gradient">
                  Softynix
                </span>
                <span className="text-[10px] text-muted-foreground font-medium">Dashboard</span>
              </div>
            </div>

            {/* Menu Button */}
            <Button
              onClick={() => setMobileMenuOpen(true)}
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm active:scale-95"
            >
              <Menu className="h-4.5 w-4.5" strokeWidth={2.5} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet - 60% height */}
      <MobileBottomSheet 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
      >
        <DashboardSidebar onNavigate={() => setMobileMenuOpen(false)} />
      </MobileBottomSheet>

      {/* Main Container */}
      <div className="lg:container lg:mx-auto lg:px-6 lg:py-0">
        <div className="flex flex-col lg:flex-row lg:gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-0">
              <div className={` h-[calc(100vh)] overflow-hidden  border border-border/50 shadow-lg bg-background`}>
                <DashboardSidebar />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 lg:p-0 lg:py-6">
            <div className="animate-fade-in">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}