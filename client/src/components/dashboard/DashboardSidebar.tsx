"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import {
  Bell,
  Brain,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  Shield,
  ShoppingBag,
  Sprout,
  User,
  User2,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const mainCategories = [
  {
    id: 1,
    title: "AI সাবস্ক্রিপশন",
    icon: Brain,
    url: "/dashboard/ai-subscription",
  },
  {
    id: 2,
    title: "সফটওয়্যার লাইসেন্স",
    icon: Sprout,
    url: "/dashboard/software-license",
  },
  {
    id: 3,
    title: "ক্রিয়েটিভ টুলস",
    icon: Settings,
    url: "/dashboard/creative-tools",
  },
  {
    id: 4,
    title: "প্রোডাক্টিভিটি অ্যাপ",
    icon: Zap,
    url: "/dashboard/productivity-apps",
  },
  {
    id: 5,
    title: "লার্নিং প্ল্যাটফর্ম",
    icon: GraduationCap,
    url: "/dashboard/learning-platform",
  },
  {
    id: 6,
    title: "ইউটিলিটি টুলস",
    icon: Search,
    url: "/dashboard/utility-tools",
  },
];

const secondaryNav = [
  { title: "My Purchases", icon: ShoppingBag, url: "/dashboard/purchases" },
  { title: "Billing & Cards", icon: CreditCard, url: "/dashboard/billing" },
  { title: "Profile", icon: User, url: "/dashboard/profile" },
  { title: "Security", icon: Shield, url: "/dashboard/security" },
  {
    title: "Notifications",
    icon: Bell,
    url: "/dashboard/notifications",
    badge: 3,
  },
];

export default function DashboardSidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard Overview");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const MenuButton = ({ item, isActive }: { item: any; isActive: boolean }) => {
    const Icon = item.icon;
    return (
      <button
        onClick={() => setActiveItem(item.title)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-primary text-primary-foreground shadow-md"
            : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
        } ${isCollapsed ? "justify-center" : ""}`}
      >
        <Icon className="h-5 w-5 shrink-0" />
        {!isCollapsed && (
          <>
            <span className="flex-1 font-medium text-sm text-left">
              {item.title}
            </span>
            {item.badge && (
              <Badge variant="destructive" className="h-5 px-1.5 text-xs">
                {item.badge}
              </Badge>
            )}
          </>
        )}
      </button>
    );
  };

  return (
    <aside
      className={`f border-r border-l transition-all duration-300 ease-in-out hrink-0 bg-background space-y-6 overflow-y-auto h-[calc(100vh)] sticky top-16 ${
        isCollapsed ? "w-22" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-slate-800 px-3 py-3">
          <div className="flex items-center justify-between mb-2">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">
                    S
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">
                    Softynix
                  </span>
                  <span className="text-xs text-slate-400">Dashboard</span>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800 ${
                isCollapsed ? "mx-auto" : ""
              }`}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto px-2 py-4">
          {/* Dashboard Overview */}
          <div className="mb-4">
            <MenuButton
              item={{
                title: "Dashboard Overview",
                icon: LayoutDashboard,
                url: "/dashboard/",
              }}
              isActive={activeItem === "Dashboard Overview"}
            />
          </div>

          {/* Separator */}
          <div className="h-px bg-slate-800 my-4" />

          {/* Main Categories */}
          <div className="mb-4">
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-3">
                Main Categories
              </h3>
            )}
            <div className="space-y-1">
              {mainCategories.map((category) => (
                <Link key={category.id} href={category.url}>
                  <MenuButton
                    key={category.id}
                    item={category}
                    isActive={activeItem === category.title}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Separator */}
          <div className="h-px bg-slate-800 my-4" />

          {/* Account Section */}
          <div>
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-3">
                Account
              </h3>
            )}
            <div className="space-y-1">
              {secondaryNav.map((item) => (
                <Link key={item.title} href={item.url}>
                  <MenuButton
                    item={item}
                    isActive={activeItem === item.title}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <Avatar className="h-8 w-8 ring-2 ring-primary/20 shrink-0">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-pink-600 text-white text-sm font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-semibold text-white truncate">
                        John Doe
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        john@example.com
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 shrink-0" />
                  </>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-slate-900 border-slate-800"
              side="top"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-2 py-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="bg-gradient-to-br from-orange-500 to-pink-600 text-white text-sm">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">John Doe</p>
                    <p className="text-xs text-slate-400">john@example.com</p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-800" />
              <DropdownMenuGroup>
                <DropdownMenuItem className="gap-2 text-slate-300 focus:text-white focus:bg-slate-800">
                  <User2 className="h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-slate-300 focus:text-white focus:bg-slate-800">
                  <CreditCard className="h-4 w-4" />
                  <span>Billing</span>
                  <Badge
                    variant="secondary"
                    className="ml-auto h-5 px-1.5 text-xs"
                  >
                    Pro
                  </Badge>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-slate-300 focus:text-white focus:bg-slate-800">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-slate-300 focus:text-white focus:bg-slate-800">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-slate-800" />
              <DropdownMenuItem className="gap-2 text-red-400 focus:text-red-400 focus:bg-red-500/10">
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Quick Settings */}
          {!isCollapsed && (
            <div className="flex gap-1 pt-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <Link href={"/dashboard/support"}>
                  <HelpCircle className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
