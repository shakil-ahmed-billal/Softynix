import { Request, Response } from 'express';
import { sendSuccess } from '../../shared/apiResponse.js';
import { asyncHandler } from '../../shared/errorHandler.js';
import { removeUndefined } from '../../lib/utils.js';
import { adminService } from './admin.service.js';
import {
  createAdminSchema,
  getAdminParamsSchema,
  getAdminsQuerySchema,
  updateAdminSchema,
} from './admin.validation.js';

/**
 * Admin Controller
 * Handles HTTP requests and responses
 */

export class AdminController {
  /**
   * Get all admins
   * GET /api/admin/admins
   */
  getAllAdmins = asyncHandler(async (req: Request, res: Response) => {
    const query = getAdminsQuerySchema.parse(req.query);
    
    const pagination = {
      page: query.page,
      limit: query.limit,
    };

    const filters: { status?: string; search?: string } = {};
    if (query.status !== undefined) filters.status = query.status;
    if (query.search !== undefined) filters.search = query.search;

    const result = await adminService.getAllAdmins(pagination, filters);
    return sendSuccess(res, result, 'Admins retrieved successfully');
  });

  /**
   * Get single admin by ID
   * GET /api/admin/admins/:id
   */
  getAdminById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = getAdminParamsSchema.parse(req.params);
    const admin = await adminService.getAdminById(id);
    return sendSuccess(res, admin, 'Admin retrieved successfully');
  });

  /**
   * Create new admin
   * POST /api/admin/admins
   */
  createAdmin = asyncHandler(async (req: Request, res: Response) => {
    const data = createAdminSchema.parse(req.body);
    const admin = await adminService.createAdmin(data);
    return sendSuccess(res, admin, 'Admin created successfully', 201);
  });

  /**
   * Update admin
   * PUT /api/admin/admins/:id
   */
  updateAdmin = asyncHandler(async (req: Request, res: Response) => {
    const { id } = getAdminParamsSchema.parse(req.params);
    const parsed = updateAdminSchema.parse({ ...req.body, id });
    const data = removeUndefined(parsed) as typeof parsed;
    const admin = await adminService.updateAdmin(id, data);
    return sendSuccess(res, admin, 'Admin updated successfully');
  });

  /**
   * Delete admin
   * DELETE /api/admin/admins/:id
   */
  deleteAdmin = asyncHandler(async (req: Request, res: Response) => {
    const { id } = getAdminParamsSchema.parse(req.params);
    await adminService.deleteAdmin(id);
    return sendSuccess(res, null, 'Admin deleted successfully');
  });

  /**
   * Get dashboard statistics
   * GET /api/admin/dashboard/stats
   */
  getDashboardStats = asyncHandler(async (req: Request, res: Response) => {
    const stats = await adminService.getDashboardStats();
    return sendSuccess(res, stats, 'Dashboard statistics retrieved successfully');
  });

  /**
   * Get all users
   * GET /api/admin/users
   */
  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const query = getAdminsQuerySchema.parse(req.query);
    
    const pagination = {
      page: query.page,
      limit: query.limit,
    };

    const filters: { status?: string; search?: string } = {};
    if (query.status !== undefined) filters.status = query.status;
    if (query.search !== undefined) filters.search = query.search;

    const result = await adminService.getAllUsers(pagination, filters);
    return sendSuccess(res, result, 'Users retrieved successfully');
  });
}

export const adminController = new AdminController();

