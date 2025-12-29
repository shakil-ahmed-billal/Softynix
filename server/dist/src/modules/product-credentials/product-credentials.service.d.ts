import { PaginationParams, FilterParams, PaginatedResponse } from '../../types/index.js';
/**
 * Product Credentials Service
 * Handles management of product credentials that admins can assign to products
 */
export declare class ProductCredentialsService {
    /**
     * Get all product credentials with pagination and filters
     */
    getAllProductCredentials(pagination: PaginationParams, filters: FilterParams): Promise<PaginatedResponse<any>>;
    /**
     * Get credentials by product ID
     */
    getCredentialsByProductId(productId: string): Promise<any | null>;
    /**
     * Get single credentials by ID
     */
    getCredentialsById(id: string): Promise<any>;
    /**
     * Create or update product credentials
     */
    upsertProductCredentials(data: {
        productId: string;
        productType: string;
        email?: string | undefined;
        password?: string | undefined;
        licenseKey?: string | undefined;
        accessUrl?: string | undefined;
        downloadUrl?: string | undefined;
        subscriptionStatus?: string | null | undefined;
        expiresAt?: Date | undefined;
        metadata?: string | undefined;
        notes?: string | undefined;
    }): Promise<any>;
    /**
     * Delete product credentials
     */
    deleteProductCredentials(id: string): Promise<void>;
    /**
     * Apply credentials to existing user product access entries
     * This updates all UserProductAccess entries for a product with the credentials
     */
    applyCredentialsToUsers(productId: string): Promise<number>;
}
export declare const productCredentialsService: ProductCredentialsService;
//# sourceMappingURL=product-credentials.service.d.ts.map