import { Router } from 'express';
import { authController } from './auth.controller';
import { userAuth } from '../../lib/auth';

/**
 * Auth Routes
 */

const router = Router();

// Public routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Protected routes (require authentication)
router.get('/profile', userAuth, authController.getProfile);
router.put('/profile', userAuth, authController.updateProfile);
router.put('/change-password', userAuth, authController.changePassword);

export default router;

