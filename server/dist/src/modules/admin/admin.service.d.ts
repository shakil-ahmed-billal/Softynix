import { PaginationParams, FilterParams, PaginatedResponse } from '../../types/index.js';
/**
 * Admin Service
 * Handles all business logic for admin users
 * Note: In production, use proper password hashing (bcrypt)
 */
export declare class AdminService {
    /**
     * Get all admins with pagination and filters
     */
    getAllAdmins(pagination: PaginationParams, filters: FilterParams): Promise<PaginatedResponse<any>>;
    /**
     * Get single admin by ID
     */
    getAdminById(id: string): Promise<any>;
    /**
     * Create new admin
     * Note: In production, hash password with bcrypt
     */
    createAdmin(data: {
        email: string;
        name: string;
        password: string;
        role?: string;
    }): Promise<any>;
    /**
     * Update admin
     */
    updateAdmin(id: string, data: {
        email?: string | undefined;
        name?: string | undefined;
        password?: string | undefined;
        role?: string | undefined;
        status?: string | undefined;
    }): Promise<any>;
    /**
     * Delete admin
     */
    deleteAdmin(id: string): Promise<void>;
    /**
     * Get dashboard statistics
     */
    getDashboardStats(): Promise<any>;
    /**
     * Get all users with pagination and filters
     */
    getAllUsers(pagination: PaginationParams, filters: FilterParams): Promise<PaginatedResponse<any>>;
}
export declare const adminService: AdminService;
//# sourceMappingURL=admin.service.d.ts.map