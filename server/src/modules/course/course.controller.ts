import { Request, Response } from 'express';
import { courseService } from './course.service.js';
import { sendSuccess } from '../../shared/apiResponse.js';
import { asyncHandler } from '../../shared/errorHandler.js';
import { removeUndefined } from '../../lib/utils.js';
import { uploadToCloudinary, extractPublicIdFromUrl, deleteFromCloudinary } from '../../lib/cloudinary.js';
import {
  createCourseSchema,
  updateCourseSchema,
  getCoursesQuerySchema,
  getCourseParamsSchema,
  deleteCourseParamsSchema,
} from './course.validation.js';

/**
 * Course Controller
 * Handles HTTP requests and responses
 */

export class CourseController {
  /**
   * Get all courses
   * GET /api/courses
   */
  getAllCourses = asyncHandler(async (req: Request, res: Response) => {
    const query = getCoursesQuerySchema.parse(req.query);
    
    const pagination = {
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    };

    const filters: { status?: string; search?: string } = {};
    if (query.status !== undefined) filters.status = query.status;
    if (query.search !== undefined) filters.search = query.search;

    const result = await courseService.getAllCourses(pagination, filters);
    return sendSuccess(res, result, 'Courses retrieved successfully');
  });

  /**
   * Get single course by ID
   * GET /api/courses/:id
   */
  getCourseById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = getCourseParamsSchema.parse(req.params);
    const course = await courseService.getCourseById(id);
    return sendSuccess(res, course, 'Course retrieved successfully');
  });

  /**
   * Get course by product ID
   * GET /api/courses/product/:productId
   */
  getCourseByProductId = asyncHandler(async (req: Request, res: Response) => {
    const { productId } = req.params;
    if (!productId) {
      return sendSuccess(res, null, 'Product ID is required');
    }
    const course = await courseService.getCourseByProductId(productId);
    return sendSuccess(res, course, 'Course retrieved successfully');
  });

  /**
   * Create new course
   * POST /api/courses
   */
  createCourse = asyncHandler(async (req: Request, res: Response) => {
    let thumbnailUrl: string | undefined;

    // Handle thumbnail upload
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'courses');
      thumbnailUrl = uploadResult.secure_url;
    } else if (req.body.thumbnail) {
      // If thumbnail URL is provided, upload it to Cloudinary
      if (req.body.thumbnail.startsWith('http')) {
        try {
          const uploadResult = await uploadToCloudinary(req.body.thumbnail, 'courses');
          thumbnailUrl = uploadResult.secure_url;
        } catch (error) {
          thumbnailUrl = req.body.thumbnail;
        }
      } else {
        thumbnailUrl = req.body.thumbnail;
      }
    }

    const parsed = createCourseSchema.parse({
      ...req.body,
      thumbnail: thumbnailUrl,
    });
    const data = removeUndefined(parsed) as typeof parsed;
    const course = await courseService.createCourse(data);
    return sendSuccess(res, course, 'Course created successfully', 201);
  });

  /**
   * Update course
   * PUT /api/courses/:id
   */
  updateCourse = asyncHandler(async (req: Request, res: Response) => {
    const { id } = getCourseParamsSchema.parse(req.params);
    
    // Get existing course to check for old thumbnail
    const existingCourse = await courseService.getCourseById(id);
    
    let thumbnailUrl: string | undefined;

    // Handle thumbnail upload
    if (req.file) {
      // Delete old thumbnail from Cloudinary if it exists
      if (existingCourse.thumbnail) {
        const oldPublicId = extractPublicIdFromUrl(existingCourse.thumbnail);
        if (oldPublicId) {
          try {
            await deleteFromCloudinary(oldPublicId);
          } catch (error) {
            console.error('Error deleting old thumbnail:', error);
          }
        }
      }
      
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'courses');
      thumbnailUrl = uploadResult.secure_url;
    } else if (req.body.thumbnail !== undefined) {
      if (req.body.thumbnail === '' || req.body.thumbnail === null) {
        // Delete old thumbnail if empty string or null
        if (existingCourse.thumbnail) {
          const oldPublicId = extractPublicIdFromUrl(existingCourse.thumbnail);
          if (oldPublicId) {
            try {
              await deleteFromCloudinary(oldPublicId);
            } catch (error) {
              console.error('Error deleting old thumbnail:', error);
            }
          }
        }
        thumbnailUrl = undefined;
      } else if (req.body.thumbnail.startsWith('http') && !req.body.thumbnail.includes('cloudinary.com')) {
        // Upload new URL to Cloudinary
        try {
          const uploadResult = await uploadToCloudinary(req.body.thumbnail, 'courses');
          thumbnailUrl = uploadResult.secure_url;
        } catch (error) {
          thumbnailUrl = req.body.thumbnail;
        }
      } else {
        thumbnailUrl = req.body.thumbnail;
      }
    }

    const parsed = updateCourseSchema.parse({
      ...req.body,
      ...(thumbnailUrl !== undefined && { thumbnail: thumbnailUrl }),
    });
    const data = removeUndefined(parsed) as typeof parsed;
    const course = await courseService.updateCourse(id, data);
    return sendSuccess(res, course, 'Course updated successfully');
  });

  /**
   * Delete course
   * DELETE /api/courses/:id
   */
  deleteCourse = asyncHandler(async (req: Request, res: Response) => {
    const { id } = deleteCourseParamsSchema.parse(req.params);
    await courseService.deleteCourse(id);
    return sendSuccess(res, null, 'Course deleted successfully');
  });
}

export const courseController = new CourseController();

