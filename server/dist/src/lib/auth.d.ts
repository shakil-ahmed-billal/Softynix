import { Request, Response, NextFunction } from 'express';
import { TokenPayload } from './jwt.js';
/**
 * Authentication middleware for user and admin routes
 */
export interface AuthRequest extends Request {
    admin?: {
        id: string;
        email: string;
        name: string;
        role: string;
    };
    user?: TokenPayload;
}
/**
 * Admin authentication middleware
 * Checks for admin authentication token in headers
 * Supports both JWT tokens and API keys
 */
export declare const adminAuth: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * User authentication middleware
 * Verifies JWT token for regular users
 */
export declare const userAuth: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Optional user authentication middleware
 * Doesn't fail if token is missing, but attaches user if token is valid
 */
export declare const optionalUserAuth: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Optional: Super admin only middleware
 */
export declare const superAdminAuth: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.d.ts.map