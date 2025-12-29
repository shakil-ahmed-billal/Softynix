import { z } from 'zod';
/**
 * Order validation schemas
 */
export declare const createOrderSchema: z.ZodObject<{
    customerName: z.ZodString;
    customerEmail: z.ZodString;
    customerPhone: z.ZodString;
    paymentMethod: z.ZodEnum<{
        Bkash: "Bkash";
        Nagad: "Nagad";
        Rocket: "Rocket";
        Upay: "Upay";
    }>;
    senderPhone: z.ZodString;
    transactionId: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        productId: z.ZodString;
        quantity: z.ZodCoercedNumber<unknown>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const updateOrderSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        completed: "completed";
        processing: "processing";
        shipped: "shipped";
        delivered: "delivered";
        cancelled: "cancelled";
    }>>;
    paymentStatus: z.ZodOptional<z.ZodEnum<{
        paid: "paid";
        pending: "pending";
        failed: "failed";
        refunded: "refunded";
    }>>;
    shippingAddress: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const getOrdersQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    sortBy: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    sortOrder: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>>;
    status: z.ZodOptional<z.ZodString>;
    paymentStatus: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const getOrderParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const deleteOrderParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=order.validation.d.ts.map