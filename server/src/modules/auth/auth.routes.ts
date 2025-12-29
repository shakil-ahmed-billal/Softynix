import { Router } from 'express';
import { authController } from './auth.controller.js';
import { userAuth } from '../../lib/auth.js';

/**
 * Auth Routes
 */

const router:Router = Router();

// Public routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/admin/login', authController.adminLogin);

// Protected routes (require authentication)
router.get('/profile', userAuth, authController.getProfile);
router.put('/profile', userAuth, authController.updateProfile);
router.put('/change-password', userAuth, authController.changePassword);

export default router;

