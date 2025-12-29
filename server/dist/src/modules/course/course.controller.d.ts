import { Request, Response } from 'express';
/**
 * Course Controller
 * Handles HTTP requests and responses
 */
export declare class CourseController {
    /**
     * Get all courses
     * GET /api/courses
     */
    getAllCourses: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get single course by ID
     * GET /api/courses/:id
     */
    getCourseById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get course by product ID
     * GET /api/courses/product/:productId
     */
    getCourseByProductId: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Create new course
     * POST /api/courses
     */
    createCourse: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Update course
     * PUT /api/courses/:id
     */
    updateCourse: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Delete course
     * DELETE /api/courses/:id
     */
    deleteCourse: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
export declare const courseController: CourseController;
//# sourceMappingURL=course.controller.d.ts.map