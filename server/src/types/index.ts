/**
 * Type definitions for the application
 */

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FilterParams {
  status?: string;
  categoryId?: string;
  featured?: boolean;
  search?: string;
  paymentStatus?: string;
  productId?: string;
  productType?: string;
  userId?: string;
}

