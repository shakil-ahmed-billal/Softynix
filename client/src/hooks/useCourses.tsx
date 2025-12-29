"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAdmin from "./useAxiosAdmin";

interface UseCoursesParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: string;
  search?: string;
}

export const useCourses = (params: UseCoursesParams = {}) => {
  const axiosAdmin = useAxiosAdmin();

  return useQuery({
    queryKey: ["courses", params],
    queryFn: async () => {
      const response = await axiosAdmin.get("/api/courses", { params });
      // API returns { success, message, data: { data: [...], pagination: {...} } }
      // Return the inner data object which has { data: [...], pagination: {...} }
      return response.data.data;
    },
  });
};

export const useCourseById = (id: string | undefined) => {
  const axiosAdmin = useAxiosAdmin();

  return useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await axiosAdmin.get(`/api/courses/${id}`);
      return response.data.data; // Extract data from API response
    },
    enabled: !!id,
  });
};

export const useCourseByProductId = (productId: string | undefined) => {
  const axiosAdmin = useAxiosAdmin();

  return useQuery({
    queryKey: ["course", "product", productId],
    queryFn: async () => {
      if (!productId) return null;
      const response = await axiosAdmin.get(`/api/courses/product/${productId}`);
      return response.data.data; // Extract data from API response
    },
    enabled: !!productId,
  });
};

