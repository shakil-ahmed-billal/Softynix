import { z } from 'zod';
import { ORDER_STATUS, PAYMENT_STATUS } from '../../shared/constants';

/**
 * Order validation schemas
 */

export const createOrderSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required').max(200),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(1, 'Phone number is required'),
  paymentMethod: z.enum(['Bkash', 'Nagad', 'Rocket', 'Upay'], {
    errorMap: () => ({ message: 'Payment method must be Bkash, Nagad, Rocket, or Upay' }),
  }),
  senderPhone: z.string().min(1, 'Sender phone number is required'),
  transactionId: z.string().min(1, 'Transaction ID is required'),
  items: z.array(
    z.object({
      productId: z.string().min(1, 'Product ID is required').trim(),
      quantity: z.coerce.number().int().positive('Quantity must be a positive integer'),
    })
  ).min(1, 'At least one item is required'),
});

export const updateOrderSchema = z.object({
  status: z.enum([
    ORDER_STATUS.PENDING,
    ORDER_STATUS.PROCESSING,
    ORDER_STATUS.SHIPPED,
    ORDER_STATUS.DELIVERED,
    ORDER_STATUS.CANCELLED,
    'completed', // Add completed status
  ]).optional(),
  paymentStatus: z.enum([
    PAYMENT_STATUS.PENDING,
    PAYMENT_STATUS.PAID,
    PAYMENT_STATUS.FAILED,
    PAYMENT_STATUS.REFUNDED,
  ]).optional(),
  shippingAddress: z.string().optional(),
  notes: z.string().optional(),
});

export const getOrdersQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  sortBy: z.string().optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  status: z.string().optional(),
  paymentStatus: z.string().optional(),
  search: z.string().optional(),
});

export const getOrderParamsSchema = z.object({
  id: z.string().uuid('Invalid order ID'),
});

export const deleteOrderParamsSchema = z.object({
  id: z.string().uuid('Invalid order ID'),
});

