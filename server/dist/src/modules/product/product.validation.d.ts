import { z } from 'zod';
/**
 * Product validation schemas
 */
export declare const createProductSchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    price: z.ZodNumber;
    image: z.ZodUnion<[z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodLiteral<"">]>;
    images: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    categoryId: z.ZodString;
    status: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        active: "active";
        inactive: "inactive";
        out_of_stock: "out_of_stock";
    }>>>;
    stock: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    featured: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const updateProductSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    price: z.ZodOptional<z.ZodNumber>;
    image: z.ZodOptional<z.ZodUnion<[z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodLiteral<"">]>>;
    images: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>>;
    categoryId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        active: "active";
        inactive: "inactive";
        out_of_stock: "out_of_stock";
    }>>>>;
    stock: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodNumber>>>;
    featured: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodBoolean>>>;
    id: z.ZodString;
}, z.core.$strip>;
export declare const getProductsQuerySchema: z.ZodPipe<z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    sortBy: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    sortOrder: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>>;
    status: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    featured: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>, z.ZodTransform<{
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
    status?: string | undefined;
    featured?: boolean | undefined;
    search?: string | undefined;
}, {
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
    status?: string | undefined;
    categoryId?: string | undefined;
    featured?: boolean | undefined;
    search?: string | undefined;
}>>;
export declare const getProductParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const deleteProductParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=product.validation.d.ts.map