import { prisma } from './prisma.js';
import { sendError } from '../shared/apiResponse.js';
import { AppError } from '../shared/errorHandler.js';
import { verifyToken, extractToken } from './jwt.js';
/**
 * Admin authentication middleware
 * Checks for admin authentication token in headers
 * Supports both JWT tokens and API keys
 */
export const adminAuth = async (req, res, next) => {
    try {
        // Get token from header
        const token = extractToken(req.headers.authorization);
        if (!token) {
            throw new AppError('Authentication required', 401);
        }
        // First, try to verify as JWT token
        try {
            const payload = verifyToken(token);
            // Check if token is for an admin
            if (payload.type === 'admin') {
                // Verify admin exists and is active
                const admin = await prisma.adminUser.findUnique({
                    where: { id: payload.userId },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        role: true,
                        status: true,
                    },
                });
                if (!admin) {
                    throw new AppError('Admin not found', 401);
                }
                if (admin.status !== 'active') {
                    throw new AppError('Admin account is inactive', 403);
                }
                // Attach admin to request
                req.admin = {
                    id: admin.id,
                    email: admin.email,
                    name: admin.name,
                    role: admin.role,
                };
                next();
                return;
            }
        }
        catch (jwtError) {
            // JWT verification failed, try API key fallback
        }
        // Fallback: Check if token matches admin API key from env
        const adminApiKey = process.env.ADMIN_API_KEY;
        if (adminApiKey && token === adminApiKey) {
            // If API key matches, get first active admin
            const admin = await prisma.adminUser.findFirst({
                where: {
                    status: 'active',
                },
            });
            if (admin) {
                req.admin = {
                    id: admin.id,
                    email: admin.email,
                    name: admin.name,
                    role: admin.role,
                };
                next();
                return;
            }
        }
        throw new AppError('Invalid authentication token', 401);
    }
    catch (error) {
        if (error instanceof AppError) {
            sendError(res, error.message, null, error.statusCode);
        }
        else {
            sendError(res, 'Authentication failed', null, 401);
        }
    }
};
/**
 * User authentication middleware
 * Verifies JWT token for regular users
 */
export const userAuth = async (req, res, next) => {
    try {
        // Extract token from header
        const token = extractToken(req.headers.authorization);
        if (!token) {
            throw new AppError('Authentication required', 401);
        }
        // Verify token
        const payload = verifyToken(token);
        // Check if token is for a user (not admin)
        if (payload.type !== 'user') {
            throw new AppError('Invalid token type', 401);
        }
        // Verify user exists and is active
        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: {
                id: true,
                email: true,
                status: true,
            },
        });
        if (!user) {
            throw new AppError('User not found', 401);
        }
        if (user.status !== 'active') {
            throw new AppError('Account is inactive', 403);
        }
        // Attach user to request
        req.user = payload;
        next();
    }
    catch (error) {
        if (error instanceof AppError) {
            sendError(res, error.message, null, error.statusCode);
        }
        else if (error instanceof Error) {
            sendError(res, error.message, null, 401);
        }
        else {
            sendError(res, 'Authentication failed', null, 401);
        }
    }
};
/**
 * Optional user authentication middleware
 * Doesn't fail if token is missing, but attaches user if token is valid
 */
export const optionalUserAuth = async (req, res, next) => {
    try {
        const token = extractToken(req.headers.authorization);
        if (!token) {
            // No token provided, continue without authentication
            next();
            return;
        }
        // Try to verify token
        try {
            const payload = verifyToken(token);
            // Check if token is for a user (not admin)
            if (payload.type === 'user') {
                // Verify user exists and is active
                const user = await prisma.user.findUnique({
                    where: { id: payload.userId },
                    select: {
                        id: true,
                        email: true,
                        status: true,
                    },
                });
                if (user && user.status === 'active') {
                    // Attach user to request
                    req.user = payload;
                }
            }
        }
        catch (error) {
            // Token is invalid, but we don't fail - just continue without user
            // This allows unauthenticated requests to proceed
        }
        next();
    }
    catch (error) {
        // Any unexpected error - continue without authentication
        next();
    }
};
/**
 * Optional: Super admin only middleware
 */
export const superAdminAuth = async (req, res, next) => {
    await adminAuth(req, res, () => {
        if (req.admin?.role !== 'super_admin') {
            sendError(res, 'Super admin access required', null, 403);
            return;
        }
        next();
    });
};
//# sourceMappingURL=auth.js.map