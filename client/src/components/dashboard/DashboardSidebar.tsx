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
  Sparkles,
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

export default function DashboardSidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard Overview");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const MenuButton = ({ item, isActive, colorClass }: { item: any; isActive: boolean; colorClass?: string }) => {
    const Icon = item.icon;
    return (
      <button
        onClick={() => setActiveItem(item.title)}
        className={`group w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-300 relative overflow-hidden ${
          isActive
            ? "bg-gradient-primary text-white shadow-lg glow-primary scale-[1.02]"
            : "text-foreground hover:bg-muted/80 hover:scale-[1.01]"
        } ${isCollapsed ? "justify-center" : ""}`}
      >
        {/* Icon with gradient background for category items */}
        {colorClass && !isActive ? (
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-sm shrink-0`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
        ) : (
          <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
        )}
        
        {!isCollapsed && (
          <>
            <span className="flex-1 font-medium text-sm text-left leading-tight">
              {item.title}
            </span>
            {item.badge && (
              <Badge 
                variant="destructive" 
                className="h-5 px-1.5 text-xs font-bold animate-pulse shadow-sm shrink-0"
              >
                {item.badge}
              </Badge>
            )}
            {isActive && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full shadow-lg"></div>
            )}
          </>
        )}
        {isCollapsed && item.badge && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
        )}
      </button>
    );
  };

  return (
    <aside
      className={`lg:border-r border-border/50 transition-all duration-300 ease-in-out shrink-0 lg:shadow-xl ${
        isCollapsed ? "w-20" : "w-full lg:w-72"
      } h-full lg:h-[calc(100vh)] lg:sticky top-0 overflow-hidden`}
    >
      <div className="flex flex-col h-full relative">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-20 left-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none"></div>

        {/* Header - Hidden on Mobile (shown in layout) */}
        <div className="hidden lg:block relative border-b border-border/50 px-3 py-4 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center justify-between mb-2">
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-primary shadow-lg glow-primary flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Softynix
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">Dashboard</span>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all ${
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
        <div className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar relative">
          {/* Dashboard Overview */}
          <div className="mb-3">
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
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-3" />

          {/* Main Categories */}
          <div className="mb-3">
            {!isCollapsed && (
              <div className="flex items-center gap-2 px-3 mb-2">
                <div className="h-1 w-1 rounded-full bg-primary animate-pulse"></div>
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Main Categories
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
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
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-3" />

          {/* Account Section */}
          <div>
            {!isCollapsed && (
              <div className="flex items-center gap-2 px-3 mb-2">
                <div className="h-1 w-1 rounded-full bg-accent animate-pulse"></div>
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Account
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
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

          {/* Bottom Spacing for Mobile */}
          <div className="h-20 lg:h-4"></div>
        </div>

        {/* Footer */}
        <div className="relative border-t border-border/50 p-3 bg-gradient-to-r from-muted/30 to-transparent">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-muted/80 transition-all duration-300 group ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <Avatar className="h-9 w-9 ring-2 ring-primary/30 group-hover:ring-primary/50 shrink-0 transition-all shadow-md">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-pink-600 text-white text-sm font-bold">
                    JD
                  </AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">
                        John Doe
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        john@example.com
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                  </>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 glass-effect border-border/50 shadow-xl"
              side="top"
              align="end"
              sideOffset={8}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-3 px-3 py-3 bg-gradient-to-r from-primary/5 to-transparent">
                  <Avatar className="h-10 w-10 ring-2 ring-primary/30">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="bg-gradient-to-br from-orange-500 to-pink-600 text-white text-sm font-bold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">John Doe</p>
                    <p className="text-xs text-muted-foreground truncate">john@example.com</p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuGroup>
                <DropdownMenuItem className="gap-2 cursor-pointer transition-colors">
                  <User2 className="h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer transition-colors">
                  <CreditCard className="h-4 w-4" />
                  <span>Billing</span>
                  <Badge className="ml-auto bg-gradient-primary text-white shadow-sm">
                    Pro
                  </Badge>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer transition-colors">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer transition-colors">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer">
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Quick Settings */}
          {!isCollapsed && (
            <div className="flex gap-2 pt-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-full hover:bg-primary/10 hover:text-primary transition-all"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-full hover:bg-accent/10 hover:text-accent transition-all"
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