import { categoryService } from './category.service.js';
import { sendSuccess } from '../../shared/apiResponse.js';
import { asyncHandler } from '../../shared/errorHandler.js';
import { removeUndefined } from '../../lib/utils.js';
import { uploadToCloudinary, extractPublicIdFromUrl, deleteFromCloudinary } from '../../lib/cloudinary.js';
import { createCategorySchema, updateCategorySchema, getCategoriesQuerySchema, getCategoryParamsSchema, deleteCategoryParamsSchema, } from './category.validation.js';
/**
 * Category Controller
 * Handles HTTP requests and responses
 */
export class CategoryController {
    /**
     * Get all categories
     * GET /api/categories
     */
    getAllCategories = asyncHandler(async (req, res) => {
        const query = getCategoriesQuerySchema.parse(req.query);
        const pagination = {
            page: query.page,
            limit: query.limit,
            sortBy: query.sortBy,
            sortOrder: query.sortOrder,
        };
        const filters = {};
        if (query.status !== undefined)
            filters.status = query.status;
        if (query.search !== undefined)
            filters.search = query.search;
        const result = await categoryService.getAllCategories(pagination, filters);
        return sendSuccess(res, result, 'Categories retrieved successfully');
    });
    /**
     * Get active categories (public)
     * GET /api/categories/active
     */
    getActiveCategories = asyncHandler(async (req, res) => {
        const categories = await categoryService.getActiveCategories();
        return sendSuccess(res, categories, 'Active categories retrieved successfully');
    });
    /**
     * Get single category by ID
     * GET /api/categories/:id
     */
    getCategoryById = asyncHandler(async (req, res) => {
        const { id } = getCategoryParamsSchema.parse(req.params);
        const category = await categoryService.getCategoryById(id);
        return sendSuccess(res, category, 'Category retrieved successfully');
    });
    /**
     * Get category by slug
     * GET /api/categories/slug/:slug
     */
    getCategoryBySlug = asyncHandler(async (req, res) => {
        const { slug } = req.params;
        if (!slug) {
            return sendSuccess(res, null, 'Slug is required');
        }
        const category = await categoryService.getCategoryBySlug(slug);
        return sendSuccess(res, category, 'Category retrieved successfully');
    });
    /**
     * Create new category
     * POST /api/categories
     */
    createCategory = asyncHandler(async (req, res) => {
        let imageUrl;
        // Handle image upload
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'categories');
            imageUrl = uploadResult.secure_url;
        }
        else if (req.body.image) {
            // If image URL is provided, upload it to Cloudinary
            if (req.body.image.startsWith('http')) {
                try {
                    const uploadResult = await uploadToCloudinary(req.body.image, 'categories');
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
        const parsed = createCategorySchema.parse({
            ...req.body,
            image: imageUrl,
        });
        const data = removeUndefined(parsed);
        const category = await categoryService.createCategory(data);
        return sendSuccess(res, category, 'Category created successfully', 201);
    });
    /**
     * Update category
     * PUT /api/categories/:id
     */
    updateCategory = asyncHandler(async (req, res) => {
        const { id } = getCategoryParamsSchema.parse(req.params);
        // Get existing category to check for old image
        const existingCategory = await categoryService.getCategoryById(id);
        let imageUrl;
        // Handle image upload
        if (req.file) {
            // Delete old image from Cloudinary if it exists
            if (existingCategory.image) {
                const oldPublicId = extractPublicIdFromUrl(existingCategory.image);
                if (oldPublicId) {
                    try {
                        await deleteFromCloudinary(oldPublicId);
                    }
                    catch (error) {
                        console.error('Error deleting old image:', error);
                    }
                }
            }
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'categories');
            imageUrl = uploadResult.secure_url;
        }
        else if (req.body.image !== undefined) {
            if (req.body.image === '' || req.body.image === null) {
                // Delete old image if empty string or null
                if (existingCategory.image) {
                    const oldPublicId = extractPublicIdFromUrl(existingCategory.image);
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
                    const uploadResult = await uploadToCloudinary(req.body.image, 'categories');
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
        const parsed = updateCategorySchema.parse({
            ...req.body,
            id,
            ...(imageUrl !== undefined && { image: imageUrl }),
        });
        const data = removeUndefined(parsed);
        const category = await categoryService.updateCategory(id, data);
        return sendSuccess(res, category, 'Category updated successfully');
    });
    /**
     * Delete category
     * DELETE /api/categories/:id
     */
    deleteCategory = asyncHandler(async (req, res) => {
        const { id } = deleteCategoryParamsSchema.parse(req.params);
        await categoryService.deleteCategory(id);
        return sendSuccess(res, null, 'Category deleted successfully');
    });
}
export const categoryController = new CategoryController();
//# sourceMappingURL=category.controller.js.map