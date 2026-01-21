"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosAdmin from "./useAxiosAdmin";
import toast from "react-hot-toast";

interface CreateCourseData {
  productId: string;
  title: string;
  description?: string;
  instructor?: string;
  duration?: string;
  level?: "beginner" | "intermediate" | "advanced";
  language?: string;
  thumbnail?: string;
  videoUrl?: string;
  resources?: string[];
  modules?: string; // JSON string
  status?: "active" | "inactive";
}

interface UpdateCourseData extends Partial<CreateCourseData> {
  id: string;
}

export const useCreateCourse = () => {
  const axiosAdmin = useAxiosAdmin();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCourseData | FormData) => {
      const response = await axiosAdmin.post("/api/courses", data, {
        headers: data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
      });
      return response.data.data; // Extract data from API response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Course created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create course");
    },
  });
};

export const useUpdateCourse = () => {
  const axiosAdmin = useAxiosAdmin();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateCourseData | (FormData & { id: string })) => {
      let id: string;
      let updateData: any;
      
      if (data instanceof FormData) {
        id = (data as any).id;
        updateData = data;
      } else {
        id = data.id;
        updateData = { ...data };
        delete updateData.id;
      }
      
      const response = await axiosAdmin.put(`/api/courses/${id}`, updateData, {
        headers: updateData instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
      });
      return response.data.data; // Extract data from API response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Course updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update course");
    },
  });
};

export const useDeleteCourse = () => {
  const axiosAdmin = useAxiosAdmin();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosAdmin.delete(`/api/courses/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Course deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete course");
    },
  });
};

