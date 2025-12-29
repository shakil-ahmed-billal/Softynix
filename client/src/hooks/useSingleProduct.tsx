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
    description?: string;
  };
  course?: {
    id: string;
    title: string;
    description?: string;
    videoUrl?: string;
    thumbnail?: string;
    duration?: string;
    instructor?: string;
  };
}

interface ProductResponse {
  success: boolean;
  message: string;
  data: Product;
}

export const useSingleProduct = (id: string) => {
  const axiosPublic = useAxiosPublic();

  return useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await axiosPublic.get<ProductResponse>(`/api/products/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
};

export const useProductBySlug = (slug: string) => {
  const axiosPublic = useAxiosPublic();

  return useQuery<Product, Error>({
    queryKey: ["product", "slug", slug],
    queryFn: async () => {
      const response = await axiosPublic.get<ProductResponse>(`/api/products/slug/${slug}`);
      return response.data.data;
    },
    enabled: !!slug,
  });
};

