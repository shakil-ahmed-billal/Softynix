"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { useAdminLogout, useLogout } from "@/hooks/useAuth";
import {
  Bell,
  ChevronDown,
  Grid3x3,
  Heart,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Sparkles,
  Store,
  User,
  X,
} from "lucide-react";
import { UseThemeProps, useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ModeToggle } from "../theme/ModeToggle";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getTotalItems, setIsCartOpen } = useCart();
  const cartCount = getTotalItems();
  const [notificationCount] = useState(5);
  const {
    user,
    admin,
    isAuthenticated,
    isAdmin,
    isLoading: authLoading,
    logout: contextLogout,
  } = useAuth();
  const userLogout = useLogout();
  const adminLogout = useAdminLogout();
  const router = useRouter();
  const { theme: themeValue }: UseThemeProps = useTheme();
  const themeLogo =
    themeValue === "light"
      ? "/logo/dark-softynix-logo.png"
      : "/logo/light-softynix-logo.png";

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      if (isAdmin) {
        await adminLogout();
      } else {
        await userLogout();
      }
      contextLogout();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const currentUser = user || admin;
  const displayName = currentUser?.name || "User";
  const displayEmail = currentUser?.email || "";

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Shop", href: "/shop", icon: Store },
    { name: "Categories", href: "/categories", icon: Grid3x3 },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  ];

  return (
    <>
      {/* Top Banner - Desktop Only */}
      <div className="hidden lg:block bg-gradient-primary text-white py-2">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between text-xs font-medium">
            <p className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Free shipping on orders over $50 | Use code: FREESHIP
            </p>
            <div className="flex items-center gap-4">
              <Link href="/track" className="hover:underline transition-all">
                Track Order
              </Link>
              <span className="opacity-40">|</span>
              <Link href="/support" className="hover:underline transition-all">
                Help & Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-background/98 backdrop-blur-xl shadow-lg border-b border-primary/20"
            : "bg-background border-b border-border/50"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          {/* Mobile Header */}
          <div className="flex lg:hidden items-center justify-between h-14 gap-2">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 flex-1 justify-start"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-primary shadow-md glow-primary flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-base text-gradient">
                Softynix
              </span>
            </Link>

            {/* Mobile Actions */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:bg-primary/10 rounded-xl transition-all active:scale-95"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                {isSearchOpen ? (
                  <X className="h-4.5 w-4.5 text-primary" strokeWidth={2.5} />
                ) : (
                  <Search
                    className="h-4.5 w-4.5 text-primary"
                    strokeWidth={2.5}
                  />
                )}
              </Button>

              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 hover:bg-primary/10 rounded-xl transition-all active:scale-95"
                >
                  <ShoppingCart
                    className="h-4.5 w-4.5 text-primary"
                    strokeWidth={2.5}
                  />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-primary text-white text-[10px] flex items-center justify-center font-bold shadow-md">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              {mounted && <ModeToggle />}

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 hover:bg-primary/10 rounded-xl transition-all active:scale-95"
                  >
                    <Menu className="h-5 w-5 text-primary" strokeWidth={2.5} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] p-0">
                  <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="p-5 bg-gradient-primary text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Sparkles className="h-5.5 w-5.5" strokeWidth={2.5} />
                        </div>
                        <div>
                          <h3 className="font-bold text-base leading-tight">
                            Softynix
                          </h3>
                          <p className="text-xs text-white/80">
                            ডিজিটাল মার্কেটপ্লেস
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                      {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-foreground hover:bg-primary/10 hover:text-primary transition-all group active:scale-[0.98]"
                          >
                            <div className="w-9 h-9 rounded-lg bg-muted/60 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                              <Icon
                                className="h-4.5 w-4.5 group-hover:scale-110 transition-transform"
                                strokeWidth={2.5}
                              />
                            </div>
                            <span className="font-semibold text-[13px]">
                              {item.name}
                            </span>
                          </Link>
                        );
                      })}

                      <div className="pt-2 mt-2 border-t border-border/50">
                        <Link
                          href="/wishlist"
                          className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-foreground hover:bg-primary/10 hover:text-primary transition-all active:scale-[0.98]"
                        >
                          <div className="w-9 h-9 rounded-lg bg-muted/60 flex items-center justify-center">
                            <Heart className="h-4.5 w-4.5" strokeWidth={2.5} />
                          </div>
                          <span className="font-semibold text-[13px]">
                            Wishlist
                          </span>
                        </Link>
                        <Link
                          href="/notifications"
                          className="flex items-center justify-between px-3.5 py-3 rounded-xl text-foreground hover:bg-primary/10 hover:text-primary transition-all active:scale-[0.98]"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-muted/60 flex items-center justify-center relative">
                              <Bell className="h-4.5 w-4.5" strokeWidth={2.5} />
                              {notificationCount > 0 && (
                                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary ring-2 ring-background" />
                              )}
                            </div>
                            <span className="font-semibold text-[13px]">
                              Notifications
                            </span>
                          </div>
                          {notificationCount > 0 && (
                            <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold">
                              {notificationCount}
                            </span>
                          )}
                        </Link>
                      </div>
                    </nav>

                    {/* Mobile Menu Footer */}
                    {!authLoading && isAuthenticated && currentUser ? (
                      <div className="p-3 border-t border-border/50 bg-muted/20 space-y-2">
                        <div className="px-2 py-2">
                          <p className="font-bold text-[13px] text-foreground leading-tight">
                            {displayName}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {displayEmail}
                          </p>
                        </div>
                        <Button
                          onClick={handleLogout}
                          variant="ghost"
                          className="w-full justify-start text-destructive hover:bg-destructive/10 h-10 rounded-xl active:scale-[0.98]"
                        >
                          <LogOut className="h-4 w-4 mr-2" strokeWidth={2.5} />
                          <span className="font-semibold text-[13px]">
                            Logout
                          </span>
                        </Button>
                      </div>
                    ) : (
                      <div className="p-3 border-t border-border/50">
                        <Button
                          asChild
                          className="w-full bg-gradient-primary hover:opacity-90 text-white h-11 rounded-xl shadow-md active:scale-[0.98]"
                        >
                          <Link href="/login">
                            <User className="h-4 w-4 mr-2" strokeWidth={2.5} />
                            <span className="font-semibold text-[13px]">
                              Sign In
                            </span>
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between h-16 gap-8">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 flex-shrink-0 group"
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md glow-primary group-hover:shadow-lg transition-all">
                <Sparkles className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-lg text-gradient">
                  Softynix
                </span>
                <span className="text-[10px] text-muted-foreground font-medium">
                  ডিজিটাল মার্কেটপ্লেস
                </span>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative group">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground group-hover:text-primary transition-colors"
                  strokeWidth={2.5}
                />
                <Input
                  type="search"
                  placeholder="Search for products, brands, and more..."
                  className="pl-12 pr-4 h-11 bg-muted/50 border-2 border-border hover:border-primary/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="flex gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavigationMenuItem key={item.name}>
                      <NavigationMenuLink
                        href={item.href}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-all group"
                      >
                        <Icon
                          className="h-4 w-4 group-hover:scale-110 transition-transform"
                          strokeWidth={2.5}
                        />
                        {item.name}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Desktop Actions */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-9 w-9 hover:bg-primary/10 rounded-xl transition-all"
                  >
                    <Bell
                      className="h-4.5 w-4.5 text-foreground"
                      strokeWidth={2.5}
                    />
                    {notificationCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary ring-2 ring-background" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="px-4 py-3 border-b">
                    <p className="font-bold text-sm text-foreground">
                      Notifications
                    </p>
                  </div>
                  <DropdownMenuItem className="py-3 hover:bg-primary/5 cursor-pointer">
                    <div className="flex flex-col gap-1">
                      <span className="text-[13px] font-semibold text-foreground">
                        New order received
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        2 minutes ago
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-3 hover:bg-primary/5 cursor-pointer">
                    <div className="flex flex-col gap-1">
                      <span className="text-[13px] font-semibold text-foreground">
                        Product back in stock
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        1 hour ago
                      </span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Wishlist */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:bg-primary/10 rounded-xl transition-all"
                asChild
              >
                <Link href="/wishlist">
                  <Heart
                    className="h-4.5 w-4.5 text-foreground"
                    strokeWidth={2.5}
                  />
                </Link>
              </Button>

              {/* Cart */}
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 hover:bg-primary/10 rounded-xl transition-all"
                >
                  <ShoppingCart
                    className="h-4.5 w-4.5 text-foreground"
                    strokeWidth={2.5}
                  />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-primary text-white text-[10px] flex items-center justify-center font-bold">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Theme Toggle */}
              {mounted && <ModeToggle />}

              {/* User Account / Login */}
              {!authLoading && isAuthenticated && currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 hover:bg-primary/10 rounded-xl px-3 transition-all h-9"
                    >
                      <div className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold text-[11px]">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                      <ChevronDown
                        className="h-3.5 w-3.5 text-muted-foreground"
                        strokeWidth={2.5}
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-4 py-3 border-b">
                      <p className="font-bold text-[13px] text-foreground leading-tight">
                        {displayName}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {displayEmail}
                      </p>
                      {isAdmin && (
                        <p className="text-[10px] text-primary mt-1 font-bold">
                          {admin?.role === "super_admin"
                            ? "Super Admin"
                            : "Admin"}
                        </p>
                      )}
                    </div>
                    {isAdmin ? (
                      <>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboad-admin"
                            className="cursor-pointer hover:bg-primary/5"
                          >
                            <LayoutDashboard
                              className="mr-2 h-4 w-4 text-primary"
                              strokeWidth={2.5}
                            />
                            Admin Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard"
                            className="cursor-pointer hover:bg-primary/5"
                          >
                            <User
                              className="mr-2 h-4 w-4 text-primary"
                              strokeWidth={2.5}
                            />
                            Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard/purchases"
                            className="cursor-pointer hover:bg-primary/5"
                          >
                            <Package
                              className="mr-2 h-4 w-4 text-primary"
                              strokeWidth={2.5}
                            />
                            Orders
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard/settings"
                            className="cursor-pointer hover:bg-primary/5"
                          >
                            <Settings
                              className="mr-2 h-4 w-4 text-primary"
                              strokeWidth={2.5}
                            />
                            Settings
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive hover:bg-destructive/10 cursor-pointer"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" strokeWidth={2.5} />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : !authLoading ? (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    className="hover:bg-primary/10 transition-all h-9 px-4 rounded-xl text-[13px] font-semibold"
                    asChild
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    className="bg-gradient-primary hover:opacity-90 text-white shadow-md h-9 px-4 rounded-xl text-[13px] font-semibold"
                    asChild
                  >
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 hover:bg-primary/10 rounded-xl"
                      >
                        <Settings className="h-4 w-4" strokeWidth={2.5} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link
                          href="/admin/login"
                          className="cursor-pointer hover:bg-primary/5"
                        >
                          <LayoutDashboard
                            className="mr-2 h-4 w-4 text-primary"
                            strokeWidth={2.5}
                          />
                          Admin Login
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="h-9 w-9" />
              )}
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="lg:hidden py-3 border-t border-border/50 animate-slide-up">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  strokeWidth={2.5}
                />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10 pr-4 h-10 bg-muted/50 border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 text-[13px]"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
