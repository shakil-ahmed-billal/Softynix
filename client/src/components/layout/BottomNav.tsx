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
      {/* Spacer to prevent content from being hidden behind bottom nav */}
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/80 dark:bg-[hsl(222.2,84%,4.9%)]/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-safe">
        {/* Active Indicator Background */}
        <div className="absolute top-0 left-0 right-0 h-full pointer-events-none">
          {navItems.map((item) => {
            const active = isActive(item.href);
            if (!active) return null;
            
            const position = navItems.findIndex((i) => i.id === item.id);
            const percentage = (position / (navItems.length - 1)) * 100;
            
            return (
              <div
                key={item.id}
                className="absolute top-0 h-full transition-all duration-300 ease-out"
                style={{
                  left: `${percentage}%`,
                  width: `${100 / navItems.length}%`,
                  transform: "translateX(0)",
                }}
              >
              </div>
            );
          })}
        </div>

        {/* Navigation Items */}
        <div className="relative flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                className="relative flex flex-col items-center justify-center gap-1 px-3 py-2 flex-1 group"
              >
                {/* Active Top Indicator */}
                {active && (
                  <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-[hsl(142,76%,36%)] to-[hsl(160,84%,39%)] rounded-full shadow-lg" />
                )}

                {/* Icon Container */}
                <div
                  className={`relative p-2 rounded-xl transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-br from-[hsl(142,76%,36%)] to-[hsl(160,84%,39%)] shadow-lg"
                      : "bg-transparent group-hover:bg-[hsl(142,76%,36%)]/10"
                  }`}
                >
                  {/* Glow Effect for Active */}
                  {active && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[hsl(142,76%,36%)] to-[hsl(160,84%,39%)] blur-md opacity-50" />
                  )}

                  <Icon
                    className={`relative w-5 h-5 transition-all duration-300 ${
                      active
                        ? "text-white scale-110"
                        : "text-gray-600 dark:text-gray-400 group-hover:text-[hsl(142,76%,36%)] group-hover:scale-105"
                    }`}
                    strokeWidth={active ? 2.5 : 2}
                  />
                </div>

                {/* Label */}
                <span
                  className={`text-xs font-medium transition-all duration-300 ${
                    active
                      ? "text-[hsl(142,76%,36%)] font-semibold"
                      : "text-gray-600 dark:text-gray-400 group-hover:text-[hsl(142,76%,36%)]"
                  }`}
                >
                  {item.label}
                </span>

                {/* Active Dot Indicator */}
                {active && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[hsl(142,76%,36%)] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom Safe Area Background */}
        <div className="h-safe bg-white dark:bg-[hsl(222.2,84%,4.9%)]" />
      </nav>
    </>
  );
};

export default BottomNav;