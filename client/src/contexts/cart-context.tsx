"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product, CartItem } from "@/types/product";
import { useAuth } from "./auth-context";
import { useFacebookPixel } from "@/hooks/useFacebookPixel";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";

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
  const { trackAddToCart } = useFacebookPixel();
  const { trackAddToCart: trackGAAddToCart, trackRemoveFromCart: trackGARemoveFromCart } = useGoogleAnalytics();

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
      const updatedItems = existingItem
        ? prevItems.map((item) =>
            String(item.id) === String(product.id)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevItems, { ...product, quantity: 1 }];
      
      // Track AddToCart event for Facebook Pixel and Google Analytics
      const item = updatedItems.find((item) => String(item.id) === String(product.id));
      if (item) {
        // Facebook Pixel tracking
        trackAddToCart({
          value: item.priceValue * item.quantity,
          currency: "BDT",
          content_name: product.title,
          content_ids: [String(product.id)],
          content_type: "product",
          quantity: item.quantity,
        });

        // Google Analytics tracking
        trackGAAddToCart({
          currency: "BDT",
          value: item.priceValue * item.quantity,
          items: [
            {
              item_id: String(product.id),
              item_name: product.title,
              item_category: product.categoryId ? String(product.categoryId) : undefined,
              price: item.priceValue,
              quantity: item.quantity,
            },
          ],
        });
      }
      
      return updatedItems;
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string | number) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => String(item.id) === String(productId));
      
      // Track remove from cart in Google Analytics
      if (itemToRemove) {
        trackGARemoveFromCart({
          currency: "BDT",
          value: itemToRemove.priceValue * itemToRemove.quantity,
          items: [
            {
              item_id: String(itemToRemove.id),
              item_name: itemToRemove.title,
              item_category: itemToRemove.categoryId ? String(itemToRemove.categoryId) : undefined,
              price: itemToRemove.priceValue,
              quantity: itemToRemove.quantity,
            },
          ],
        });
      }
      
      return prevItems.filter((item) => String(item.id) !== String(productId));
    });
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

