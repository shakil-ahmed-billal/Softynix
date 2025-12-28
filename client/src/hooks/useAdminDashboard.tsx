"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAdmin from "./useAxiosAdmin";

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
  const axiosAdmin = useAxiosAdmin();

  return useQuery<DashboardStats, Error>({
    queryKey: ["admin", "dashboard", "stats"],
    queryFn: async () => {
      const response = await axiosAdmin.get<DashboardStatsResponse>(
        "/api/admin/dashboard/stats"
      );
      return response.data.data;
    },
  });
};

