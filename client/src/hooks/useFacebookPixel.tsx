"use client";

import { useCallback } from "react";

declare global {
  interface Window {
    fbq: (
      action: string,
      event: string,
      params?: Record<string, any>
    ) => void;
  }
}

/**
 * Hook for tracking Facebook Pixel events
 * Usage:
 * const { trackEvent, trackPurchase, trackAddToCart } = useFacebookPixel();
 */
export function useFacebookPixel() {
  const trackEvent = useCallback(
    (eventName: string, params?: Record<string, any>) => {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", eventName, params);
      }
    },
    []
  );

  const trackPurchase = useCallback(
    (params: {
      value: number;
      currency: string;
      content_name?: string;
      content_ids?: string[];
      contents?: Array<{
        id: string;
        quantity: number;
      }>;
    }) => {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Purchase", params);
      }
    },
    []
  );

  const trackAddToCart = useCallback(
    (params: {
      value: number;
      currency: string;
      content_name: string;
      content_ids: string[];
      content_type: string;
      quantity?: number;
    }) => {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "AddToCart", params);
      }
    },
    []
  );

  const trackInitiateCheckout = useCallback(
    (params: {
      value: number;
      currency: string;
      content_name?: string;
      content_ids?: string[];
      num_items?: number;
    }) => {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "InitiateCheckout", params);
      }
    },
    []
  );

  const trackViewContent = useCallback(
    (params: {
      content_name: string;
      content_ids: string[];
      content_type: string;
      value?: number;
      currency?: string;
    }) => {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "ViewContent", params);
      }
    },
    []
  );

  const trackSearch = useCallback(
    (params: {
      search_string: string;
      content_ids?: string[];
      content_type?: string;
    }) => {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Search", params);
      }
    },
    []
  );

  const trackLead = useCallback(
    (params?: {
      content_name?: string;
      content_category?: string;
      value?: number;
      currency?: string;
    }) => {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", params);
      }
    },
    []
  );

  const trackCompleteRegistration = useCallback(
    (params?: {
      content_name?: string;
      status?: boolean;
    }) => {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "CompleteRegistration", params);
      }
    },
    []
  );

  return {
    trackEvent,
    trackPurchase,
    trackAddToCart,
    trackInitiateCheckout,
    trackViewContent,
    trackSearch,
    trackLead,
    trackCompleteRegistration,
  };
}
