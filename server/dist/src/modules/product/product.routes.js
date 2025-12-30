import { Router } from 'express';
import { productController } from './product.controller.js';
import { adminAuth } from '../../lib/auth.js';
import { uploadSingle, uploadMultiple } from '../../lib/multer.js';
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
// Support both single image and multiple images upload
router.post('/', adminAuth, uploadSingle('image'), uploadMultiple('images', 10), productController.createProduct);
router.put('/:id', adminAuth, uploadSingle('image'), uploadMultiple('images', 10), productController.updateProduct);
router.delete('/:id', adminAuth, productController.deleteProduct);
export default router;
//# sourceMappingURL=product.routes.js.map