import { z } from 'zod';

/**
 * Review validation schemas
 */

export const createReviewSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  orderId: z.string().optional().nullable(),
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  comment: z.string().min(1, 'Comment is required').max(1000, 'Comment must be less than 1000 characters').optional().nullable(),
});

export const updateReviewSchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  comment: z.string().min(1).max(1000).optional().nullable(),
});

export const updateReviewStatusSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected']),
});

export const getReviewsQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  sortBy: z.enum(['createdAt', 'rating']).optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  status: z.enum(['pending', 'approved', 'rejected']).optional(),
  productId: z.string().min(1).optional(),
  userId: z.string().min(1).optional(),
  search: z.string().optional(),
});

export const getReviewParamsSchema = z.object({
  id: z.string().uuid('Invalid review ID'),
});

export const deleteReviewParamsSchema = z.object({
  id: z.string().uuid('Invalid review ID'),
});

