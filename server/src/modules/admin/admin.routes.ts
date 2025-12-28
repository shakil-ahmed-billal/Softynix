import { Router } from 'express';
import { adminController } from './admin.controller';
import { adminAuth, superAdminAuth } from '../../lib/auth';

/**
 * Admin Routes
 * All routes are protected by admin authentication
 */

const router = Router();

// All admin routes require authentication
router.use(adminAuth);

// Dashboard stats
router.get('/dashboard/stats', adminController.getDashboardStats);

// Admin management (super admin only for create/delete)
router.get('/admins', adminController.getAllAdmins);
router.get('/admins/:id', adminController.getAdminById);
router.post('/admins', adminController.createAdmin);
router.put('/admins/:id', adminController.updateAdmin);
router.delete('/admins/:id', superAdminAuth, adminController.deleteAdmin);

export default router;

