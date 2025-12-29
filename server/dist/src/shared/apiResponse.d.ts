import { Response } from 'express';
/**
 * Standard API Response Interface
 */
export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    errors?: any;
}
/**
 * Send success response
 */
export declare const sendSuccess: <T>(res: Response, data: T, message?: string, statusCode?: number) => Response;
/**
 * Send error response
 */
export declare const sendError: (res: Response, message: string, errors?: any, statusCode?: number) => Response;
//# sourceMappingURL=apiResponse.d.ts.map