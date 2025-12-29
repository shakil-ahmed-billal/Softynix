import { z } from 'zod';
/**
 * Admin validation schemas
 */
export declare const createAdminSchema: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodString;
    password: z.ZodString;
    role: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        admin: "admin";
        super_admin: "super_admin";
    }>>>;
}, z.core.$strip>;
export declare const updateAdminSchema: z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        admin: "admin";
        super_admin: "super_admin";
    }>>>>;
    id: z.ZodString;
}, z.core.$strip>;
export declare const getAdminsQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    status: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const getAdminParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=admin.validation.d.ts.map