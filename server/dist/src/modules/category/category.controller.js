import { categoryService } from './category.service.js';
import { sendSuccess } from '../../shared/apiResponse.js';
import { asyncHandler } from '../../shared/errorHandler.js';
import { removeUndefined } from '../../lib/utils.js';
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
        const parsed = createCategorySchema.parse(req.body);
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
        const parsed = updateCategorySchema.parse({ ...req.body, id });
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