import { Request, Response } from 'express';
/**
 * Order Controller
 * Handles HTTP requests and responses
 */
export declare class OrderController {
    /**
     * Get recent orders (public endpoint)
     * GET /api/orders/recent
     */
    getRecentOrders: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get all orders
     * GET /api/orders
     */
    getAllOrders: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get single order by ID
     * GET /api/orders/:id
     */
    getOrderById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get order by order number
     * GET /api/orders/number/:orderNumber
     */
    getOrderByOrderNumber: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Create new order
     * POST /api/orders
     * Can be used by both authenticated and unauthenticated users
     */
    createOrder: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Update order
     * PUT /api/orders/:id
     */
    updateOrder: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Delete order
     * DELETE /api/orders/:id
     */
    deleteOrder: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get order statistics
     * GET /api/orders/stats
     */
    getOrderStats: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get user's own orders
     * GET /api/orders/my-orders
     */
    getMyOrders: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
export declare const orderController: OrderController;
//# sourceMappingURL=order.controller.d.ts.map