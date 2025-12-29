import { Router } from 'express';
import { adminAuth, superAdminAuth } from '../../lib/auth.js';
import { adminController } from './admin.controller.js';
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
// User management
router.get('/users', adminController.getAllUsers);
export default router;
//# sourceMappingURL=admin.routes.js.map