import { Router } from 'express';
import { categoryController } from './category.controller.js';
import { adminAuth } from '../../lib/auth.js';
import { uploadSingle } from '../../lib/multer.js';

/**
 * Category Routes
 */

const router: Router = Router();

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/active', categoryController.getActiveCategories);
router.get('/slug/:slug', categoryController.getCategoryBySlug);
router.get('/:id', categoryController.getCategoryById);

// Admin routes (protected by auth middleware)
router.post('/', adminAuth, uploadSingle('image'), categoryController.createCategory);
router.put('/:id', adminAuth, uploadSingle('image'), categoryController.updateCategory);
router.delete('/:id', adminAuth, categoryController.deleteCategory);

export default router;

