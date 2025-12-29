import { Request, Response } from 'express';
export declare class UserProductAccessController {
    /**
     * Get user's purchases
     * GET /api/user-product-access/purchases
     */
    getMyPurchases: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get user's AI subscriptions
     * GET /api/user-product-access/ai-subscriptions
     */
    getMyAISubscriptions: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get user's software licenses
     * GET /api/user-product-access/software-licenses
     */
    getMySoftwareLicenses: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get user's productivity apps
     * GET /api/user-product-access/productivity-apps
     */
    getMyProductivityApps: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get user's courses
     * GET /api/user-product-access/courses
     */
    getMyCourses: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get single product access
     * GET /api/user-product-access/:id
     */
    getProductAccess: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Update course progress
     * PUT /api/user-product-access/:id/course-progress
     */
    updateCourseProgress: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get lesson completions
     * GET /api/user-product-access/:id/lesson-completions
     */
    getLessonCompletions: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Complete a lesson
     * POST /api/user-product-access/:id/complete-lesson
     */
    completeLesson: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Mark lesson as viewed
     * POST /api/user-product-access/:id/view-lesson
     */
    markLessonViewed: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
export declare const userProductAccessController: UserProductAccessController;
//# sourceMappingURL=user-product-access.controller.d.ts.map