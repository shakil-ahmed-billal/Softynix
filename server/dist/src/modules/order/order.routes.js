import { Router } from 'express';
import { orderController } from './order.controller';
import { adminAuth, userAuth, optionalUserAuth } from '../../lib/auth';
/**
 * Order Routes
 */
const router = Router();
// Public routes (create order - can be used by anyone, but will link to user if authenticated)
router.post('/', optionalUserAuth, orderController.createOrder);
router.get('/number/:orderNumber', orderController.getOrderByOrderNumber);
// Public route for recent orders (limited data)
router.get('/recent', orderController.getRecentOrders);
// User routes (get own orders)
router.get('/my-orders', userAuth, orderController.getMyOrders);
// Admin routes (protected by auth middleware)
// Note: Order matters - GET / must come before GET /:id to avoid route conflicts
router.get('/stats', adminAuth, orderController.getOrderStats);
router.get('/', adminAuth, orderController.getAllOrders);
// Public and admin routes with parameters (must come after specific routes)
router.get('/:id', orderController.getOrderById);
router.put('/:id', adminAuth, orderController.updateOrder);
router.delete('/:id', adminAuth, orderController.deleteOrder);
export default router;
//# sourceMappingURL=order.routes.js.map