"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosAdmin from "./useAxiosAdmin";

interface CreateCategoryData {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  status?: string;
}

interface UpdateCategoryData extends Partial<CreateCategoryData> {
  id: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const useCreateCategory = () => {
  const axiosAdmin = useAxiosAdmin();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<any>, Error, CreateCategoryData | FormData>({
    mutationFn: async (data) => {
      const response = await axiosAdmin.post<ApiResponse<any>>("/api/categories", data, {
        headers: data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUpdateCategory = () => {
  const axiosAdmin = useAxiosAdmin();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<any>, Error, UpdateCategoryData | (FormData & { id: string })>({
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
        `/api/categories/${id}`,
        updateData,
        {
          headers: updateData instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
        }
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      const id = variables instanceof FormData ? (variables as any).id : variables.id;
      queryClient.invalidateQueries({ queryKey: ["category", id] });
    },
  });
};

export const useDeleteCategory = () => {
  const axiosAdmin = useAxiosAdmin();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, Error, string>({
    mutationFn: async (id) => {
      const response = await axiosAdmin.delete<ApiResponse<null>>(`/api/categories/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

