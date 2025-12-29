"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosAuth from "./useAxiosAuth";

interface UserProductAccess {
  id: string;
  userId: string;
  orderId: string;
  orderItemId: string;
  productId: string;
  productType: string;
  email?: string;
  password?: string;
  licenseKey?: string;
  accessUrl?: string;
  downloadUrl?: string;
  courseProgress?: number;
  courseStatus?: string;
  subscriptionStatus?: string;
  expiresAt?: string;
  metadata?: string;
  notes?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  product: {
    id: string;
    name: string;
    slug: string;
    description?: string;
    price: number;
    image?: string;
    category: {
      id: string;
      name: string;
      slug: string;
    };
    course?: {
      id: string;
      title: string;
      description?: string;
      instructor?: string;
      duration?: string;
      level?: string;
      thumbnail?: string;
      videoUrl?: string;
    };
  };
  order: {
    id: string;
    orderNumber: string;
    createdAt: string;
    totalAmount: number;
  };
  orderItem: {
    id: string;
    quantity: number;
    price: number;
  };
}

interface PurchasesResponse {
  success: boolean;
  data: {
    data: UserProductAccess[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

interface UsePurchasesParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  productType?: string;
  status?: string;
  search?: string;
}

export const useUserPurchases = (params: UsePurchasesParams = {}) => {
  const axiosAuth = useAxiosAuth();

  return useQuery<PurchasesResponse["data"]["data"], Error>({
    queryKey: ["user-purchases", params],
    queryFn: async () => {
      const response = await axiosAuth.get<PurchasesResponse>(
        "/api/user-product-access/purchases",
        { params }
      );
      return response.data.data.data;
    },
  });
};

export const useAISubscriptions = () => {
  const axiosAuth = useAxiosAuth();

  return useQuery<UserProductAccess[], Error>({
    queryKey: ["ai-subscriptions"],
    queryFn: async () => {
      const response = await axiosAuth.get<{
        success: boolean;
        data: UserProductAccess[];
      }>("/api/user-product-access/ai-subscriptions");
      return response.data.data;
    },
  });
};

export const useSoftwareLicenses = () => {
  const axiosAuth = useAxiosAuth();

  return useQuery<UserProductAccess[], Error>({
    queryKey: ["software-licenses"],
    queryFn: async () => {
      const response = await axiosAuth.get<{
        success: boolean;
        data: UserProductAccess[];
      }>("/api/user-product-access/software-licenses");
      return response.data.data;
    },
  });
};

export const useProductivityApps = () => {
  const axiosAuth = useAxiosAuth();

  return useQuery<UserProductAccess[], Error>({
    queryKey: ["productivity-apps"],
    queryFn: async () => {
      const response = await axiosAuth.get<{
        success: boolean;
        data: UserProductAccess[];
      }>("/api/user-product-access/productivity-apps");
      return response.data.data;
    },
  });
};

export const useCourses = () => {
  const axiosAuth = useAxiosAuth();

  return useQuery<UserProductAccess[], Error>({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await axiosAuth.get<{
        success: boolean;
        data: UserProductAccess[];
      }>("/api/user-product-access/courses");
      return response.data.data;
    },
  });
};

export const useUpdateCourseProgress = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      accessId,
      progress,
    }: {
      accessId: string;
      progress: number;
    }) => {
      const response = await axiosAuth.put(
        `/api/user-product-access/${accessId}/course-progress`,
        { progress }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};

