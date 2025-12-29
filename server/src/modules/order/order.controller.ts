import { Request, Response } from 'express';
import { sendSuccess } from '../../shared/apiResponse.js';
import { asyncHandler } from '../../shared/errorHandler.js';
import { removeUndefined } from '../../lib/utils.js';
import { orderService } from './order.service.js';
import {
  createOrderSchema,
  deleteOrderParamsSchema,
  getOrderParamsSchema,
  getOrdersQuerySchema,
  updateOrderSchema,
} from './order.validation.js';

/**
 * Order Controller
 * Handles HTTP requests and responses
 */

export class OrderController {
  /**
   * Get recent orders (public endpoint)
   * GET /api/orders/recent
   */
  getRecentOrders = asyncHandler(async (req: Request, res: Response) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
    const orders = await orderService.getRecentOrders(limit);
    return sendSuccess(res, orders, 'Recent orders retrieved successfully');
  });

  /**
   * Get all orders
   * GET /api/orders
   */
  getAllOrders = asyncHandler(async (req: Request, res: Response) => {
    const query = getOrdersQuerySchema.parse(req.query);
    
    const pagination = {
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    };

    const filters: any = {
      status: query.status || undefined,
      paymentStatus: query.paymentStatus || undefined,
      search: query.search || undefined,
    };

    const result = await orderService.getAllOrders(pagination, filters);
    return sendSuccess(res, result, 'Orders retrieved successfully');
  });

  /**
   * Get single order by ID
   * GET /api/orders/:id
   */
  getOrderById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = getOrderParamsSchema.parse(req.params);
    const order = await orderService.getOrderById(id);
    return sendSuccess(res, order, 'Order retrieved successfully');
  });

  /**
   * Get order by order number
   * GET /api/orders/number/:orderNumber
   */
  getOrderByOrderNumber = asyncHandler(async (req: Request, res: Response) => {
    const { orderNumber } = req.params;
    if (!orderNumber) {
      return sendSuccess(res, null, 'Order number is required');
    }
    const order = await orderService.getOrderByOrderNumber(orderNumber);
    return sendSuccess(res, order, 'Order retrieved successfully');
  });

  /**
   * Create new order
   * POST /api/orders
   * Can be used by both authenticated and unauthenticated users
   */
  createOrder = asyncHandler(async (req: Request, res: Response) => {
    const data = createOrderSchema.parse(req.body);
    // Get userId from authenticated user if available (optional)
    const authReq = req as any;
    const userId = authReq.user?.userId || authReq.user?.id || null;
    const order = await orderService.createOrder({ ...data, userId });
    return sendSuccess(res, order, 'Order created successfully', 201);
  });

  /**
   * Update order
   * PUT /api/orders/:id
   */
  updateOrder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = getOrderParamsSchema.parse(req.params);
    const parsed = updateOrderSchema.parse(req.body);
    const data = removeUndefined(parsed) as any;
    const order = await orderService.updateOrder(id, data);
    return sendSuccess(res, order, 'Order updated successfully');
  });

  /**
   * Delete order
   * DELETE /api/orders/:id
   */
  deleteOrder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = deleteOrderParamsSchema.parse(req.params);
    await orderService.deleteOrder(id);
    return sendSuccess(res, null, 'Order deleted successfully');
  });

  /**
   * Get order statistics
   * GET /api/orders/stats
   */
  getOrderStats = asyncHandler(async (req: Request, res: Response) => {
    const stats = await orderService.getOrderStats();
    return sendSuccess(res, stats, 'Order statistics retrieved successfully');
  });

  /**
   * Get user's own orders
   * GET /api/orders/my-orders
   */
  getMyOrders = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    if (!userId) {
      return sendSuccess(res, null, 'User not authenticated', 401);
    }
    const query = getOrdersQuerySchema.parse(req.query);
    
    const pagination = {
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    };

    const filters: any = {
      status: query.status || undefined,
      paymentStatus: query.paymentStatus || undefined,
      search: query.search || undefined,
    };

    const result = await orderService.getUserOrders(userId, pagination, filters);
    return sendSuccess(res, result, 'Orders retrieved successfully');
  });
}

export const orderController = new OrderController();

