"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

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
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<any>, Error, CreateCategoryData>({
    mutationFn: async (data) => {
      const response = await axiosPublic.post<ApiResponse<any>>("/api/categories", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUpdateCategory = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<any>, Error, UpdateCategoryData>({
    mutationFn: async (data) => {
      const { id, ...updateData } = data;
      const response = await axiosPublic.put<ApiResponse<any>>(
        `/api/categories/${id}`,
        updateData
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", variables.id] });
    },
  });
};

export const useDeleteCategory = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, Error, string>({
    mutationFn: async (id) => {
      const response = await axiosPublic.delete<ApiResponse<null>>(`/api/categories/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

