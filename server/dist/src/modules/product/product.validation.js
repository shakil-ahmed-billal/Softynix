import { z } from 'zod';
import { PRODUCT_STATUS } from '../../shared/constants.js';
/**
 * Product validation schemas
 */
export const createProductSchema = z.object({
    name: z.string().min(1, 'Product name is required').max(200),
    slug: z.string().min(1, 'Slug is required').max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
    description: z.string().optional().nullable(),
    price: z.number().positive('Price must be positive'),
    image: z.string().url('Invalid image URL').optional().nullable().or(z.literal('')),
    images: z.array(z.string().url()).optional().default([]),
    categoryId: z.string().uuid('Invalid category ID'),
    status: z.enum([PRODUCT_STATUS.ACTIVE, PRODUCT_STATUS.INACTIVE, PRODUCT_STATUS.OUT_OF_STOCK]).optional().default(PRODUCT_STATUS.ACTIVE),
    stock: z.number().int().min(0).optional().default(0),
    featured: z.boolean().optional().default(false),
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
export const updateProductSchema = createProductSchema.partial().extend({
    id: z.string().uuid('Invalid product ID'),
});
export const getProductsQuerySchema = z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(100).optional().default(10),
    sortBy: z.string().optional().default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
    status: z.string().optional(),
    categoryId: z.string().uuid('Invalid category ID').optional().or(z.literal('')),
    featured: z.coerce.boolean().optional(),
    search: z.string().optional(),
}).transform((data) => {
    // Remove categoryId if it's empty string
    if (data.categoryId === '') {
        const { categoryId, ...rest } = data;
        return rest;
    }
    return data;
});
export const getProductParamsSchema = z.object({
    id: z.string().min(1, 'Product ID is required'),
});
export const deleteProductParamsSchema = z.object({
    id: z.string().uuid('Invalid product ID'),
});
//# sourceMappingURL=product.validation.js.map