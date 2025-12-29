import { z } from 'zod';
/**
 * Product Credentials validation schemas
 */
export declare const upsertProductCredentialsSchema: z.ZodObject<{
    productId: z.ZodString;
    productType: z.ZodEnum<{
        course: "course";
        ai_subscription: "ai_subscription";
        software_license: "software_license";
        productivity_app: "productivity_app";
        utility_tool: "utility_tool";
        creative_tool: "creative_tool";
    }>;
    email: z.ZodUnion<[z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodLiteral<"">]>;
    password: z.ZodUnion<[z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodLiteral<"">]>;
    licenseKey: z.ZodUnion<[z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodLiteral<"">]>;
    accessUrl: z.ZodUnion<[z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodLiteral<"">]>;
    downloadUrl: z.ZodUnion<[z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodLiteral<"">]>;
    subscriptionStatus: z.ZodNullable<z.ZodOptional<z.ZodEnum<{
        active: "active";
        cancelled: "cancelled";
        expired: "expired";
    }>>>;
    expiresAt: z.ZodUnion<[z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodLiteral<"">]>;
    metadata: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const getProductCredentialsQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    sortBy: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        createdAt: "createdAt";
        updatedAt: "updatedAt";
    }>>>;
    sortOrder: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>>;
    productId: z.ZodOptional<z.ZodString>;
    productType: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const getProductCredentialsParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const deleteProductCredentialsParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=product-credentials.validation.d.ts.map