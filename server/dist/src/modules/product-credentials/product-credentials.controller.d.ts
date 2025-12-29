import { Request, Response } from 'express';
/**
 * Product Credentials Controller
 * Handles HTTP requests and responses
 */
export declare class ProductCredentialsController {
    /**
     * Get all product credentials
     * GET /api/product-credentials
     */
    getAllProductCredentials: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get credentials by product ID
     * GET /api/product-credentials/product/:productId
     */
    getCredentialsByProductId: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get single credentials by ID
     * GET /api/product-credentials/:id
     */
    getCredentialsById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Create or update product credentials
     * POST /api/product-credentials
     */
    upsertProductCredentials: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Delete product credentials
     * DELETE /api/product-credentials/:id
     */
    deleteProductCredentials: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Apply credentials to existing user access entries
     * POST /api/product-credentials/:id/apply
     */
    applyCredentialsToUsers: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
export declare const productCredentialsController: ProductCredentialsController;
//# sourceMappingURL=product-credentials.controller.d.ts.map