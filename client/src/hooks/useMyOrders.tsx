"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "./useAxiosAuth";

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
  paymentMethod?: string;
  senderPhone?: string;
  transactionId?: string;
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

interface UseMyOrdersParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: string;
  paymentStatus?: string;
  search?: string;
}

export const useMyOrders = (params: UseMyOrdersParams = {}) => {
  const axiosAuth = useAxiosAuth();

  return useQuery<OrdersResponse["data"], Error>({
    queryKey: ["my-orders", params],
    queryFn: async () => {
      const response = await axiosAuth.get<OrdersResponse>("/api/orders/my-orders", {
        params,
      });
      return response.data.data;
    },
    enabled: !!axiosAuth, // Only fetch if authenticated
  });
};

