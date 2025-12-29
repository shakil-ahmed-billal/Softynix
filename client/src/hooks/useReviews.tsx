"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "./useAxiosAuth";
import useAxiosPublic from "./useAxiosPublic";

interface UseReviewsParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: string;
  productId?: string;
  userId?: string;
  search?: string;
}

export const useReviews = (params: UseReviewsParams = {}) => {
  const axiosAuth = useAxiosAuth();

  return useQuery({
    queryKey: ["reviews", params],
    queryFn: async () => {
      const response = await axiosAuth.get("/api/reviews", { params });
      return response.data.data;
    },
  });
};

export const useReviewsByProductId = (productId: string | undefined) => {
  const axiosPublic = useAxiosPublic();

  return useQuery({
    queryKey: ["reviews", "product", productId],
    queryFn: async () => {
      if (!productId) return [];
      const response = await axiosPublic.get(`/api/reviews/product/${productId}`);
      return response.data.data || [];
    },
    enabled: !!productId,
  });
};

export const useMyReviews = () => {
  const axiosAuth = useAxiosAuth();

  return useQuery({
    queryKey: ["reviews", "my-reviews"],
    queryFn: async () => {
      const response = await axiosAuth.get("/api/reviews/my-reviews");
      return response.data.data || [];
    },
  });
};

