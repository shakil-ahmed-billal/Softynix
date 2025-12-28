import { Request, Response } from 'express';
import { userProductAccessService } from './user-product-access.service';
import { sendSuccess } from '../../shared/apiResponse';
import { asyncHandler } from '../../shared/errorHandler';

export class UserProductAccessController {
  /**
   * Get user's purchases
   * GET /api/user-product-access/purchases
   */
  getMyPurchases = asyncHandler(async (req: Request, res: Response) => {
    const authReq = req as any;
    const userId = authReq.user?.userId || authReq.user?.id;

    if (!userId) {
      return sendSuccess(res, { data: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } }, 'Purchases retrieved successfully');
    }

    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const sortBy = (req.query.sortBy as string) || 'createdAt';
    const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || 'desc';
    const productType = req.query.productType as string | undefined;
    const status = req.query.status as string | undefined;
    const search = req.query.search as string | undefined;

    const pagination = { page, limit, sortBy, sortOrder };
    const filters = { productType, status, search };

    const result = await userProductAccessService.getUserPurchases(userId, pagination, filters);
    return sendSuccess(res, result, 'Purchases retrieved successfully');
  });

  /**
   * Get user's AI subscriptions
   * GET /api/user-product-access/ai-subscriptions
   */
  getMyAISubscriptions = asyncHandler(async (req: Request, res: Response) => {
    const authReq = req as any;
    const userId = authReq.user?.userId || authReq.user?.id;

    if (!userId) {
      return sendSuccess(res, [], 'AI subscriptions retrieved successfully');
    }

    const subscriptions = await userProductAccessService.getUserAISubscriptions(userId);
    return sendSuccess(res, subscriptions, 'AI subscriptions retrieved successfully');
  });

  /**
   * Get user's software licenses
   * GET /api/user-product-access/software-licenses
   */
  getMySoftwareLicenses = asyncHandler(async (req: Request, res: Response) => {
    const authReq = req as any;
    const userId = authReq.user?.userId || authReq.user?.id;

    if (!userId) {
      return sendSuccess(res, [], 'Software licenses retrieved successfully');
    }

    const licenses = await userProductAccessService.getUserSoftwareLicenses(userId);
    return sendSuccess(res, licenses, 'Software licenses retrieved successfully');
  });

  /**
   * Get user's productivity apps
   * GET /api/user-product-access/productivity-apps
   */
  getMyProductivityApps = asyncHandler(async (req: Request, res: Response) => {
    const authReq = req as any;
    const userId = authReq.user?.userId || authReq.user?.id;

    if (!userId) {
      return sendSuccess(res, [], 'Productivity apps retrieved successfully');
    }

    const apps = await userProductAccessService.getUserProductivityApps(userId);
    return sendSuccess(res, apps, 'Productivity apps retrieved successfully');
  });

  /**
   * Get user's courses
   * GET /api/user-product-access/courses
   */
  getMyCourses = asyncHandler(async (req: Request, res: Response) => {
    const authReq = req as any;
    const userId = authReq.user?.userId || authReq.user?.id;

    if (!userId) {
      return sendSuccess(res, [], 'Courses retrieved successfully');
    }

    const courses = await userProductAccessService.getUserCourses(userId);
    return sendSuccess(res, courses, 'Courses retrieved successfully');
  });

  /**
   * Get single product access
   * GET /api/user-product-access/:id
   */
  getProductAccess = asyncHandler(async (req: Request, res: Response) => {
    const authReq = req as any;
    const userId = authReq.user?.userId || authReq.user?.id;
    const { id } = req.params;

    if (!userId) {
      throw new Error('User not authenticated');
    }

    const access = await userProductAccessService.getProductAccessById(id, userId);
    return sendSuccess(res, access, 'Product access retrieved successfully');
  });

  /**
   * Update course progress
   * PUT /api/user-product-access/:id/course-progress
   */
  updateCourseProgress = asyncHandler(async (req: Request, res: Response) => {
    const authReq = req as any;
    const userId = authReq.user?.userId || authReq.user?.id;
    const { id } = req.params;
    const { progress } = req.body;

    if (!userId) {
      throw new Error('User not authenticated');
    }

    if (typeof progress !== 'number') {
      throw new Error('Progress must be a number');
    }

    const updated = await userProductAccessService.updateCourseProgress(id, userId, progress);
    return sendSuccess(res, updated, 'Course progress updated successfully');
  });
}

export const userProductAccessController = new UserProductAccessController();

