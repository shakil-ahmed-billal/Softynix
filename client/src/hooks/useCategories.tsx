"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  status: string;
  createdAt: string;
  _count?: {
    products: number;
  };
}

interface CategoriesResponse {
  success: boolean;
  message: string;
  data: {
    data: Category[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

interface CategoryResponse {
  success: boolean;
  message: string;
  data: Category;
}

interface UseCategoriesParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: string;
  search?: string;
}

export const useAllCategories = (params: UseCategoriesParams = {}) => {
  const axiosPublic = useAxiosPublic();

  return useQuery<CategoriesResponse["data"], Error>({
    queryKey: ["categories", params],
    queryFn: async () => {
      const response = await axiosPublic.get<CategoriesResponse>("/api/categories", {
        params,
      });
      return response.data.data;
    },
  });
};

export const useActiveCategories = () => {
  const axiosPublic = useAxiosPublic();

  return useQuery<Category[], Error>({
    queryKey: ["categories", "active"],
    queryFn: async () => {
      const response = await axiosPublic.get<{ success: boolean; data: Category[] }>(
        "/api/categories/active"
      );
      return response.data.data;
    },
  });
};

export const useSingleCategory = (id: string) => {
  const axiosPublic = useAxiosPublic();

  return useQuery<Category, Error>({
    queryKey: ["category", id],
    queryFn: async () => {
      const response = await axiosPublic.get<CategoryResponse>(`/api/categories/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
};

export const useCategoryBySlug = (slug: string) => {
  const axiosPublic = useAxiosPublic();

  return useQuery<Category, Error>({
    queryKey: ["category", "slug", slug],
    queryFn: async () => {
      const response = await axiosPublic.get<CategoryResponse>(
        `/api/categories/slug/${slug}`
      );
      return response.data.data;
    },
    enabled: !!slug,
  });
};

