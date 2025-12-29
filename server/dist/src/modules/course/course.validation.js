import { z } from 'zod';
/**
 * Course validation schemas
 */
export const createCourseSchema = z.object({
    productId: z.string().uuid('Invalid product ID'),
    title: z.string().min(1, 'Title is required').max(200),
    description: z.string().optional().nullable(),
    instructor: z.string().optional().nullable(),
    duration: z.string().optional().nullable(),
    level: z.enum(['beginner', 'intermediate', 'advanced']).optional().nullable(),
    language: z.string().optional().default('en'),
    thumbnail: z.string().url('Invalid thumbnail URL').optional().nullable().or(z.literal('')),
    videoUrl: z.string().url('Invalid video URL').optional().nullable().or(z.literal('')),
    resources: z.array(z.string().url()).optional().default([]),
    modules: z.string().optional().nullable(), // JSON string
    status: z.enum(['active', 'inactive']).optional().default('active'),
}).refine((data) => {
    // Validate modules JSON if provided
    if (data.modules && data.modules.trim() !== '') {
        try {
            const parsed = JSON.parse(data.modules);
            // Basic validation - should have milestones array
            if (!parsed.milestones || !Array.isArray(parsed.milestones)) {
                return false;
            }
            return true;
        }
        catch {
            return false;
        }
    }
    return true;
}, {
    message: 'Invalid modules JSON format. Must contain milestones array.',
    path: ['modules'],
});
export const updateCourseSchema = createCourseSchema.partial().extend({
    productId: z.string().uuid('Invalid product ID').optional(),
});
export const getCoursesQuerySchema = z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(100).optional().default(10),
    sortBy: z.enum(['createdAt', 'title', 'status']).optional().default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
    status: z.enum(['active', 'inactive']).optional(),
    search: z.string().optional(),
});
export const getCourseParamsSchema = z.object({
    id: z.string().uuid('Invalid course ID'),
});
export const deleteCourseParamsSchema = z.object({
    id: z.string().uuid('Invalid course ID'),
});
//# sourceMappingURL=course.validation.js.map