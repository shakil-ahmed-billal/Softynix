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
  Store,
  User,
  X,
  ChevronDown,
} from "lucide-react";
import { UseThemeProps, useTheme } from "next-themes";
import Image from "next/image";
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
      <div className="hidden lg:block bg-gradient-to-r from-[hsl(142,76%,36%)] to-[hsl(160,84%,39%)] text-white py-2">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between text-sm">
            <p className="font-medium">
              🎉 Free shipping on orders over $50 | Use code: FREESHIP
            </p>
            <div className="flex items-center gap-4">
              <Link href="/track" className="hover:underline transition-all">
                Track Order
              </Link>
              <span className="opacity-50">|</span>
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
            ? "bg-white/95 dark:bg-[hsl(222.2,84%,4.9%)]/95 backdrop-blur-xl shadow-lg border-b border-[hsl(142,76%,36%)]/20"
            : "bg-white dark:bg-[hsl(222.2,84%,4.9%)] border-b border-gray-200 dark:border-gray-800"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          {/* Mobile Header */}
          <div className="flex lg:hidden items-center justify-between h-16 gap-3">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-[hsl(142,76%,36%)]/10 rounded-lg transition-all"
                >
                  <Menu className="h-6 w-6 text-[hsl(142,76%,36%)]" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="p-6 bg-gradient-to-br from-[hsl(142,76%,36%)] to-[hsl(160,84%,39%)] text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Store className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Softynix</h3>
                        <p className="text-sm text-white/80">Shop with us</p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-[hsl(142,76%,36%)]/10 hover:text-[hsl(142,76%,36%)] transition-all group"
                        >
                          <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      );
                    })}

                    <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                      <Link
                        href="/wishlist"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-[hsl(142,76%,36%)]/10 hover:text-[hsl(142,76%,36%)] transition-all"
                      >
                        <Heart className="h-5 w-5" />
                        <span className="font-medium">Wishlist</span>
                      </Link>
                      <Link
                        href="/notifications"
                        className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-[hsl(142,76%,36%)]/10 hover:text-[hsl(142,76%,36%)] transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <Bell className="h-5 w-5" />
                          <span className="font-medium">Notifications</span>
                        </div>
                        {notificationCount > 0 && (
                          <span className="w-6 h-6 rounded-full bg-[hsl(142,76%,36%)] text-white text-xs flex items-center justify-center font-bold">
                            {notificationCount}
                          </span>
                        )}
                      </Link>
                    </div>
                  </nav>

                  {/* Mobile Menu Footer */}
                  {!authLoading && isAuthenticated && currentUser ? (
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                      <div className="px-2 py-2">
                        <p className="font-medium text-sm text-gray-900 dark:text-white">
                          {displayName}
                        </p>
                        <p className="text-xs text-gray-500">{displayEmail}</p>
                      </div>
                      <Button
                        onClick={handleLogout}
                        variant="ghost"
                        className="w-full justify-start text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-[hsl(142,76%,36%)] to-[hsl(160,84%,39%)] hover:opacity-90 text-white"
                      >
                        <Link href="/login">
                          <User className="h-4 w-4 mr-2" />
                          Sign In
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-1 justify-center">
              <Image
                src={themeLogo}
                alt="Softynix Logo"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="font-bold text-lg bg-gradient-to-r from-[hsl(142,76%,36%)] to-[hsl(160,84%,39%)] bg-clip-text text-transparent">
                Softynix
              </span>
            </Link>

            {/* Mobile Actions */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-[hsl(142,76%,36%)]/10 rounded-lg transition-all"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                {isSearchOpen ? (
                  <X className="h-5 w-5 text-[hsl(142,76%,36%)]" />
                ) : (
                  <Search className="h-5 w-5 text-[hsl(142,76%,36%)]" />
                )}
              </Button>

              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-[hsl(142,76%,36%)]/10 rounded-lg transition-all"
                >
                  <ShoppingCart className="h-5 w-5 text-[hsl(142,76%,36%)]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-[hsl(142,76%,36%)] to-[hsl(160,84%,39%)] text-white text-xs flex items-center justify-center font-bold shadow-lg">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              {mounted && <ModeToggle />}
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between h-20 gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(142,76%,36%)] to-[hsl(160,84%,39%)] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all overflow-hidden">
                <Image
                  src={themeLogo}
                  alt="Softynix Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl bg-gradient-to-r from-[hsl(142,76%,36%)] to-[hsl(160,84%,39%)] bg-clip-text text-transparent">
                  Softynix
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Your Store
                </span>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-[hsl(142,76%,36%)] transition-colors" />
                <Input
                  type="search"
                  placeholder="Search for products, brands, and more..."
                  className="pl-12 pr-4 h-12 bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[hsl(142,76%,36%)] focus:ring-2 focus:ring-[hsl(142,76%,36%)]/20 transition-all"
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
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-[hsl(142,76%,36%)]/10 hover:text-[hsl(142,76%,36%)] transition-all group"
                      >
                        <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
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
                    className="relative hover:bg-[hsl(142,76%,36%)]/10 rounded-lg transition-all"
                  >
                    <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-[hsl(142,76%,36%)] to-[hsl(160,84%,39%)] text-white text-xs flex items-center justify-center font-bold">
                        {notificationCount}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Notifications
                    </p>
                  </div>
                  <DropdownMenuItem className="py-3 hover:bg-[hsl(142,76%,36%)]/5 cursor-pointer">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        New order received
                      </span>
                      <span className="text-xs text-gray-500">2 minutes ago</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-3 hover:bg-[hsl(142,76%,36%)]/5 cursor-pointer">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Product back in stock
                      </span>
                      <span className="text-xs text-gray-500">1 hour ago</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Wishlist */}
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-[hsl(142,76%,36%)]/10 rounded-lg transition-all"
                asChild
              >
                <Link href="/wishlist">
                  <Heart className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </Link>
              </Button>

              {/* Cart */}
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-[hsl(142,76%,36%)]/10 rounded-lg transition-all"
                >
                  <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-[hsl(142,76%,36%)] to-[hsl(160,84%,39%)] text-white text-xs flex items-center justify-center font-bold">
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
                      className="flex items-center gap-2 hover:bg-[hsl(142,76%,36%)]/10 rounded-lg px-3 transition-all"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(142,76%,36%)] to-[hsl(160,84%,39%)] flex items-center justify-center text-white font-semibold text-sm">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-4 py-3 border-b">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {displayName}
                      </p>
                      <p className="text-sm text-gray-500">{displayEmail}</p>
                      {isAdmin && (
                        <p className="text-xs text-[hsl(142,76%,36%)] mt-1 font-medium">
                          {admin?.role === "super_admin" ? "Super Admin" : "Admin"}
                        </p>
                      )}
                    </div>
                    {isAdmin ? (
                      <>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboad-admin"
                            className="cursor-pointer hover:bg-[hsl(142,76%,36%)]/5"
                          >
                            <LayoutDashboard className="mr-2 h-4 w-4 text-[hsl(142,76%,36%)]" />
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
                            className="cursor-pointer hover:bg-[hsl(142,76%,36%)]/5"
                          >
                            <User className="mr-2 h-4 w-4 text-[hsl(142,76%,36%)]" />
                            Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard/purchases"
                            className="cursor-pointer hover:bg-[hsl(142,76%,36%)]/5"
                          >
                            <Package className="mr-2 h-4 w-4 text-[hsl(142,76%,36%)]" />
                            Orders
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard/settings"
                            className="cursor-pointer hover:bg-[hsl(142,76%,36%)]/5"
                          >
                            <Settings className="mr-2 h-4 w-4 text-[hsl(142,76%,36%)]" />
                            Settings
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : !authLoading ? (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    className="hover:bg-[hsl(142,76%,36%)]/10 transition-all"
                    asChild
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-[hsl(142,76%,36%)] to-[hsl(160,84%,39%)] hover:opacity-90 text-white shadow-lg transition-all"
                    asChild
                  >
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-[hsl(142,76%,36%)]/10 rounded-lg"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link
                          href="/admin/login"
                          className="cursor-pointer hover:bg-[hsl(142,76%,36%)]/5"
                        >
                          <LayoutDashboard className="mr-2 h-4 w-4 text-[hsl(142,76%,36%)]" />
                          Admin Login
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="h-10 w-10" />
              )}
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="lg:hidden py-3 border-t animate-in slide-in-from-top-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10 pr-4 h-11 bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[hsl(142,76%,36%)] focus:ring-2 focus:ring-[hsl(142,76%,36%)]/20"
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