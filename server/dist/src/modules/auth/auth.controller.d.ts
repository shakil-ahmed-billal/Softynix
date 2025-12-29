import { Request, Response } from 'express';
/**
 * Auth Controller
 * Handles HTTP requests and responses for authentication
 */
export declare class AuthController {
    /**
     * User signup
     * POST /api/auth/signup
     */
    signup: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * User login
     * POST /api/auth/login
     */
    login: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get user profile
     * GET /api/auth/profile
     */
    getProfile: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Update user profile
     * PUT /api/auth/profile
     */
    updateProfile: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Change password
     * PUT /api/auth/change-password
     */
    changePassword: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Admin login
     * POST /api/auth/admin/login
     */
    adminLogin: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
export declare const authController: AuthController;
//# sourceMappingURL=auth.controller.d.ts.map