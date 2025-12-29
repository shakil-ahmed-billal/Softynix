"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAdmin from "./useAxiosAdmin";

interface UseProductCredentialsParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  productId?: string;
  productType?: string;
  search?: string;
}

export const useProductCredentials = (params: UseProductCredentialsParams = {}) => {
  const axiosAdmin = useAxiosAdmin();

  return useQuery({
    queryKey: ["product-credentials", params],
    queryFn: async () => {
      const response = await axiosAdmin.get("/api/product-credentials", { params });
      // The API returns { success: true, data: { data: [...], pagination: {...} } }
      return response.data.data;
    },
  });
};

export const useProductCredentialsByProductId = (productId: string | undefined) => {
  const axiosAdmin = useAxiosAdmin();

  return useQuery({
    queryKey: ["product-credentials", "product", productId],
    queryFn: async () => {
      if (!productId) return null;
      const response = await axiosAdmin.get(`/api/product-credentials/product/${productId}`);
      return response.data.data;
    },
    enabled: !!productId,
  });
};

