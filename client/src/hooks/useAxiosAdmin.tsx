"use client";

import axios from "axios";
import { getAdminToken } from "./useAuth";

/**
 * Axios instance for admin API calls
 * Includes admin authentication header
 */
const axiosAdmin = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Request interceptor to add admin auth token
axiosAdmin.interceptors.request.use(
  (config) => {
    // First, try to use JWT token from admin login
    const adminToken = getAdminToken();
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
      return config;
    }

    // Fallback to API key if no JWT token
    const adminApiKey = process.env.NEXT_PUBLIC_ADMIN_API_KEY;
    if (adminApiKey) {
      config.headers.Authorization = `Bearer ${adminApiKey}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosAdmin.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Admin authentication failed");
    }
    return Promise.reject(error);
  }
);

const useAxiosAdmin = () => {
  return axiosAdmin;
};

export default useAxiosAdmin;

