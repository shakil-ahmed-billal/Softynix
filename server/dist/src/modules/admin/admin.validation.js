import { z } from 'zod';
/**
 * Admin validation schemas
 */
export const createAdminSchema = z.object({
    email: z.string().email('Invalid email address'),
    name: z.string().min(1, 'Name is required').max(200),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['admin', 'super_admin']).optional().default('admin'),
});
export const updateAdminSchema = createAdminSchema.partial().extend({
    id: z.string().uuid('Invalid admin ID'),
});
export const getAdminsQuerySchema = z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(100).optional().default(10),
    status: z.string().optional(),
    search: z.string().optional(),
});
export const getAdminParamsSchema = z.object({
    id: z.string().uuid('Invalid admin ID'),
});
//# sourceMappingURL=admin.validation.js.map