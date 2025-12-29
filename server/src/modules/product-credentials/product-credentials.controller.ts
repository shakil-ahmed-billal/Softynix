import { Request, Response } from 'express';
import { productCredentialsService } from './product-credentials.service.js';
import { sendSuccess } from '../../shared/apiResponse.js';
import { asyncHandler } from '../../shared/errorHandler.js';
import { removeUndefined } from '../../lib/utils.js';
import {
  upsertProductCredentialsSchema,
  getProductCredentialsQuerySchema,
  getProductCredentialsParamsSchema,
  deleteProductCredentialsParamsSchema,
} from './product-credentials.validation.js';

/**
 * Product Credentials Controller
 * Handles HTTP requests and responses
 */

export class ProductCredentialsController {
  /**
   * Get all product credentials
   * GET /api/product-credentials
   */
  getAllProductCredentials = asyncHandler(async (req: Request, res: Response) => {
    const query = getProductCredentialsQuerySchema.parse(req.query);
    
    const pagination = {
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    };

    const filters: { productId?: string; productType?: string; search?: string } = {};
    if (query.productId !== undefined) filters.productId = query.productId;
    if (query.productType !== undefined) filters.productType = query.productType;
    if (query.search !== undefined) filters.search = query.search;

    const result = await productCredentialsService.getAllProductCredentials(pagination, filters);
    return sendSuccess(res, result, 'Product credentials retrieved successfully');
  });

  /**
   * Get credentials by product ID
   * GET /api/product-credentials/product/:productId
   */
  getCredentialsByProductId = asyncHandler(async (req: Request, res: Response) => {
    const { productId } = req.params;
    if (!productId) {
      return sendSuccess(res, null, 'Product ID is required');
    }
    const credentials = await productCredentialsService.getCredentialsByProductId(productId);
    return sendSuccess(res, credentials, 'Product credentials retrieved successfully');
  });

  /**
   * Get single credentials by ID
   * GET /api/product-credentials/:id
   */
  getCredentialsById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = getProductCredentialsParamsSchema.parse(req.params);
    const credentials = await productCredentialsService.getCredentialsById(id);
    return sendSuccess(res, credentials, 'Product credentials retrieved successfully');
  });

  /**
   * Create or update product credentials
   * POST /api/product-credentials
   */
  upsertProductCredentials = asyncHandler(async (req: Request, res: Response) => {
    const data = upsertProductCredentialsSchema.parse(req.body);
    
    // Convert expiresAt string to Date if provided
    // Handle datetime-local format (YYYY-MM-DDTHH:mm) by adding seconds and timezone
    let expiresAtDate: Date | undefined = undefined;
    if (data.expiresAt && data.expiresAt !== '') {
      try {
        // If it's in datetime-local format (YYYY-MM-DDTHH:mm), add seconds
        if (data.expiresAt.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)) {
          expiresAtDate = new Date(data.expiresAt + ':00');
        } else {
          expiresAtDate = new Date(data.expiresAt);
        }
        // Validate the date
        if (isNaN(expiresAtDate.getTime())) {
          throw new Error('Invalid date');
        }
      } catch (error) {
        throw new Error('Invalid expiresAt date format');
      }
    }
    
    const credentialsDataRaw: any = {
      ...data,
      expiresAt: expiresAtDate,
      email: data.email && data.email !== '' ? data.email : undefined,
      password: data.password && data.password !== '' ? data.password : undefined,
      licenseKey: data.licenseKey && data.licenseKey !== '' ? data.licenseKey : undefined,
      accessUrl: data.accessUrl && data.accessUrl !== '' ? data.accessUrl : undefined,
      downloadUrl: data.downloadUrl && data.downloadUrl !== '' ? data.downloadUrl : undefined,
    };
    const credentialsData = removeUndefined(credentialsDataRaw) as any;

    const credentials = await productCredentialsService.upsertProductCredentials(credentialsData);
    return sendSuccess(res, credentials, 'Product credentials saved successfully', 201);
  });

  /**
   * Delete product credentials
   * DELETE /api/product-credentials/:id
   */
  deleteProductCredentials = asyncHandler(async (req: Request, res: Response) => {
    const { id } = deleteProductCredentialsParamsSchema.parse(req.params);
    await productCredentialsService.deleteProductCredentials(id);
    return sendSuccess(res, null, 'Product credentials deleted successfully');
  });

  /**
   * Apply credentials to existing user access entries
   * POST /api/product-credentials/:id/apply
   */
  applyCredentialsToUsers = asyncHandler(async (req: Request, res: Response) => {
    const { id } = getProductCredentialsParamsSchema.parse(req.params);
    const credentials = await productCredentialsService.getCredentialsById(id);
    const count = await productCredentialsService.applyCredentialsToUsers(credentials.productId);
    return sendSuccess(res, { updated: count }, `Credentials applied to ${count} user(s) successfully`);
  });
}

export const productCredentialsController = new ProductCredentialsController();

