"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: any | null;
  admin: any | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  setUser: (user: any) => void;
  setAdmin: (admin: any) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => {
      // Check tokens on initialization
      const checkAuth = () => {
        if (typeof window === "undefined") return { isAuthenticated: false, isAdmin: false };
        const authToken = localStorage.getItem("auth_token");
        const adminToken = localStorage.getItem("admin_token");
        return {
          isAuthenticated: !!authToken || !!adminToken,
          isAdmin: !!adminToken,
        };
      };

      const auth = checkAuth();

      return {
        user: null,
        admin: null,
        isAuthenticated: auth.isAuthenticated,
        isAdmin: auth.isAdmin,
        setUser: (user) => set({ user, isAuthenticated: true, isAdmin: false, admin: null }),
        setAdmin: (admin) => set({ admin, isAuthenticated: true, isAdmin: true, user: null }),
        clearAuth: () => set({ user: null, admin: null, isAuthenticated: false, isAdmin: false }),
      };
    },
    {
      name: "auth-storage",
    }
  )
);

