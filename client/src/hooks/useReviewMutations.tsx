"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosAuth from "./useAxiosAuth";
import toast from "react-hot-toast";

interface CreateReviewData {
  productId: string;
  orderId?: string;
  rating: number;
  comment?: string;
}

interface UpdateReviewData {
  id: string;
  rating?: number;
  comment?: string;
}

export const useCreateReview = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateReviewData) => {
      const response = await axiosAuth.post("/api/reviews", data);
      return response.data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews", "product", data.productId] });
      queryClient.invalidateQueries({ queryKey: ["reviews", "my-reviews"] });
      toast.success("Review submitted successfully! It will be visible after approval.");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to submit review");
    },
  });
};

export const useUpdateReview = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateReviewData) => {
      const { id, ...updateData } = data;
      const response = await axiosAuth.put(`/api/reviews/${id}`, updateData);
      return response.data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews", "product", data.productId] });
      queryClient.invalidateQueries({ queryKey: ["reviews", "my-reviews"] });
      toast.success("Review updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update review");
    },
  });
};

export const useDeleteReview = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosAuth.delete(`/api/reviews/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews", "my-reviews"] });
      toast.success("Review deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete review");
    },
  });
};

