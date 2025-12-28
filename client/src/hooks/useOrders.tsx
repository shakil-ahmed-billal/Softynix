"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  subtotal: number;
  product?: {
    id: string;
    name: string;
    slug: string;
    image?: string;
  };
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  shippingAddress?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

interface OrdersResponse {
  success: boolean;
  message: string;
  data: {
    data: Order[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

interface OrderResponse {
  success: boolean;
  message: string;
  data: Order;
}

interface UseOrdersParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: string;
  paymentStatus?: string;
  search?: string;
}

export const useAllOrders = (params: UseOrdersParams = {}) => {
  const axiosPublic = useAxiosPublic();

  return useQuery<OrdersResponse["data"], Error>({
    queryKey: ["orders", params],
    queryFn: async () => {
      const response = await axiosPublic.get<OrdersResponse>("/api/orders", {
        params,
      });
      return response.data.data;
    },
  });
};

export const useSingleOrder = (id: string) => {
  const axiosPublic = useAxiosPublic();

  return useQuery<Order, Error>({
    queryKey: ["order", id],
    queryFn: async () => {
      const response = await axiosPublic.get<OrderResponse>(`/api/orders/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
};

export const useOrderByOrderNumber = (orderNumber: string) => {
  const axiosPublic = useAxiosPublic();

  return useQuery<Order, Error>({
    queryKey: ["order", "number", orderNumber],
    queryFn: async () => {
      const response = await axiosPublic.get<OrderResponse>(
        `/api/orders/number/${orderNumber}`
      );
      return response.data.data;
    },
    enabled: !!orderNumber,
  });
};

export const useOrderStats = () => {
  const axiosPublic = useAxiosPublic();

  return useQuery<any, Error>({
    queryKey: ["orders", "stats"],
    queryFn: async () => {
      const response = await axiosPublic.get<{ success: boolean; data: any }>(
        "/api/orders/stats"
      );
      return response.data.data;
    },
  });
};

