import { PaginationParams, FilterParams, PaginatedResponse } from '../../types/index.js';
/**
 * Product Service
 * Handles all business logic for products
 */
export declare class ProductService {
    /**
     * Get all products with pagination and filters
     */
    getAllProducts(pagination: PaginationParams, filters: FilterParams): Promise<PaginatedResponse<any>>;
    /**
     * Get single product by ID
     */
    getProductById(id: string): Promise<any>;
    /**
     * Get product by slug
     */
    getProductBySlug(slug: string): Promise<any>;
    /**
     * Create new product
     */
    createProduct(data: {
        name: string;
        slug: string;
        description?: string | null | undefined;
        price: number;
        image?: string | null | undefined;
        images?: string[] | undefined;
        categoryId: string;
        status?: string | undefined;
        stock?: number | undefined;
        featured?: boolean | undefined;
    }): Promise<any>;
    /**
     * Update product
     */
    updateProduct(id: string, data: {
        name?: string | undefined;
        slug?: string | undefined;
        description?: string | null | undefined;
        price?: number | undefined;
        image?: string | null | undefined;
        images?: string[] | undefined;
        categoryId?: string | undefined;
        status?: string | undefined;
        stock?: number | undefined;
        featured?: boolean | undefined;
    }): Promise<any>;
    /**
     * Delete product
     */
    deleteProduct(id: string): Promise<void>;
    /**
     * Get featured products
     */
    getFeaturedProducts(limit?: number): Promise<any[]>;
}
export declare const productService: ProductService;
//# sourceMappingURL=product.service.d.ts.map