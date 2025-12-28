"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

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
  _count?: {
    orders: number;
  };
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

interface ProfileResponse {
  success: boolean;
  message: string;
  data: User;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Token management
const TOKEN_KEY = "auth_token";

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setAuthToken = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeAuthToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
};

// Create axios instance with auth token
const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const useSignup = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  return useMutation<AuthResponse["data"], Error, SignupData>({
    mutationFn: async (data) => {
      const response = await axiosPublic.post<AuthResponse>("/api/auth/signup", data);
      const { token, user } = response.data.data;
      setAuthToken(token);
      // Update store
      if (typeof window !== "undefined") {
        const { useAuthStore } = await import("@/store/authStore");
        useAuthStore.getState().setUser(user);
      }
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
    },
  });
};

export const useLogin = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  return useMutation<AuthResponse["data"], Error, LoginData>({
    mutationFn: async (data) => {
      const response = await axiosPublic.post<AuthResponse>("/api/auth/login", data);
      const { token, user } = response.data.data;
      setAuthToken(token);
      // Update store
      if (typeof window !== "undefined") {
        const { useAuthStore } = await import("@/store/authStore");
        useAuthStore.getState().setUser(user);
        // Update context if available
        try {
          const { useAuth } = await import("@/contexts/auth-context");
          const auth = useAuth();
          if (auth?.login) {
            auth.login(user);
          }
        } catch (e) {
          // Context not available yet, that's okay
        }
      }
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return async () => {
    removeAuthToken();
    if (typeof window !== "undefined") {
      const { useAuthStore } = await import("@/store/authStore");
      useAuthStore.getState().clearAuth();
    }
    queryClient.clear();
  };
};

export const useProfile = () => {
  const axiosPublic = useAxiosPublic();

  return useQuery<User, Error>({
    queryKey: ["auth", "profile"],
    queryFn: async () => {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Not authenticated");
      }
      const response = await axiosPublic.get<ProfileResponse>("/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    },
    enabled: !!getAuthToken(),
    retry: false,
  });
};

export const useUpdateProfile = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  return useMutation<User, Error, Partial<Omit<User, "id" | "email" | "createdAt" | "updatedAt">>>({
    mutationFn: async (data) => {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Not authenticated");
      }
      const response = await axiosPublic.put<ProfileResponse>("/api/auth/profile", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
    },
  });
};

export const useChangePassword = () => {
  const axiosPublic = useAxiosPublic();

  return useMutation<ApiResponse<null>, Error, { currentPassword: string; newPassword: string }>({
    mutationFn: async (data) => {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Not authenticated");
      }
      const response = await axiosPublic.put<ApiResponse<null>>(
        "/api/auth/change-password",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
  });
};

// Admin login
interface AdminLoginData {
  email: string;
  password: string;
}

interface AdminAuthResponse {
  success: boolean;
  message: string;
  data: {
    admin: any;
    token: string;
  };
}

const ADMIN_TOKEN_KEY = "admin_token";

export const getAdminToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ADMIN_TOKEN_KEY);
};

export const setAdminToken = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const removeAdminToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ADMIN_TOKEN_KEY);
};

export const useAdminLogin = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  return useMutation<AdminAuthResponse["data"], Error, AdminLoginData>({
    mutationFn: async (data) => {
      const response = await axiosPublic.post<AdminAuthResponse>("/api/auth/admin/login", data);
      const { token, admin } = response.data.data;
      setAdminToken(token);
      // Update store
      if (typeof window !== "undefined") {
        const { useAuthStore } = await import("@/store/authStore");
        useAuthStore.getState().setAdmin(admin);
      }
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "profile"] });
    },
  });
};

export const useAdminLogout = () => {
  const queryClient = useQueryClient();

  return async () => {
    removeAdminToken();
    if (typeof window !== "undefined") {
      const { useAuthStore } = await import("@/store/authStore");
      useAuthStore.getState().clearAuth();
    }
    queryClient.clear();
  };
};

