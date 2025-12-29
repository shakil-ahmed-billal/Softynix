import { Router } from 'express';
import { productController } from './product.controller';
import { adminAuth } from '../../lib/auth';
/**
 * Product Routes
 */
const router = Router();
// Public routes
router.get('/', productController.getAllProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/slug/:slug', productController.getProductBySlug);
router.get('/:id', productController.getProductById);
// Admin routes (protected by auth middleware)
router.post('/', adminAuth, productController.createProduct);
router.put('/:id', adminAuth, productController.updateProduct);
router.delete('/:id', adminAuth, productController.deleteProduct);
export default router;
//# sourceMappingURL=product.routes.js.map