import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { sendError } from './apiResponse';

/**
 * Custom Application Error
 */
export class AppError extends Error {
  statusCode: number;
  errors?: any;

  constructor(message: string, statusCode: number = 400, errors?: any) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global Error Handler Middleware
 */
export const errorHandler = (
  err: Error | AppError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const errors = err.errors && Array.isArray(err.errors) 
      ? err.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }))
      : [{ field: 'unknown', message: 'Validation failed' }];

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
  return sendError(
    res,
    process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    null,
    500
  );
};

/**
 * Async handler wrapper to catch errors
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

