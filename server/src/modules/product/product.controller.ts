import { Request, Response } from 'express';
import { productService } from './product.service';
import { sendSuccess, sendError } from '../../shared/apiResponse';
import { asyncHandler } from '../../shared/errorHandler';
import {
  createProductSchema,
  updateProductSchema,
  getProductsQuerySchema,
  getProductParamsSchema,
  deleteProductParamsSchema,
} from './product.validation';

/**
 * Product Controller
 * Handles HTTP requests and responses
 */

export class ProductController {
  /**
   * Get all products
   * GET /api/products
   */
  getAllProducts = asyncHandler(async (req: Request, res: Response) => {
    const query = getProductsQuerySchema.parse(req.query);
    
    const pagination = {
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    };

    const filters = {
      status: query.status,
      categoryId: query.categoryId,
      featured: query.featured,
      search: query.search,
    };

    const result = await productService.getAllProducts(pagination, filters);
    return sendSuccess(res, result, 'Products retrieved successfully');
  });

  /**
   * Get single product by ID
   * GET /api/products/:id
   */
  getProductById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = getProductParamsSchema.parse(req.params);
    const product = await productService.getProductById(id);
    return sendSuccess(res, product, 'Product retrieved successfully');
  });

  /**
   * Get product by slug
   * GET /api/products/slug/:slug
   */
  getProductBySlug = asyncHandler(async (req: Request, res: Response) => {
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
  createProduct = asyncHandler(async (req: Request, res: Response) => {
    const data = createProductSchema.parse(req.body);
    const product = await productService.createProduct(data);
    return sendSuccess(res, product, 'Product created successfully', 201);
  });

  /**
   * Update product
   * PUT /api/products/:id
   */
  updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = getProductParamsSchema.parse(req.params);
    const data = updateProductSchema.parse({ ...req.body, id });
    const product = await productService.updateProduct(id, data);
    return sendSuccess(res, product, 'Product updated successfully');
  });

  /**
   * Delete product
   * DELETE /api/products/:id
   */
  deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = deleteProductParamsSchema.parse(req.params);
    await productService.deleteProduct(id);
    return sendSuccess(res, null, 'Product deleted successfully');
  });

  /**
   * Get featured products
   * GET /api/products/featured
   */
  getFeaturedProducts = asyncHandler(async (req: Request, res: Response) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const products = await productService.getFeaturedProducts(limit);
    return sendSuccess(res, products, 'Featured products retrieved successfully');
  });
}

export const productController = new ProductController();

