/**
 * Auth Service
 * Handles all authentication business logic
 */
export declare class AuthService {
    /**
     * Hash password
     */
    private hashPassword;
    /**
     * Compare password with hash
     */
    private comparePassword;
    /**
     * User signup
     */
    signup(data: {
        name: string;
        email: string;
        password: string;
        phone?: string | undefined;
    }): Promise<{
        user: any;
        token: string;
    }>;
    /**
     * User login
     */
    login(email: string, password: string): Promise<{
        user: any;
        token: string;
    }>;
    /**
     * Admin login
     */
    adminLogin(email: string, password: string): Promise<{
        admin: any;
        token: string;
    }>;
    /**
     * Get user profile
     */
    getProfile(userId: string): Promise<any>;
    /**
     * Update user profile
     */
    updateProfile(userId: string, data: {
        name?: string | undefined;
        phone?: string | undefined;
        avatar?: string | undefined;
    }): Promise<any>;
    /**
     * Change password
     */
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void>;
}
export declare const authService: AuthService;
//# sourceMappingURL=auth.service.d.ts.map