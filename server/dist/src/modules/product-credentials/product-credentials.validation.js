import { z } from 'zod';
/**
 * Product Credentials validation schemas
 */
export const upsertProductCredentialsSchema = z.object({
    productId: z.string().min(1, 'Product ID is required'),
    productType: z.enum(['ai_subscription', 'software_license', 'productivity_app', 'course', 'utility_tool', 'creative_tool']),
    email: z.string().email('Invalid email').optional().nullable().or(z.literal('')),
    password: z.string().optional().nullable().or(z.literal('')),
    licenseKey: z.string().optional().nullable().or(z.literal('')),
    accessUrl: z.string().url('Invalid URL').optional().nullable().or(z.literal('')),
    downloadUrl: z.string().url('Invalid URL').optional().nullable().or(z.literal('')),
    subscriptionStatus: z.enum(['active', 'expired', 'cancelled']).optional().nullable(),
    expiresAt: z.string().optional().nullable().or(z.literal('')),
    metadata: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
}).refine((data) => {
    // Validate URLs if provided
    if (data.accessUrl && data.accessUrl !== '') {
        try {
            new URL(data.accessUrl);
        }
        catch {
            return false;
        }
    }
    if (data.downloadUrl && data.downloadUrl !== '') {
        try {
            new URL(data.downloadUrl);
        }
        catch {
            return false;
        }
    }
    return true;
}, {
    message: 'Invalid URL format',
    path: ['accessUrl'],
});
export const getProductCredentialsQuerySchema = z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(100).optional().default(10),
    sortBy: z.enum(['createdAt', 'updatedAt']).optional().default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
    productId: z.string().uuid().optional(),
    productType: z.string().optional(),
    search: z.string().optional(),
});
export const getProductCredentialsParamsSchema = z.object({
    id: z.string().uuid('Invalid credentials ID'),
});
export const deleteProductCredentialsParamsSchema = z.object({
    id: z.string().uuid('Invalid credentials ID'),
});
//# sourceMappingURL=product-credentials.validation.js.map