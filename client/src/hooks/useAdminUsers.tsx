"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAdmin from "./useAxiosAdmin";

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  status: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  _count: {
    orders: number;
  };
}

interface UsersResponse {
  success: boolean;
  message: string;
  data: {
    data: User[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

interface UseUsersParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export const useAdminUsers = (params: UseUsersParams = {}) => {
  const axiosAdmin = useAxiosAdmin();

  return useQuery<UsersResponse["data"], Error>({
    queryKey: ["admin", "users", params],
    queryFn: async () => {
      const response = await axiosAdmin.get<UsersResponse>("/api/admin/users", {
        params,
      });
      return response.data.data;
    },
  });
};

