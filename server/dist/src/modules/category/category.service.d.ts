import { PaginationParams, FilterParams, PaginatedResponse } from '../../types';
/**
 * Category Service
 * Handles all business logic for categories
 */
export declare class CategoryService {
    /**
     * Get all categories with pagination and filters
     */
    getAllCategories(pagination: PaginationParams, filters: FilterParams): Promise<PaginatedResponse<any>>;
    /**
     * Get single category by ID
     */
    getCategoryById(id: string): Promise<any>;
    /**
     * Get category by slug
     */
    getCategoryBySlug(slug: string): Promise<any>;
    /**
     * Create new category
     */
    createCategory(data: {
        name: string;
        slug: string;
        description?: string | null | undefined;
        image?: string | null | undefined;
        status?: string | undefined;
    }): Promise<any>;
    /**
     * Update category
     */
    updateCategory(id: string, data: {
        name?: string | undefined;
        slug?: string | undefined;
        description?: string | null | undefined;
        image?: string | null | undefined;
        status?: string | undefined;
    }): Promise<any>;
    /**
     * Delete category
     */
    deleteCategory(id: string): Promise<void>;
    /**
     * Get all active categories (for public use)
     */
    getActiveCategories(): Promise<any[]>;
}
export declare const categoryService: CategoryService;
//# sourceMappingURL=category.service.d.ts.map