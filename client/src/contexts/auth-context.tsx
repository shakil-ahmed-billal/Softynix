"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuthToken, getAdminToken } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  status: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Admin {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  admin: Admin | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  loginAdmin: (admin: Admin) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  
  // Subscribe to store changes - this will cause re-render when store updates
  const user = useAuthStore((state) => state.user);
  const admin = useAuthStore((state) => state.admin);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const setUser = useAuthStore((state) => state.setUser);
  const setAdmin = useAuthStore((state) => state.setAdmin);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  // Initialize auth state from store and tokens
  useEffect(() => {
    const initializeAuth = () => {
      const authToken = getAuthToken();
      const adminToken = getAdminToken();

      // If tokens exist but store is empty, we'll let the store handle it
      // The store will be populated when login hooks are called
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const loginAdmin = (adminData: Admin) => {
    setAdmin(adminData);
  };

  const logout = () => {
    clearAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        isAuthenticated,
        isAdmin,
        isLoading,
        login,
        loginAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

