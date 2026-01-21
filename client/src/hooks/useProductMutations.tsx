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

  return useMutation<ApiResponse<any>, Error, CreateProductData | FormData>({
    mutationFn: async (data) => {
      const response = await axiosAdmin.post<ApiResponse<any>>("/api/products", data, {
        headers: data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
      });
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

  return useMutation<ApiResponse<any>, Error, UpdateProductData | (FormData & { id: string })>({
    mutationFn: async (data) => {
      let id: string;
      let updateData: any;
      
      if (data instanceof FormData) {
        id = (data as any).id;
        updateData = data;
      } else {
        id = data.id;
        updateData = { ...data };
        delete updateData.id;
      }
      
      const response = await axiosAdmin.put<ApiResponse<any>>(
        `/api/products/${id}`,
        updateData,
        {
          headers: updateData instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
        }
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      const id = variables instanceof FormData ? (variables as any).id : variables.id;
      queryClient.invalidateQueries({ queryKey: ["product", id] });
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

