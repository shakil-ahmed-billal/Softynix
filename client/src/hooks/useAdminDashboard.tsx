"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

interface DashboardStats {
  products: {
    total: number;
    active: number;
  };
  categories: {
    total: number;
  };
  orders: {
    total: number;
  };
  revenue: {
    total: number;
  };
  recentOrders: any[];
}

interface DashboardStatsResponse {
  success: boolean;
  message: string;
  data: DashboardStats;
}

export const useAdminDashboardStats = () => {
  const axiosPublic = useAxiosPublic();

  return useQuery<DashboardStats, Error>({
    queryKey: ["admin", "dashboard", "stats"],
    queryFn: async () => {
      const response = await axiosPublic.get<DashboardStatsResponse>(
        "/api/admin/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_KEY || ""}`,
          },
        }
      );
      return response.data.data;
    },
  });
};

