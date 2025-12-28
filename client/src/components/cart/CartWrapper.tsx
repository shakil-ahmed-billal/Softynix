"use client";

import { CartProvider } from "@/contexts/cart-context";
import { CartSidebar } from "./CartSidebar";
import { FloatingCartButton } from "./FloatingCartButton";

export function CartWrapper({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartSidebar />
      <FloatingCartButton />
    </CartProvider>
  );
}

