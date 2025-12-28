import { z } from 'zod';
import { CATEGORY_STATUS } from '../../shared/constants';

/**
 * Category validation schemas
 */

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100),
  slug: z.string().min(1, 'Slug is required').max(100).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  description: z.string().optional(),
  image: z.string().url('Invalid image URL').optional().or(z.literal('')),
  status: z.enum([CATEGORY_STATUS.ACTIVE, CATEGORY_STATUS.INACTIVE]).optional().default(CATEGORY_STATUS.ACTIVE),
});

export const updateCategorySchema = createCategorySchema.partial().extend({
  id: z.string().uuid('Invalid category ID'),
});

export const getCategoriesQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  sortBy: z.string().optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  status: z.string().optional(),
  search: z.string().optional(),
});

export const getCategoryParamsSchema = z.object({
  id: z.string().uuid('Invalid category ID'),
});

export const deleteCategoryParamsSchema = z.object({
  id: z.string().uuid('Invalid category ID'),
});

