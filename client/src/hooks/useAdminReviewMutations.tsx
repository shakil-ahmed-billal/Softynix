"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosAdmin from "./useAxiosAdmin";
import toast from "react-hot-toast";

interface UpdateReviewStatusData {
  id: string;
  status: "pending" | "approved" | "rejected";
}

export const useUpdateReviewStatus = () => {
  const axiosAdmin = useAxiosAdmin();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateReviewStatusData) => {
      const { id, status } = data;
      const response = await axiosAdmin.put(`/api/reviews/${id}/status`, { status });
      return response.data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "reviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews", "approved"] });
      queryClient.invalidateQueries({ queryKey: ["reviews", "product", data.productId] });
      toast.success(`Review ${data.status} successfully!`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update review status");
    },
  });
};

