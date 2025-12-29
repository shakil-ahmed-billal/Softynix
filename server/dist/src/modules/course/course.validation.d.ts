import { z } from 'zod';
/**
 * Course validation schemas
 */
export declare const createCourseSchema: z.ZodObject<{
    productId: z.ZodString;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    instructor: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    duration: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    level: z.ZodNullable<z.ZodOptional<z.ZodEnum<{
        beginner: "beginner";
        intermediate: "intermediate";
        advanced: "advanced";
    }>>>;
    language: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    thumbnail: z.ZodUnion<[z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodLiteral<"">]>;
    videoUrl: z.ZodUnion<[z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodLiteral<"">]>;
    resources: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    modules: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    status: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        active: "active";
        inactive: "inactive";
    }>>>;
}, z.core.$strip>;
export declare const updateCourseSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    instructor: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    duration: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    level: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodEnum<{
        beginner: "beginner";
        intermediate: "intermediate";
        advanced: "advanced";
    }>>>>;
    language: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodString>>>;
    thumbnail: z.ZodOptional<z.ZodUnion<[z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodLiteral<"">]>>;
    videoUrl: z.ZodOptional<z.ZodUnion<[z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodLiteral<"">]>>;
    resources: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>>;
    modules: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        active: "active";
        inactive: "inactive";
    }>>>>;
    productId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const getCoursesQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    sortBy: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        status: "status";
        createdAt: "createdAt";
        title: "title";
    }>>>;
    sortOrder: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>>;
    status: z.ZodOptional<z.ZodEnum<{
        active: "active";
        inactive: "inactive";
    }>>;
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const getCourseParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const deleteCourseParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=course.validation.d.ts.map