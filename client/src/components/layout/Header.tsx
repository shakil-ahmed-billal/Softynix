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
import { useCart } from "@/contexts/cart-context";
import {
  Bell,
  Grid3x3,
  Heart,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Store,
  Sun,
  User,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getTotalItems, setIsCartOpen } = useCart();
  const cartCount = getTotalItems();
  const [notificationCount] = useState(5);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "shop", href: "/shop", icon: Store },
    { name: "Categories", href: "/categories", icon: Grid3x3 },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center space-x-2 flex-shrink-0 group"
          >
            <Image
              src={"/logo/headerlogo.png"}
              alt="Header Brand Logo"
              width={150}
              height={50}
              
            />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink
                      href={item.href}
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <Input
                type="search"
                placeholder="Search products, categories..."
                className="pl-10 pr-4 h-10 bg-background border-2 rounded-full focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 border-2 rounded-full">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden relative hover:bg-accent rounded-full transition-all"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-accent rounded-full transition-all hidden sm:flex"
                >
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                      {notificationCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-semibold">Notifications</p>
                </div>
                <DropdownMenuItem className="py-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      New order received
                    </span>
                    <span className="text-xs text-muted-foreground">
                      2 minutes ago
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      Product back in stock
                    </span>
                    <span className="text-xs text-muted-foreground">
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
              className="relative hover:bg-accent rounded-full transition-all hidden sm:flex"
              asChild
            >
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>

            {/* Shopping Cart */}
            <Link href={"/cart"}>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-accent rounded-full transition-all"
                // onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-accent rounded-full transition-all"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* User Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-accent rounded-full transition-all border-l-2"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-medium">My Account</p>
                  <p className="text-xs text-muted-foreground">
                    user@softynix.com
                  </p>
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders" className="cursor-pointer">
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden hover:bg-accent rounded-full transition-all"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-1 mt-8">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium hover:bg-accent transition-all"
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                  <div className="pt-4 border-t mt-4">
                    <Link
                      href="/wishlist"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium hover:bg-accent transition-all"
                    >
                      <Heart className="h-5 w-5" />
                      <span>Wishlist</span>
                    </Link>
                    <Link
                      href="/notifications"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium hover:bg-accent transition-all"
                    >
                      <Bell className="h-5 w-5" />
                      <span>Notifications</span>
                      {notificationCount > 0 && (
                        <span className="ml-auto h-6 w-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                          {notificationCount}
                        </span>
                      )}
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden py-3 border-t animate-in slide-in-from-top-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products, categories..."
                className="pl-10 pr-4 h-10 bg-background border-2 rounded-full"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
