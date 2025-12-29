import { Request, Response } from 'express';
/**
 * Category Controller
 * Handles HTTP requests and responses
 */
export declare class CategoryController {
    /**
     * Get all categories
     * GET /api/categories
     */
    getAllCategories: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get active categories (public)
     * GET /api/categories/active
     */
    getActiveCategories: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get single category by ID
     * GET /api/categories/:id
     */
    getCategoryById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get category by slug
     * GET /api/categories/slug/:slug
     */
    getCategoryBySlug: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Create new category
     * POST /api/categories
     */
    createCategory: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Update category
     * PUT /api/categories/:id
     */
    updateCategory: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Delete category
     * DELETE /api/categories/:id
     */
    deleteCategory: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
export declare const categoryController: CategoryController;
//# sourceMappingURL=category.controller.d.ts.map