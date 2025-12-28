"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

interface CreateOrderData {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress?: string;
  notes?: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}

interface UpdateOrderData {
  id: string;
  status?: string;
  paymentStatus?: string;
  shippingAddress?: string;
  notes?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const useCreateOrder = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<any>, Error, CreateOrderData>({
    mutationFn: async (data) => {
      const response = await axiosPublic.post<ApiResponse<any>>("/api/orders", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", "stats"] });
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Update stock
    },
  });
};

export const useUpdateOrder = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<any>, Error, UpdateOrderData>({
    mutationFn: async (data) => {
      const { id, ...updateData } = data;
      const response = await axiosPublic.put<ApiResponse<any>>(
        `/api/orders/${id}`,
        updateData
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["orders", "stats"] });
    },
  });
};

export const useDeleteOrder = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, Error, string>({
    mutationFn: async (id) => {
      const response = await axiosPublic.delete<ApiResponse<null>>(`/api/orders/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", "stats"] });
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Restore stock
    },
  });
};

