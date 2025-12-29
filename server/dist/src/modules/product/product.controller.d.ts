import { Request, Response } from 'express';
/**
 * Product Controller
 * Handles HTTP requests and responses
 */
export declare class ProductController {
    /**
     * Get all products
     * GET /api/products
     */
    getAllProducts: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get single product by ID
     * GET /api/products/:id
     */
    getProductById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get product by slug
     * GET /api/products/slug/:slug
     */
    getProductBySlug: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Create new product
     * POST /api/products
     */
    createProduct: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Update product
     * PUT /api/products/:id
     */
    updateProduct: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Delete product
     * DELETE /api/products/:id
     */
    deleteProduct: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get featured products
     * GET /api/products/featured
     */
    getFeaturedProducts: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
export declare const productController: ProductController;
//# sourceMappingURL=product.controller.d.ts.map