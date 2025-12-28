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
export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = 'Operation successful',
  statusCode: number = 200
): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Send error response
 */
export const sendError = (
  res: Response,
  message: string,
  errors?: any,
  statusCode: number = 400
): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

