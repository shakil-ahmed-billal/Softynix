interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
interface FilterParams {
    productType?: string;
    status?: string;
    search?: string;
}
interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
/**
 * User Product Access Service
 * Handles all business logic for user product access
 */
export declare class UserProductAccessService {
    /**
     * Get user's purchased products with access details
     */
    getUserPurchases(userId: string, pagination?: PaginationParams, filters?: FilterParams): Promise<PaginatedResponse<any>>;
    /**
     * Get user's AI subscriptions
     */
    getUserAISubscriptions(userId: string): Promise<any[]>;
    /**
     * Get user's software licenses
     */
    getUserSoftwareLicenses(userId: string): Promise<any[]>;
    /**
     * Get user's productivity apps
     */
    getUserProductivityApps(userId: string): Promise<any[]>;
    /**
     * Get user's courses
     */
    getUserCourses(userId: string): Promise<any[]>;
    /**
     * Get single product access by ID
     */
    getProductAccessById(accessId: string, userId: string): Promise<any>;
    /**
     * Update course progress
     */
    updateCourseProgress(accessId: string, userId: string, progress: number): Promise<any>;
    /**
     * Get lesson completions for a course access
     */
    getLessonCompletions(accessId: string, userId: string): Promise<any[]>;
    /**
     * Complete a lesson
     */
    completeLesson(accessId: string, userId: string, milestoneId: number, moduleId: number): Promise<any>;
    /**
     * Mark lesson as viewed
     */
    markLessonViewed(accessId: string, userId: string, milestoneId: number, moduleId: number): Promise<any>;
}
export declare const userProductAccessService: UserProductAccessService;
export {};
//# sourceMappingURL=user-product-access.service.d.ts.map