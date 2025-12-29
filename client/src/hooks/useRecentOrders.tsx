"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface RecentOrdersResponse {
  success: boolean;
  message: string;
  data: RecentOrder[];
}

export const useRecentOrders = (limit: number = 5) => {
  const axiosPublic = useAxiosPublic();

  return useQuery<RecentOrder[], Error>({
    queryKey: ["recent-orders", limit],
    queryFn: async () => {
      const response = await axiosPublic.get<RecentOrdersResponse>(
        "/api/orders/recent",
        {
          params: { limit },
        }
      );
      return response.data.data;
    },
  });
};

