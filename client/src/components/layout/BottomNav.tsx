"use client"

import { Home, ShoppingBag, Grid3X3, LayoutDashboard, User } from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: Home, label: "হোম", id: "home" },
  { icon: ShoppingBag, label: "শপ", id: "shop" },
  { icon: Grid3X3, label: "ক্যাটাগরি", id: "categories" },
  { icon: LayoutDashboard, label: "ড্যাশবোর্ড", id: "dashboard" },
  { icon: User, label: "অ্যাকাউন্ট", id: "account" },
];

const BottomNav = () => {
  const [active, setActive] = useState("home");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-border/50 pb-safe">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all duration-300 ${
                isActive ? "bg-primary/20 glow-primary" : ""
              }`}>
                <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? "scale-110" : ""}`} />
              </div>
              <span className={`text-xs font-medium transition-all ${isActive ? "text-primary" : ""}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
