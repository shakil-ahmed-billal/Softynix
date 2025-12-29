import { userProductAccessService } from './user-product-access.service.js';
import { sendSuccess } from '../../shared/apiResponse.js';
import { asyncHandler } from '../../shared/errorHandler.js';
export class UserProductAccessController {
    /**
     * Get user's purchases
     * GET /api/user-product-access/purchases
     */
    getMyPurchases = asyncHandler(async (req, res) => {
        const authReq = req;
        const userId = authReq.user?.userId || authReq.user?.id;
        if (!userId) {
            return sendSuccess(res, { data: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } }, 'Purchases retrieved successfully');
        }
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder || 'desc';
        const productType = req.query.productType;
        const status = req.query.status;
        const search = req.query.search;
        const pagination = { page, limit, sortBy, sortOrder };
        const filters = {};
        if (productType !== undefined)
            filters.productType = productType;
        if (status !== undefined)
            filters.status = status;
        if (search !== undefined)
            filters.search = search;
        const result = await userProductAccessService.getUserPurchases(userId, pagination, filters);
        return sendSuccess(res, result, 'Purchases retrieved successfully');
    });
    /**
     * Get user's AI subscriptions
     * GET /api/user-product-access/ai-subscriptions
     */
    getMyAISubscriptions = asyncHandler(async (req, res) => {
        const authReq = req;
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
    getMySoftwareLicenses = asyncHandler(async (req, res) => {
        const authReq = req;
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
    getMyProductivityApps = asyncHandler(async (req, res) => {
        const authReq = req;
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
    getMyCourses = asyncHandler(async (req, res) => {
        const authReq = req;
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
    getProductAccess = asyncHandler(async (req, res) => {
        const authReq = req;
        const userId = authReq.user?.userId || authReq.user?.id;
        const { id } = req.params;
        if (!userId) {
            throw new Error('User not authenticated');
        }
        if (!id) {
            throw new Error('Product access ID is required');
        }
        const access = await userProductAccessService.getProductAccessById(id, userId);
        return sendSuccess(res, access, 'Product access retrieved successfully');
    });
    /**
     * Update course progress
     * PUT /api/user-product-access/:id/course-progress
     */
    updateCourseProgress = asyncHandler(async (req, res) => {
        const authReq = req;
        const userId = authReq.user?.userId || authReq.user?.id;
        const { id } = req.params;
        const { progress } = req.body;
        if (!userId) {
            throw new Error('User not authenticated');
        }
        if (!id) {
            throw new Error('Product access ID is required');
        }
        if (typeof progress !== 'number') {
            throw new Error('Progress must be a number');
        }
        const updated = await userProductAccessService.updateCourseProgress(id, userId, progress);
        return sendSuccess(res, updated, 'Course progress updated successfully');
    });
    /**
     * Get lesson completions
     * GET /api/user-product-access/:id/lesson-completions
     */
    getLessonCompletions = asyncHandler(async (req, res) => {
        const authReq = req;
        const userId = authReq.user?.userId || authReq.user?.id;
        const { id } = req.params;
        if (!userId) {
            throw new Error('User not authenticated');
        }
        if (!id) {
            throw new Error('Product access ID is required');
        }
        const completions = await userProductAccessService.getLessonCompletions(id, userId);
        return sendSuccess(res, completions, 'Lesson completions retrieved successfully');
    });
    /**
     * Complete a lesson
     * POST /api/user-product-access/:id/complete-lesson
     */
    completeLesson = asyncHandler(async (req, res) => {
        const authReq = req;
        const userId = authReq.user?.userId || authReq.user?.id;
        const { id } = req.params;
        const { milestoneId, moduleId } = req.body;
        if (!userId) {
            throw new Error('User not authenticated');
        }
        if (!id) {
            throw new Error('Product access ID is required');
        }
        if (typeof milestoneId !== 'number' || typeof moduleId !== 'number') {
            throw new Error('milestoneId and moduleId must be numbers');
        }
        const completion = await userProductAccessService.completeLesson(id, userId, milestoneId, moduleId);
        return sendSuccess(res, completion, 'Lesson completed successfully');
    });
    /**
     * Mark lesson as viewed
     * POST /api/user-product-access/:id/view-lesson
     */
    markLessonViewed = asyncHandler(async (req, res) => {
        const authReq = req;
        const userId = authReq.user?.userId || authReq.user?.id;
        const { id } = req.params;
        const { milestoneId, moduleId } = req.body;
        if (!userId) {
            throw new Error('User not authenticated');
        }
        if (!id) {
            throw new Error('Product access ID is required');
        }
        if (typeof milestoneId !== 'number' || typeof moduleId !== 'number') {
            throw new Error('milestoneId and moduleId must be numbers');
        }
        const completion = await userProductAccessService.markLessonViewed(id, userId, milestoneId, moduleId);
        return sendSuccess(res, completion, 'Lesson marked as viewed');
    });
}
export const userProductAccessController = new UserProductAccessController();
//# sourceMappingURL=user-product-access.controller.js.map