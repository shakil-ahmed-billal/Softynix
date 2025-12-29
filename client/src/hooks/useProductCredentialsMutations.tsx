"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosAdmin from "./useAxiosAdmin";
import toast from "react-hot-toast";

interface UpsertProductCredentialsData {
  productId: string;
  productType: "ai_subscription" | "software_license" | "productivity_app" | "course" | "utility_tool" | "creative_tool";
  email?: string;
  password?: string;
  licenseKey?: string;
  accessUrl?: string;
  downloadUrl?: string;
  subscriptionStatus?: "active" | "expired" | "cancelled";
  expiresAt?: string;
  metadata?: string;
  notes?: string;
}

export const useUpsertProductCredentials = () => {
  const axiosAdmin = useAxiosAdmin();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpsertProductCredentialsData) => {
      const response = await axiosAdmin.post("/api/product-credentials", data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-credentials"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product credentials saved successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to save product credentials");
    },
  });
};

export const useDeleteProductCredentials = () => {
  const axiosAdmin = useAxiosAdmin();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosAdmin.delete(`/api/product-credentials/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-credentials"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product credentials deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete product credentials");
    },
  });
};

export const useApplyCredentialsToUsers = () => {
  const axiosAdmin = useAxiosAdmin();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosAdmin.post(`/api/product-credentials/${id}/apply`);
      return response.data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["product-credentials"] });
      queryClient.invalidateQueries({ queryKey: ["user-product-access"] });
      toast.success(`Credentials applied to ${data.updated} user(s) successfully`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to apply credentials");
    },
  });
};

