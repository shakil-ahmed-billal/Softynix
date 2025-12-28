"use client";

import axios from "axios";
import { getAuthToken } from "./useAuth";

/**
 * Axios instance with automatic token injection
 * Use this for authenticated requests
 */
const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Request interceptor to add auth token
axiosAuth.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
axiosAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        // Optionally redirect to login
        // window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

const useAxiosAuth = () => {
  return axiosAuth;
};

export default useAxiosAuth;

