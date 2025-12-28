"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product, CartItem } from "@/types/product";
import { useAuth } from "./auth-context";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "softynix_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { isAuthenticated, user } = useAuth();

  // Load cart from storage on mount
  useEffect(() => {
    const loadCart = () => {
      try {
        if (typeof window === "undefined") return;
        
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          // Validate cart items structure
          if (Array.isArray(parsedCart)) {
            setCartItems(parsedCart);
          }
        }
      } catch (error) {
        console.error("Error loading cart from storage:", error);
        // Clear corrupted cart data
        localStorage.removeItem(CART_STORAGE_KEY);
      } finally {
        setIsInitialized(true);
      }
    };

    loadCart();
  }, []);

  // Sync cart when user logs in
  useEffect(() => {
    if (!isInitialized || typeof window === "undefined") return;
    
    // When user logs in, keep localStorage cart (no database sync needed for now)
    // Cart will be cleared after order is placed
    if (isAuthenticated && user) {
      // User is logged in - cart stays in localStorage
      // This ensures cart persists across sessions
    }
  }, [isAuthenticated, user, isInitialized]);

  // Save cart to storage whenever it changes (only after initialization)
  useEffect(() => {
    if (!isInitialized || typeof window === "undefined") return;

    try {
      // Always use localStorage for cart persistence
      // This works for both logged-in and guest users
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to storage:", error);
    }
  }, [cartItems, isInitialized]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => String(item.id) === String(product.id));
      if (existingItem) {
        return prevItems.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string | number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => String(item.id) !== String(productId))
    );
  };

  const updateQuantity = (productId: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        String(item.id) === String(productId) ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = useCallback(() => {
    setCartItems([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.priceValue * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

