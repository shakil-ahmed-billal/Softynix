"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAdmin from "./useAxiosAdmin";

interface UseAdminReviewsParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: string;
  productId?: string;
  userId?: string;
  search?: string;
}

export const useAdminReviews = (params: UseAdminReviewsParams = {}) => {
  const axiosAdmin = useAxiosAdmin();

  return useQuery({
    queryKey: ["admin", "reviews", params],
    queryFn: async () => {
      const response = await axiosAdmin.get("/api/reviews", { params });
      return response.data.data || { data: [], pagination: {} };
    },
  });
};
