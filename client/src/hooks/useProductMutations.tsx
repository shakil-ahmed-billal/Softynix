"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosAdmin from "./useAxiosAdmin";

interface CreateProductData {
  name: string;
  slug: string;
  description?: string;
  price: number;
  image?: string;
  images?: string[];
  categoryId: string;
  status?: string;
  stock?: number;
  featured?: boolean;
}

interface UpdateProductData extends Partial<CreateProductData> {
  id: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const useCreateProduct = () => {
  const axiosAdmin = useAxiosAdmin();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<any>, Error, CreateProductData>({
    mutationFn: async (data) => {
      const response = await axiosAdmin.post<ApiResponse<any>>("/api/products", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const axiosAdmin = useAxiosAdmin();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<any>, Error, UpdateProductData>({
    mutationFn: async (data) => {
      const { id, ...updateData } = data;
      const response = await axiosAdmin.put<ApiResponse<any>>(
        `/api/products/${id}`,
        updateData
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
    },
  });
};

export const useDeleteProduct = () => {
  const axiosAdmin = useAxiosAdmin();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, Error, string>({
    mutationFn: async (id) => {
      const response = await axiosAdmin.delete<ApiResponse<null>>(`/api/products/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

