import { z } from 'zod';
/**
 * Review validation schemas
 */
export declare const createReviewSchema: z.ZodObject<{
    productId: z.ZodString;
    orderId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    rating: z.ZodNumber;
    comment: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const updateReviewSchema: z.ZodObject<{
    rating: z.ZodOptional<z.ZodNumber>;
    comment: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const updateReviewStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        pending: "pending";
        approved: "approved";
        rejected: "rejected";
    }>;
}, z.core.$strip>;
export declare const getReviewsQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    sortBy: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        createdAt: "createdAt";
        rating: "rating";
    }>>>;
    sortOrder: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>>;
    status: z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        approved: "approved";
        rejected: "rejected";
    }>>;
    productId: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const getReviewParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const deleteReviewParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=review.validation.d.ts.map