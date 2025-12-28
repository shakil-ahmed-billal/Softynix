"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAdmin from "./useAxiosAdmin";

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

interface UseOrdersParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: string;
  paymentStatus?: string;
  search?: string;
}

export const useAdminOrders = (params: UseOrdersParams = {}) => {
  const axiosAdmin = useAxiosAdmin();

  return useQuery<OrdersResponse["data"], Error>({
    queryKey: ["admin", "orders", params],
    queryFn: async () => {
      const response = await axiosAdmin.get<OrdersResponse>("/api/orders", {
        params,
      });
      return response.data.data;
    },
  });
};

export const useAdminOrderStats = () => {
  const axiosAdmin = useAxiosAdmin();

  return useQuery<any, Error>({
    queryKey: ["admin", "orders", "stats"],
    queryFn: async () => {
      const response = await axiosAdmin.get<{ success: boolean; data: any }>(
        "/api/orders/stats"
      );
      return response.data.data;
    },
  });
};

