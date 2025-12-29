import { productService } from './product.service.js';
import { sendSuccess, sendError } from '../../shared/apiResponse.js';
import { asyncHandler } from '../../shared/errorHandler.js';
import { removeUndefined } from '../../lib/utils.js';
import { createProductSchema, updateProductSchema, getProductsQuerySchema, getProductParamsSchema, deleteProductParamsSchema, } from './product.validation.js';
/**
 * Product Controller
 * Handles HTTP requests and responses
 */
export class ProductController {
    /**
     * Get all products
     * GET /api/products
     */
    getAllProducts = asyncHandler(async (req, res) => {
        const query = getProductsQuerySchema.parse(req.query);
        const rawQuery = req.query;
        const pagination = {
            page: query.page,
            limit: query.limit,
            sortBy: query.sortBy,
            sortOrder: query.sortOrder,
        };
        const filters = {};
        if (query.status !== undefined)
            filters.status = query.status;
        if (rawQuery.categoryId && typeof rawQuery.categoryId === 'string' && rawQuery.categoryId !== '') {
            filters.categoryId = rawQuery.categoryId;
        }
        if (query.featured !== undefined)
            filters.featured = query.featured;
        if (query.search !== undefined)
            filters.search = query.search;
        const result = await productService.getAllProducts(pagination, filters);
        return sendSuccess(res, result, 'Products retrieved successfully');
    });
    /**
     * Get single product by ID
     * GET /api/products/:id
     */
    getProductById = asyncHandler(async (req, res) => {
        const { id } = getProductParamsSchema.parse(req.params);
        const product = await productService.getProductById(id);
        return sendSuccess(res, product, 'Product retrieved successfully');
    });
    /**
     * Get product by slug
     * GET /api/products/slug/:slug
     */
    getProductBySlug = asyncHandler(async (req, res) => {
        const { slug } = req.params;
        if (!slug) {
            return sendError(res, 'Slug is required', null, 400);
        }
        const product = await productService.getProductBySlug(slug);
        return sendSuccess(res, product, 'Product retrieved successfully');
    });
    /**
     * Create new product
     * POST /api/products
     */
    createProduct = asyncHandler(async (req, res) => {
        const parsed = createProductSchema.parse(req.body);
        const data = removeUndefined(parsed);
        const product = await productService.createProduct(data);
        return sendSuccess(res, product, 'Product created successfully', 201);
    });
    /**
     * Update product
     * PUT /api/products/:id
     */
    updateProduct = asyncHandler(async (req, res) => {
        const { id } = getProductParamsSchema.parse(req.params);
        const parsed = updateProductSchema.parse({ ...req.body, id });
        const data = removeUndefined(parsed);
        const product = await productService.updateProduct(id, data);
        return sendSuccess(res, product, 'Product updated successfully');
    });
    /**
     * Delete product
     * DELETE /api/products/:id
     */
    deleteProduct = asyncHandler(async (req, res) => {
        const { id } = deleteProductParamsSchema.parse(req.params);
        await productService.deleteProduct(id);
        return sendSuccess(res, null, 'Product deleted successfully');
    });
    /**
     * Get featured products
     * GET /api/products/featured
     */
    getFeaturedProducts = asyncHandler(async (req, res) => {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const products = await productService.getFeaturedProducts(limit);
        return sendSuccess(res, products, 'Featured products retrieved successfully');
    });
}
export const productController = new ProductController();
//# sourceMappingURL=product.controller.js.map