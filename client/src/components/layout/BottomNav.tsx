"use client";

import { Home, ShoppingBag, Grid3X3, LayoutDashboard, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { icon: Home, label: "হোম", id: "home", href: "/" },
  { icon: ShoppingBag, label: "শপ", id: "shop", href: "/shop" },
  { icon: Grid3X3, label: "ক্যাটাগরি", id: "categories", href: "/categories" },
  { icon: LayoutDashboard, label: "ড্যাশবোর্ড", id: "dashboard", href: "/dashboard" },
  { icon: User, label: "অ্যাকাউন্ট", id: "account", href: "/account" },
];

const BottomNav = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Bottom Navigation - Premium Mobile-First Design */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        {/* Main Navigation Container */}
        <div className="relative bg-background/95 backdrop-blur-xl border-t border-primary/10 shadow-[0_-8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_-8px_32px_rgba(0,0,0,0.4)]">
          
          {/* Animated Top Border Gradient */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 animate-pulse" 
               style={{
                 opacity: navItems.some(item => isActive(item.href)) ? 0.6 : 0,
               }} 
          />

          {/* Navigation Items Container */}
          <div className="relative flex items-center justify-around px-2 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="relative flex flex-col items-center justify-center flex-1 min-w-0 group"
                >
                  {/* Active Floating Indicator */}
                  {/* {active && (
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-1 bg-gradient-primary rounded-full shadow-lg animate-scale-in" />
                  )} */}

                  {/* Icon Container with Premium Effects */}
                  <div className="relative mb-1">
                    {/* Active Background Glow */}
                    {active && (
                      <>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-primary blur-xl opacity-40 animate-pulse-glow" />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-primary blur-md opacity-30" />
                      </>
                    )}
                    
                    {/* Icon Background */}
                    <div
                      className={`relative p-2.5 rounded-2xl transition-all duration-300 ${
                        active
                          ? "bg-gradient-primary shadow-lg scale-100"
                          : "bg-transparent group-hover:bg-primary/5 group-active:bg-primary/10"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 transition-all duration-300 ${
                          active
                            ? "text-primary-foreground scale-110"
                            : "text-muted-foreground group-hover:text-primary group-hover:scale-105 group-active:scale-95"
                        }`}
                        strokeWidth={active ? 2.5 : 2}
                      />
                      
                      {/* Active Pulse Ring */}
                      {active && (
                        <div className="absolute inset-0 rounded-2xl border-2 border-primary/20 animate-ping" />
                      )}
                    </div>
                  </div>

                  {/* Label with Better Typography */}
                  <span
                    className={`text-[10px] font-medium transition-all duration-300 text-center leading-tight px-1 ${
                      active
                        ? "text-primary font-bold scale-105"
                        : "text-muted-foreground group-hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Active Bottom Dot Indicator */}
                  {active && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-primary rounded-full shadow-lg shadow-primary/50 animate-pulse" />
                  )}

                  {/* Ripple Effect on Tap (Mobile) */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-primary/10 scale-0 group-active:scale-100 transition-transform duration-300 rounded-full" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Safe Area Padding */}
          <div className="h-[env(safe-area-inset-bottom)] bg-background" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 8px)' }} />
        </div>

        {/* Premium Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </nav>
    </>
  );
};

export default BottomNav;