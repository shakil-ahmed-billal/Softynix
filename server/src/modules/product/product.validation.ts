import { z } from 'zod';
import { PRODUCT_STATUS } from '../../shared/constants';

/**
 * Product validation schemas
 */

export const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(200),
  slug: z.string().min(1, 'Slug is required').max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  image: z.string().url('Invalid image URL').optional().or(z.literal('')),
  images: z.array(z.string().url()).optional().default([]),
  categoryId: z.string().uuid('Invalid category ID'),
  status: z.enum([PRODUCT_STATUS.ACTIVE, PRODUCT_STATUS.INACTIVE, PRODUCT_STATUS.OUT_OF_STOCK]).optional().default(PRODUCT_STATUS.ACTIVE),
  stock: z.number().int().min(0).optional().default(0),
  featured: z.boolean().optional().default(false),
});

export const updateProductSchema = createProductSchema.partial().extend({
  id: z.string().uuid('Invalid product ID'),
});

export const getProductsQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  sortBy: z.string().optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  status: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  featured: z.coerce.boolean().optional(),
  search: z.string().optional(),
});

export const getProductParamsSchema = z.object({
  id: z.string().uuid('Invalid product ID'),
});

export const deleteProductParamsSchema = z.object({
  id: z.string().uuid('Invalid product ID'),
});

