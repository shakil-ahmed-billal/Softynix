"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  image?: string;
  images?: string[];
  categoryId: string;
  status: string;
  stock: number;
  featured: boolean;
  createdAt: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
}

interface ProductsResponse {
  success: boolean;
  message: string;
  data: {
    data: Product[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

interface UseAllProductsParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: string;
  categoryId?: string;
  featured?: boolean;
  search?: string;
}

export const useAllProducts = (params: UseAllProductsParams = {}) => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading, error, refetch } = useQuery<
    ProductsResponse["data"],
    Error
  >({
    queryKey: ["products", params],
    queryFn: async () => {
      const response = await axiosPublic.get<ProductsResponse>(
        "/api/products",
        {
          params,
        }
      );
      return response.data.data;
    },
  });
  return { data, isLoading, error, refetch };
};
