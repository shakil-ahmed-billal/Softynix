import { ZodError } from 'zod';
import { sendError } from './apiResponse';
/**
 * Custom Application Error
 */
export class AppError extends Error {
    statusCode;
    errors;
    constructor(message, statusCode = 400, errors) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}
/**
 * Global Error Handler Middleware
 */
export const errorHandler = (err, req, res, next) => {
    // Handle Zod validation errors
    if (err instanceof ZodError) {
        const errors = err.issues && Array.isArray(err.issues)
            ? err.issues.map((error) => ({
                field: error.path.join('.'),
                message: error.message,
            }))
            : [{ field: 'unknown', message: 'Validation failed' }];
        // Log validation errors for debugging
        console.error('Validation errors:', JSON.stringify(errors, null, 2));
        console.error('Request body:', JSON.stringify(req.body, null, 2));
        return sendError(res, 'Validation failed', errors, 400);
    }
    // Handle custom AppError
    if (err instanceof AppError) {
        return sendError(res, err.message, err.errors, err.statusCode);
    }
    // Handle Prisma errors
    if (err.name === 'PrismaClientKnownRequestError') {
        return sendError(res, 'Database operation failed', null, 500);
    }
    // Handle unknown errors
    console.error('Unhandled error:', err);
    return sendError(res, process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message, null, 500);
};
/**
 * Async handler wrapper to catch errors
 */
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
//# sourceMappingURL=errorHandler.js.map