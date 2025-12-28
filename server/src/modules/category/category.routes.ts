import { Router } from 'express';
import { categoryController } from './category.controller';
import { adminAuth } from '../../lib/auth';

/**
 * Category Routes
 */

const router = Router();

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/active', categoryController.getActiveCategories);
router.get('/slug/:slug', categoryController.getCategoryBySlug);
router.get('/:id', categoryController.getCategoryById);

// Admin routes (protected by auth middleware)
router.post('/', adminAuth, categoryController.createCategory);
router.put('/:id', adminAuth, categoryController.updateCategory);
router.delete('/:id', adminAuth, categoryController.deleteCategory);

export default router;

