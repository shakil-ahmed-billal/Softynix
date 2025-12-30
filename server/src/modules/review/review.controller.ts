import { Request, Response } from 'express';
import { reviewService } from './review.service.js';
import { sendSuccess, sendError } from '../../shared/apiResponse.js';
import { asyncHandler } from '../../shared/errorHandler.js';
import { removeUndefined } from '../../lib/utils.js';
import { uploadToCloudinary, extractPublicIdFromUrl, deleteFromCloudinary } from '../../lib/cloudinary.js';
import {
  createReviewSchema,
  updateReviewSchema,
  updateReviewStatusSchema,
  getReviewsQuerySchema,
  getReviewParamsSchema,
  deleteReviewParamsSchema,
} from './review.validation.js';

/**
 * Review Controller
 * Handles HTTP requests and responses
 */

export class ReviewController {
  /**
   * Get all reviews (admin)
   * GET /api/reviews
   */
  getAllReviews = asyncHandler(async (req: Request, res: Response) => {
    const query = getReviewsQuerySchema.parse(req.query);
    
    const pagination = {
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    };

    const filters: { status?: string; productId?: string; userId?: string; search?: string } = {};
    if (query.status !== undefined) filters.status = query.status;
    if (query.productId !== undefined) filters.productId = query.productId;
    if (query.userId !== undefined) filters.userId = query.userId;
    if (query.search !== undefined) filters.search = query.search;

    const result = await reviewService.getAllReviews(pagination, filters);
    return sendSuccess(res, result, 'Reviews retrieved successfully');
  });

  /**
   * Get approved reviews (public - for homepage)
   * GET /api/reviews/approved
   */
  getApprovedReviews = asyncHandler(async (req: Request, res: Response) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 6;
    const reviews = await reviewService.getApprovedReviews(limit);
    return sendSuccess(res, reviews, 'Approved reviews retrieved successfully');
  });

  /**
   * Get reviews by product ID (public)
   * GET /api/reviews/product/:productId
   */
  getReviewsByProductId = asyncHandler(async (req: Request, res: Response) => {
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
  getReviewsByUserId = asyncHandler(async (req: Request, res: Response) => {
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
  getMyReviews = asyncHandler(async (req: any, res: Response) => {
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
  getReviewById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = getReviewParamsSchema.parse(req.params);
    const review = await reviewService.getReviewById(id);
    return sendSuccess(res, review, 'Review retrieved successfully');
  });

  /**
   * Create new review
   * POST /api/reviews
   */
  createReview = asyncHandler(async (req: any, res: Response) => {
    const userId = req.user?.userId || req.user?.id;
    if (!userId) {
      return sendError(res, 'User not authenticated', null, 401);
    }

    let imageUrl: string | undefined;

    // Handle image upload
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'reviews');
      imageUrl = uploadResult.secure_url;
    } else if (req.body.image) {
      // If image URL is provided, upload it to Cloudinary
      if (req.body.image.startsWith('http')) {
        try {
          const uploadResult = await uploadToCloudinary(req.body.image, 'reviews');
          imageUrl = uploadResult.secure_url;
        } catch (error) {
          imageUrl = req.body.image;
        }
      } else {
        imageUrl = req.body.image;
      }
    }

    const parsed = createReviewSchema.parse({
      ...req.body,
      image: imageUrl,
    });
    const cleanData = removeUndefined(parsed) as typeof parsed;
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
  updateReview = asyncHandler(async (req: any, res: Response) => {
    const userId = req.user?.userId || req.user?.id;
    if (!userId) {
      return sendError(res, 'User not authenticated', null, 401);
    }
    const { id } = getReviewParamsSchema.parse(req.params);
    
    // Get existing review to check for old image
    const existingReview = await reviewService.getReviewById(id);
    
    let imageUrl: string | undefined;

    // Handle image upload
    if (req.file) {
      // Delete old image from Cloudinary if it exists
      if (existingReview.image) {
        const oldPublicId = extractPublicIdFromUrl(existingReview.image);
        if (oldPublicId) {
          try {
            await deleteFromCloudinary(oldPublicId);
          } catch (error) {
            console.error('Error deleting old image:', error);
          }
        }
      }
      
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'reviews');
      imageUrl = uploadResult.secure_url;
    } else if (req.body.image !== undefined) {
      if (req.body.image === '' || req.body.image === null) {
        // Delete old image if empty string or null
        if (existingReview.image) {
          const oldPublicId = extractPublicIdFromUrl(existingReview.image);
          if (oldPublicId) {
            try {
              await deleteFromCloudinary(oldPublicId);
            } catch (error) {
              console.error('Error deleting old image:', error);
            }
          }
        }
        imageUrl = undefined;
      } else if (req.body.image.startsWith('http') && !req.body.image.includes('cloudinary.com')) {
        // Upload new URL to Cloudinary
        try {
          const uploadResult = await uploadToCloudinary(req.body.image, 'reviews');
          imageUrl = uploadResult.secure_url;
        } catch (error) {
          imageUrl = req.body.image;
        }
      } else {
        imageUrl = req.body.image;
      }
    }

    const parsed = updateReviewSchema.parse({
      ...req.body,
      ...(imageUrl !== undefined && { image: imageUrl }),
    });
    const data = removeUndefined(parsed) as typeof parsed;
    const review = await reviewService.updateReview(id, userId, data);
    return sendSuccess(res, review, 'Review updated successfully');
  });

  /**
   * Delete review
   * DELETE /api/reviews/:id
   */
  deleteReview = asyncHandler(async (req: any, res: Response) => {
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
  updateReviewStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = getReviewParamsSchema.parse(req.params);
    const { status } = updateReviewStatusSchema.parse(req.body);
    const review = await reviewService.updateReviewStatus(id, status);
    return sendSuccess(res, review, 'Review status updated successfully');
  });
}

export const reviewController = new ReviewController();

