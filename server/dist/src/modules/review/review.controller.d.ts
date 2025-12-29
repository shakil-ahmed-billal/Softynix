import { Request, Response } from 'express';
/**
 * Review Controller
 * Handles HTTP requests and responses
 */
export declare class ReviewController {
    /**
     * Get all reviews (admin)
     * GET /api/reviews
     */
    getAllReviews: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get approved reviews (public - for homepage)
     * GET /api/reviews/approved
     */
    getApprovedReviews: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get reviews by product ID (public)
     * GET /api/reviews/product/:productId
     */
    getReviewsByProductId: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get reviews by user ID
     * GET /api/reviews/user/:userId
     */
    getReviewsByUserId: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get my reviews (authenticated user)
     * GET /api/reviews/my-reviews
     */
    getMyReviews: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get single review by ID
     * GET /api/reviews/:id
     */
    getReviewById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Create new review
     * POST /api/reviews
     */
    createReview: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Update review
     * PUT /api/reviews/:id
     */
    updateReview: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Delete review
     * DELETE /api/reviews/:id
     */
    deleteReview: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Admin: Update review status
     * PUT /api/reviews/:id/status
     */
    updateReviewStatus: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
export declare const reviewController: ReviewController;
//# sourceMappingURL=review.controller.d.ts.map