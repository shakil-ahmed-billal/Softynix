import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
/**
 * Custom Application Error
 */
export declare class AppError extends Error {
    statusCode: number;
    errors?: any;
    constructor(message: string, statusCode?: number, errors?: any);
}
/**
 * Global Error Handler Middleware
 */
export declare const errorHandler: (err: Error | AppError | ZodError, req: Request, res: Response, next: NextFunction) => Response;
/**
 * Async handler wrapper to catch errors
 */
export declare const asyncHandler: (fn: Function) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=errorHandler.d.ts.map