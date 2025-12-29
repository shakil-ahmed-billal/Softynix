import { reviewService } from './review.service';
import { sendSuccess, sendError } from '../../shared/apiResponse';
import { asyncHandler } from '../../shared/errorHandler';
import { removeUndefined } from '../../lib/utils';
import { createReviewSchema, updateReviewSchema, updateReviewStatusSchema, getReviewsQuerySchema, getReviewParamsSchema, deleteReviewParamsSchema, } from './review.validation';
/**
 * Review Controller
 * Handles HTTP requests and responses
 */
export class ReviewController {
    /**
     * Get all reviews (admin)
     * GET /api/reviews
     */
    getAllReviews = asyncHandler(async (req, res) => {
        const query = getReviewsQuerySchema.parse(req.query);
        const pagination = {
            page: query.page,
            limit: query.limit,
            sortBy: query.sortBy,
            sortOrder: query.sortOrder,
        };
        const filters = {};
        if (query.status !== undefined)
            filters.status = query.status;
        if (query.productId !== undefined)
            filters.productId = query.productId;
        if (query.userId !== undefined)
            filters.userId = query.userId;
        if (query.search !== undefined)
            filters.search = query.search;
        const result = await reviewService.getAllReviews(pagination, filters);
        return sendSuccess(res, result, 'Reviews retrieved successfully');
    });
    /**
     * Get approved reviews (public - for homepage)
     * GET /api/reviews/approved
     */
    getApprovedReviews = asyncHandler(async (req, res) => {
        const limit = req.query.limit ? parseInt(req.query.limit) : 6;
        const reviews = await reviewService.getApprovedReviews(limit);
        return sendSuccess(res, reviews, 'Approved reviews retrieved successfully');
    });
    /**
     * Get reviews by product ID (public)
     * GET /api/reviews/product/:productId
     */
    getReviewsByProductId = asyncHandler(async (req, res) => {
        const { productId } = req.params;
        if (!productId) {
            return sendSuccess(res, [], 'Product ID is required');
        }
        const reviews = await reviewService.getReviewsByProductId(productId);
        return sendSuccess(res, reviews, 'Reviews retrieved successfully');
    });
    /**
     * Get reviews by user ID
     * GET /api/reviews/user/:userId
     */
    getReviewsByUserId = asyncHandler(async (req, res) => {
        const { userId } = req.params;
        if (!userId) {
            return sendSuccess(res, [], 'User ID is required');
        }
        const reviews = await reviewService.getReviewsByUserId(userId);
        return sendSuccess(res, reviews, 'Reviews retrieved successfully');
    });
    /**
     * Get my reviews (authenticated user)
     * GET /api/reviews/my-reviews
     */
    getMyReviews = asyncHandler(async (req, res) => {
        const userId = req.user?.userId || req.user?.id;
        if (!userId) {
            return sendSuccess(res, [], 'User not authenticated');
        }
        const reviews = await reviewService.getReviewsByUserId(userId);
        return sendSuccess(res, reviews, 'Reviews retrieved successfully');
    });
    /**
     * Get single review by ID
     * GET /api/reviews/:id
     */
    getReviewById = asyncHandler(async (req, res) => {
        const { id } = getReviewParamsSchema.parse(req.params);
        const review = await reviewService.getReviewById(id);
        return sendSuccess(res, review, 'Review retrieved successfully');
    });
    /**
     * Create new review
     * POST /api/reviews
     */
    createReview = asyncHandler(async (req, res) => {
        const userId = req.user?.userId || req.user?.id;
        if (!userId) {
            return sendError(res, 'User not authenticated', null, 401);
        }
        const parsed = createReviewSchema.parse(req.body);
        const cleanData = removeUndefined(parsed);
        const review = await reviewService.createReview({
            ...cleanData,
            userId: userId,
        });
        return sendSuccess(res, review, 'Review created successfully', 201);
    });
    /**
     * Update review
     * PUT /api/reviews/:id
     */
    updateReview = asyncHandler(async (req, res) => {
        const userId = req.user?.userId || req.user?.id;
        if (!userId) {
            return sendError(res, 'User not authenticated', null, 401);
        }
        const { id } = getReviewParamsSchema.parse(req.params);
        const parsed = updateReviewSchema.parse(req.body);
        const data = removeUndefined(parsed);
        const review = await reviewService.updateReview(id, userId, data);
        return sendSuccess(res, review, 'Review updated successfully');
    });
    /**
     * Delete review
     * DELETE /api/reviews/:id
     */
    deleteReview = asyncHandler(async (req, res) => {
        const userId = req.user?.userId || req.user?.id;
        if (!userId) {
            return sendError(res, 'User not authenticated', null, 401);
        }
        const { id } = deleteReviewParamsSchema.parse(req.params);
        await reviewService.deleteReview(id, userId);
        return sendSuccess(res, null, 'Review deleted successfully');
    });
    /**
     * Admin: Update review status
     * PUT /api/reviews/:id/status
     */
    updateReviewStatus = asyncHandler(async (req, res) => {
        const { id } = getReviewParamsSchema.parse(req.params);
        const { status } = updateReviewStatusSchema.parse(req.body);
        const review = await reviewService.updateReviewStatus(id, status);
        return sendSuccess(res, review, 'Review status updated successfully');
    });
}
export const reviewController = new ReviewController();
//# sourceMappingURL=review.controller.js.map