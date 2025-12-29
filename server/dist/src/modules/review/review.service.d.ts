import { PaginationParams, FilterParams, PaginatedResponse } from '../../types/index.js';
/**
 * Review Service
 * Handles all business logic for reviews
 */
export declare class ReviewService {
    /**
     * Get all reviews with pagination and filters
     */
    getAllReviews(pagination: PaginationParams, filters: FilterParams): Promise<PaginatedResponse<any>>;
    /**
     * Get approved reviews (for homepage)
     */
    getApprovedReviews(limit?: number): Promise<any[]>;
    /**
     * Get reviews by product ID
     */
    getReviewsByProductId(productId: string): Promise<any[]>;
    /**
     * Get reviews by user ID
     */
    getReviewsByUserId(userId: string): Promise<any[]>;
    /**
     * Get single review by ID
     */
    getReviewById(id: string): Promise<any>;
    /**
     * Create new review
     */
    createReview(data: {
        userId: string;
        productId: string;
        orderId?: string | null | undefined;
        rating: number;
        comment?: string | null | undefined;
    }): Promise<any>;
    /**
     * Update review
     */
    updateReview(id: string, userId: string, data: {
        rating?: number | undefined;
        comment?: string | null | undefined;
    }): Promise<any>;
    /**
     * Delete review
     */
    deleteReview(id: string, userId: string): Promise<void>;
    /**
     * Admin: Update review status
     */
    updateReviewStatus(id: string, status: 'pending' | 'approved' | 'rejected'): Promise<any>;
}
export declare const reviewService: ReviewService;
//# sourceMappingURL=review.service.d.ts.map