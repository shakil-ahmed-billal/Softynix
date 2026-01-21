"use client";

import { useCallback } from "react";

/**
 * Hook for tracking Google Analytics 4 events
 * Usage:
 * const { trackEvent, trackPurchase, trackAddToCart } = useGoogleAnalytics();
 */
export function useGoogleAnalytics() {
  const trackEvent = useCallback(
    (eventName: string, parameters?: Record<string, any>) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", eventName, parameters);
      }
    },
    []
  );

  const trackPageView = useCallback(
    (url: string, title?: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "", {
          page_path: url,
          page_title: title || document.title,
        });
      }
    },
    []
  );

  const trackPurchase = useCallback(
    (params: {
      transaction_id: string;
      value: number;
      currency: string;
      items: Array<{
        item_id: string;
        item_name: string;
        item_category?: string;
        price: number;
        quantity: number;
      }>;
    }) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "purchase", {
          transaction_id: params.transaction_id,
          value: params.value,
          currency: params.currency,
          items: params.items,
        });
      }
    },
    []
  );

  const trackAddToCart = useCallback(
    (params: {
      currency: string;
      value: number;
      items: Array<{
        item_id: string;
        item_name: string;
        item_category?: string;
        price: number;
        quantity: number;
      }>;
    }) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "add_to_cart", {
          currency: params.currency,
          value: params.value,
          items: params.items,
        });
      }
    },
    []
  );

  const trackBeginCheckout = useCallback(
    (params: {
      currency: string;
      value: number;
      items: Array<{
        item_id: string;
        item_name: string;
        item_category?: string;
        price: number;
        quantity: number;
      }>;
    }) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "begin_checkout", {
          currency: params.currency,
          value: params.value,
          items: params.items,
        });
      }
    },
    []
  );

  const trackViewItem = useCallback(
    (params: {
      currency: string;
      value: number;
      items: Array<{
        item_id: string;
        item_name: string;
        item_category?: string;
        price: number;
      }>;
    }) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "view_item", {
          currency: params.currency,
          value: params.value,
          items: params.items,
        });
      }
    },
    []
  );

  const trackSearch = useCallback(
    (params: {
      search_term: string;
    }) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "search", {
          search_term: params.search_term,
        });
      }
    },
    []
  );

  const trackLogin = useCallback(
    (method?: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "login", {
          method: method || "email",
        });
      }
    },
    []
  );

  const trackSignUp = useCallback(
    (method?: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "sign_up", {
          method: method || "email",
        });
      }
    },
    []
  );

  const trackViewItemList = useCallback(
    (params: {
      item_list_id?: string;
      item_list_name?: string;
      items: Array<{
        item_id: string;
        item_name: string;
        item_category?: string;
        price: number;
      }>;
    }) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "view_item_list", {
          item_list_id: params.item_list_id,
          item_list_name: params.item_list_name,
          items: params.items,
        });
      }
    },
    []
  );

  const trackRemoveFromCart = useCallback(
    (params: {
      currency: string;
      value: number;
      items: Array<{
        item_id: string;
        item_name: string;
        item_category?: string;
        price: number;
        quantity: number;
      }>;
    }) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "remove_from_cart", {
          currency: params.currency,
          value: params.value,
          items: params.items,
        });
      }
    },
    []
  );

  return {
    trackEvent,
    trackPageView,
    trackPurchase,
    trackAddToCart,
    trackBeginCheckout,
    trackViewItem,
    trackSearch,
    trackLogin,
    trackSignUp,
    trackViewItemList,
    trackRemoveFromCart,
  };
}
