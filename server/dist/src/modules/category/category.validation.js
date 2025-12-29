import { z } from 'zod';
import { CATEGORY_STATUS } from '../../shared/constants';
/**
 * Category validation schemas
 */
export const createCategorySchema = z.object({
    name: z.string().min(1, 'Category name is required').max(100),
    slug: z.string().min(1, 'Slug is required').max(100).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
    description: z.string().optional().nullable(),
    image: z.string().optional().nullable().or(z.literal('')),
    status: z.enum([CATEGORY_STATUS.ACTIVE, CATEGORY_STATUS.INACTIVE]).optional().default(CATEGORY_STATUS.ACTIVE),
}).refine((data) => {
    // If image is provided, it must be a valid URL or empty string
    if (data.image && data.image !== '') {
        try {
            new URL(data.image);
            return true;
        }
        catch {
            return false;
        }
    }
    return true;
}, {
    message: 'Invalid image URL',
    path: ['image'],
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
//# sourceMappingURL=category.validation.js.map