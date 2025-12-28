"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosAdmin from "./useAxiosAdmin";
import useAxiosAuth from "./useAxiosAuth";

interface CreateOrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: string;
  senderPhone: string;
  transactionId: string;
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
  const axiosAuth = useAxiosAuth(); // Use authenticated axios to include token if user is logged in
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<any>, Error, CreateOrderData>({
    mutationFn: async (data) => {
      // Use axiosAuth which will include token if user is logged in
      // The backend optionalUserAuth middleware will handle both authenticated and unauthenticated requests
      const response = await axiosAuth.post<ApiResponse<any>>("/api/orders", data);
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
  const axiosAdmin = useAxiosAdmin();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<any>, Error, UpdateOrderData>({
    mutationFn: async (data) => {
      const { id, ...updateData } = data;
      // Use admin axios for order updates (admin only operation)
      const response = await axiosAdmin.put<ApiResponse<any>>(
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
  const axiosAdmin = useAxiosAdmin();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, Error, string>({
    mutationFn: async (id) => {
      const response = await axiosAdmin.delete<ApiResponse<null>>(`/api/orders/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", "stats"] });
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Restore stock
    },
  });
};

