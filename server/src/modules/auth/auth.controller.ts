import { Request, Response } from 'express';
import { authService } from './auth.service';
import { sendSuccess } from '../../shared/apiResponse';
import { asyncHandler } from '../../shared/errorHandler';
import {
  signupSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema,
} from './auth.validation';

/**
 * Auth Controller
 * Handles HTTP requests and responses for authentication
 */

export class AuthController {
  /**
   * User signup
   * POST /api/auth/signup
   */
  signup = asyncHandler(async (req: Request, res: Response) => {
    const data = signupSchema.parse(req.body);
    const result = await authService.signup(data);
    return sendSuccess(res, result, 'User registered successfully', 201);
  });

  /**
   * User login
   * POST /api/auth/login
   */
  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = loginSchema.parse(req.body);
    const result = await authService.login(email, password);
    return sendSuccess(res, result, 'Login successful');
  });

  /**
   * Get user profile
   * GET /api/auth/profile
   */
  getProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    if (!userId) {
      return sendSuccess(res, null, 'User not authenticated', 401);
    }
    const user = await authService.getProfile(userId);
    return sendSuccess(res, user, 'Profile retrieved successfully');
  });

  /**
   * Update user profile
   * PUT /api/auth/profile
   */
  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    if (!userId) {
      return sendSuccess(res, null, 'User not authenticated', 401);
    }
    const data = updateProfileSchema.parse(req.body);
    const user = await authService.updateProfile(userId, data);
    return sendSuccess(res, user, 'Profile updated successfully');
  });

  /**
   * Change password
   * PUT /api/auth/change-password
   */
  changePassword = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    if (!userId) {
      return sendSuccess(res, null, 'User not authenticated', 401);
    }
    const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);
    await authService.changePassword(userId, currentPassword, newPassword);
    return sendSuccess(res, null, 'Password changed successfully');
  });

  /**
   * Admin login
   * POST /api/auth/admin/login
   */
  adminLogin = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = loginSchema.parse(req.body);
    const result = await authService.adminLogin(email, password);
    return sendSuccess(res, result, 'Admin login successful');
  });
}

export const authController = new AuthController();

