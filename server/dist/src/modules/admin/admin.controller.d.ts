import { Request, Response } from 'express';
/**
 * Admin Controller
 * Handles HTTP requests and responses
 */
export declare class AdminController {
    /**
     * Get all admins
     * GET /api/admin/admins
     */
    getAllAdmins: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get single admin by ID
     * GET /api/admin/admins/:id
     */
    getAdminById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Create new admin
     * POST /api/admin/admins
     */
    createAdmin: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Update admin
     * PUT /api/admin/admins/:id
     */
    updateAdmin: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Delete admin
     * DELETE /api/admin/admins/:id
     */
    deleteAdmin: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get dashboard statistics
     * GET /api/admin/dashboard/stats
     */
    getDashboardStats: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get all users
     * GET /api/admin/users
     */
    getAllUsers: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
export declare const adminController: AdminController;
//# sourceMappingURL=admin.controller.d.ts.map