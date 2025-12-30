import { productService } from './product.service.js';
import { sendSuccess, sendError } from '../../shared/apiResponse.js';
import { asyncHandler } from '../../shared/errorHandler.js';
import { removeUndefined } from '../../lib/utils.js';
import { uploadToCloudinary, uploadMultipleToCloudinary, extractPublicIdFromUrl, deleteFromCloudinary } from '../../lib/cloudinary.js';
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
        let imageUrl;
        let imagesUrls = [];
        // Handle single image upload
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'products');
            imageUrl = uploadResult.secure_url;
        }
        else if (req.body.image) {
            // If image URL is provided (for backward compatibility or direct URL)
            // Check if it's already a Cloudinary URL, if not, upload it
            if (req.body.image.startsWith('http')) {
                // If it's a URL, we can either use it directly or upload to Cloudinary
                // For now, we'll upload it to Cloudinary to ensure consistency
                try {
                    const uploadResult = await uploadToCloudinary(req.body.image, 'products');
                    imageUrl = uploadResult.secure_url;
                }
                catch (error) {
                    // If upload fails, use the provided URL
                    imageUrl = req.body.image;
                }
            }
            else {
                imageUrl = req.body.image;
            }
        }
        // Handle multiple images upload
        if (req.files && Array.isArray(req.files) && req.files.length > 0) {
            const files = req.files;
            const uploadResults = await uploadMultipleToCloudinary(files.map(f => f.buffer), 'products');
            imagesUrls = uploadResults.map(r => r.secure_url);
        }
        else if (req.body.images && Array.isArray(req.body.images)) {
            // If images array is provided, upload each URL to Cloudinary
            const uploadPromises = req.body.images.map(async (img) => {
                if (img.startsWith('http')) {
                    try {
                        const uploadResult = await uploadToCloudinary(img, 'products');
                        return uploadResult.secure_url;
                    }
                    catch {
                        return img;
                    }
                }
                return img;
            });
            imagesUrls = await Promise.all(uploadPromises);
        }
        const parsed = createProductSchema.parse({
            ...req.body,
            image: imageUrl,
            images: imagesUrls.length > 0 ? imagesUrls : undefined,
        });
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
        // Get existing product to check for old images
        const existingProduct = await productService.getProductById(id);
        let imageUrl;
        let imagesUrls;
        // Handle single image upload
        if (req.file) {
            // Delete old image from Cloudinary if it exists
            if (existingProduct.image) {
                const oldPublicId = extractPublicIdFromUrl(existingProduct.image);
                if (oldPublicId) {
                    try {
                        await deleteFromCloudinary(oldPublicId);
                    }
                    catch (error) {
                        console.error('Error deleting old image:', error);
                    }
                }
            }
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'products');
            imageUrl = uploadResult.secure_url;
        }
        else if (req.body.image !== undefined) {
            if (req.body.image === '' || req.body.image === null) {
                // Delete old image if empty string or null
                if (existingProduct.image) {
                    const oldPublicId = extractPublicIdFromUrl(existingProduct.image);
                    if (oldPublicId) {
                        try {
                            await deleteFromCloudinary(oldPublicId);
                        }
                        catch (error) {
                            console.error('Error deleting old image:', error);
                        }
                    }
                }
                imageUrl = undefined;
            }
            else if (req.body.image.startsWith('http') && !req.body.image.includes('cloudinary.com')) {
                // Upload new URL to Cloudinary
                try {
                    const uploadResult = await uploadToCloudinary(req.body.image, 'products');
                    imageUrl = uploadResult.secure_url;
                }
                catch (error) {
                    imageUrl = req.body.image;
                }
            }
            else {
                imageUrl = req.body.image;
            }
        }
        // Handle multiple images upload
        if (req.files && Array.isArray(req.files) && req.files.length > 0) {
            const files = req.files;
            const uploadResults = await uploadMultipleToCloudinary(files.map(f => f.buffer), 'products');
            imagesUrls = uploadResults.map(r => r.secure_url);
        }
        else if (req.body.images !== undefined) {
            if (Array.isArray(req.body.images)) {
                const uploadPromises = req.body.images.map(async (img) => {
                    if (img.startsWith('http') && !img.includes('cloudinary.com')) {
                        try {
                            const uploadResult = await uploadToCloudinary(img, 'products');
                            return uploadResult.secure_url;
                        }
                        catch {
                            return img;
                        }
                    }
                    return img;
                });
                imagesUrls = await Promise.all(uploadPromises);
            }
        }
        const parsed = updateProductSchema.parse({
            ...req.body,
            id,
            ...(imageUrl !== undefined && { image: imageUrl }),
            ...(imagesUrls !== undefined && { images: imagesUrls }),
        });
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