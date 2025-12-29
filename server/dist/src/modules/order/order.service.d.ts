import { FilterParams, PaginatedResponse, PaginationParams } from '../../types';
/**
 * Order Service
 * Handles all business logic for orders
 */
export declare class OrderService {
    /**
     * Generate unique order number
     */
    private generateOrderNumber;
    /**
     * Determine product type from category name/slug
     */
    private determineProductType;
    /**
     * Create UserProductAccess entries for order items
     */
    private createUserProductAccess;
    /**
     * Get user's orders
     */
    getUserOrders(userId: string, pagination: PaginationParams, filters: FilterParams): Promise<PaginatedResponse<any>>;
    /**
     * Get all orders with pagination and filters
     */
    getAllOrders(pagination: PaginationParams, filters: FilterParams): Promise<PaginatedResponse<any>>;
    /**
     * Get recent orders (public, limited data)
     */
    getRecentOrders(limit?: number): Promise<any[]>;
    /**
     * Get single order by ID
     */
    getOrderById(id: string): Promise<any>;
    /**
     * Get order by order number
     */
    getOrderByOrderNumber(orderNumber: string): Promise<any>;
    /**
     * Create new order
     */
    createOrder(data: {
        userId?: string;
        customerName: string;
        customerEmail: string;
        customerPhone: string;
        paymentMethod: string;
        senderPhone: string;
        transactionId: string;
        items: Array<{
            productId: string;
            quantity: number;
        }>;
    }): Promise<any>;
    /**
     * Update order
     */
    updateOrder(id: string, data: {
        status?: string;
        paymentStatus?: string;
        shippingAddress?: string;
        notes?: string;
    }): Promise<any>;
    /**
     * Delete order (soft delete by cancelling)
     */
    deleteOrder(id: string): Promise<void>;
    /**
     * Get order statistics
     */
    getOrderStats(): Promise<any>;
}
export declare const orderService: OrderService;
//# sourceMappingURL=order.service.d.ts.map