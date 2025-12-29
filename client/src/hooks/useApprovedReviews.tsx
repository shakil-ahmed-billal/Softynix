"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

export const useApprovedReviews = (limit: number = 6) => {
  const axiosPublic = useAxiosPublic();

  return useQuery({
    queryKey: ["reviews", "approved", limit],
    queryFn: async () => {
      const response = await axiosPublic.get(`/api/reviews/approved?limit=${limit}`);
      return response.data.data || [];
    },
  });
};

