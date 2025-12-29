export interface TokenPayload {
    userId: string;
    email: string;
    type: 'user' | 'admin';
}
/**
 * Generate JWT token
 */
export declare const generateToken: (payload: TokenPayload) => string;
/**
 * Verify JWT token
 */
export declare const verifyToken: (token: string) => TokenPayload;
/**
 * Extract token from Authorization header
 */
export declare const extractToken: (authHeader?: string) => string | null;
//# sourceMappingURL=jwt.d.ts.map