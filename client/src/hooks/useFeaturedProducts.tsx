"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  image?: string;
  images?: string[];
  categoryId: string;
  status: string;
  stock: number;
  featured: boolean;
  createdAt: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
}

interface FeaturedProductsResponse {
  success: boolean;
  message: string;
  data: Product[];
}

export const useFeaturedProducts = (limit: number = 10) => {
  const axiosPublic = useAxiosPublic();

  return useQuery<Product[], Error>({
    queryKey: ["products", "featured", limit],
    queryFn: async () => {
      const response = await axiosPublic.get<FeaturedProductsResponse>(
        "/api/products/featured",
        {
          params: { limit },
        }
      );
      return response.data.data;
    },
  });
};

