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
  Star,
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
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 2,
    title: "সফটওয়্যার লাইসেন্স",
    icon: Sprout,
    url: "/dashboard/software-license",
    color: "from-green-500 to-green-600",
  },
  {
    id: 3,
    title: "ক্রিয়েটিভ টুলস",
    icon: Settings,
    url: "/dashboard/creative-tools",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: 4,
    title: "প্রোডাক্টিভিটি অ্যাপ",
    icon: Zap,
    url: "/dashboard/productivity-apps",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    id: 5,
    title: "লার্নিং প্ল্যাটফর্ম",
    icon: GraduationCap,
    url: "/dashboard/learning-platform",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 6,
    title: "ইউটিলিটি টুলস",
    icon: Search,
    url: "/dashboard/utility-tools",
    color: "from-pink-500 to-pink-600",
  },
];

const secondaryNav = [
  { title: "My Purchases", icon: ShoppingBag, url: "/dashboard/purchases" },
  { title: "My Reviews", icon: Star, url: "/dashboard/reviews" },
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

interface DashboardSidebarProps {
  onNavigate?: () => void;
}

export default function DashboardSidebar({ onNavigate }: DashboardSidebarProps) {
  const [activeItem, setActiveItem] = useState("Dashboard Overview");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleMenuItemClick = (title: string) => {
    setActiveItem(title);
    if (onNavigate) {
      setTimeout(() => onNavigate(), 150);
    }
  };

  const MenuButton = ({ 
    item, 
    isActive, 
    colorClass,
  }: { 
    item: any; 
    isActive: boolean; 
    colorClass?: string;
  }) => {
    const Icon = item.icon;
    return (
      <button
        onClick={() => handleMenuItemClick(item.title)}
        className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 active:scale-[0.98] ${
          isActive
            ? "bg-gradient-primary text-white shadow-md"
            : "text-foreground hover:bg-muted/70 active:bg-muted"
        } ${isCollapsed ? "justify-center" : ""}`}
      >
        {colorClass && !isActive ? (
          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-sm shrink-0`}>
            <Icon className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
          </div>
        ) : (
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
            isActive ? 'bg-white/15' : 'bg-muted/60'
          }`}>
            <Icon className="h-4.5 w-4.5" strokeWidth={2.5} />
          </div>
        )}
        
        {!isCollapsed && (
          <>
            <span className="flex-1 font-semibold text-[13px] text-left leading-tight">
              {item.title}
            </span>
            {item.badge && (
              <Badge 
                variant="destructive" 
                className="h-5 min-w-[20px] px-1.5 text-[10px] font-bold shrink-0"
              >
                {item.badge}
              </Badge>
            )}
          </>
        )}
        {isCollapsed && item.badge && (
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-destructive rounded-full ring-2 ring-background"></div>
        )}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header - Desktop Only */}
      <div className={`hidden lg:flex border-b border-border/50 ${
        isCollapsed ? 'px-2 py-3' : 'px-3 py-3'
      } shrink-0 items-center justify-end`}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 rounded-lg hover:bg-muted transition-all"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Main Content - Scrollable */}
      <div className={`flex-1 overflow-y-auto custom-scrollbar ${
        isCollapsed ? 'px-2 py-3' : 'px-3 py-4'
      }`}>
        {/* Dashboard Overview */}
        <div className="mb-2">
          <Link href="/dashboard/">
            <MenuButton
              item={{
                title: "Dashboard Overview",
                icon: LayoutDashboard,
                url: "/dashboard/",
              }}
              isActive={activeItem === "Dashboard Overview"}
            />
          </Link>
        </div>

        {/* Separator */}
        <div className="h-px bg-border/40 my-3" />

        {/* Main Categories */}
        <div className="mb-3">
          {!isCollapsed && (
            <div className="px-3 mb-2">
              <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                প্রধান ক্যাটাগরি
              </h3>
            </div>
          )}
          <div className="space-y-1">
            {mainCategories.map((category) => (
              <Link key={category.id} href={category.url}>
                <MenuButton
                  item={category}
                  isActive={activeItem === category.title}
                  colorClass={category.color}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-border/40 my-3" />

        {/* Account Section */}
        <div>
          {!isCollapsed && (
            <div className="px-3 mb-2">
              <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                অ্যাকাউন্ট
              </h3>
            </div>
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
      <div className={`border-t border-border/50 ${
        isCollapsed ? 'px-2 py-2.5' : 'px-3 py-3'
      } shrink-0 bg-muted/20`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={`w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted/70 active:bg-muted active:scale-[0.98] transition-all ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <Avatar className="h-9 w-9 ring-2 ring-primary/20 shrink-0">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-gradient-to-br from-orange-500 to-pink-600 text-white text-xs font-bold">
                  JD
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-[13px] font-bold text-foreground truncate leading-tight">
                      John Doe
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      john@example.com
                    </p>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56"
            side="right"
            align="end"
            sideOffset={8}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 px-3 py-3">
                <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-pink-600 text-white text-xs font-bold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">John Doe</p>
                  <p className="text-xs text-muted-foreground truncate">john@example.com</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <User2 className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <CreditCard className="h-4 w-4" />
                <span>Billing</span>
                <Badge className="ml-auto bg-gradient-primary text-white text-xs">
                  Pro
                </Badge>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive cursor-pointer">
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Quick Settings - Desktop Only */}
        {!isCollapsed && (
          <div className="hidden lg:flex gap-2 pt-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-full rounded-lg hover:bg-muted transition-all"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-full rounded-lg hover:bg-muted transition-all"
              asChild
            >
              <Link href="/dashboard/support">
                <HelpCircle className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}