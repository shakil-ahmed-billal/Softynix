import { courseService } from './course.service.js';
import { sendSuccess } from '../../shared/apiResponse.js';
import { asyncHandler } from '../../shared/errorHandler.js';
import { removeUndefined } from '../../lib/utils.js';
import { createCourseSchema, updateCourseSchema, getCoursesQuerySchema, getCourseParamsSchema, deleteCourseParamsSchema, } from './course.validation.js';
/**
 * Course Controller
 * Handles HTTP requests and responses
 */
export class CourseController {
    /**
     * Get all courses
     * GET /api/courses
     */
    getAllCourses = asyncHandler(async (req, res) => {
        const query = getCoursesQuerySchema.parse(req.query);
        const pagination = {
            page: query.page,
            limit: query.limit,
            sortBy: query.sortBy,
            sortOrder: query.sortOrder,
        };
        const filters = {};
        if (query.status !== undefined)
            filters.status = query.status;
        if (query.search !== undefined)
            filters.search = query.search;
        const result = await courseService.getAllCourses(pagination, filters);
        return sendSuccess(res, result, 'Courses retrieved successfully');
    });
    /**
     * Get single course by ID
     * GET /api/courses/:id
     */
    getCourseById = asyncHandler(async (req, res) => {
        const { id } = getCourseParamsSchema.parse(req.params);
        const course = await courseService.getCourseById(id);
        return sendSuccess(res, course, 'Course retrieved successfully');
    });
    /**
     * Get course by product ID
     * GET /api/courses/product/:productId
     */
    getCourseByProductId = asyncHandler(async (req, res) => {
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
    createCourse = asyncHandler(async (req, res) => {
        const parsed = createCourseSchema.parse(req.body);
        const data = removeUndefined(parsed);
        const course = await courseService.createCourse(data);
        return sendSuccess(res, course, 'Course created successfully', 201);
    });
    /**
     * Update course
     * PUT /api/courses/:id
     */
    updateCourse = asyncHandler(async (req, res) => {
        const { id } = getCourseParamsSchema.parse(req.params);
        const parsed = updateCourseSchema.parse(req.body);
        const data = removeUndefined(parsed);
        const course = await courseService.updateCourse(id, data);
        return sendSuccess(res, course, 'Course updated successfully');
    });
    /**
     * Delete course
     * DELETE /api/courses/:id
     */
    deleteCourse = asyncHandler(async (req, res) => {
        const { id } = deleteCourseParamsSchema.parse(req.params);
        await courseService.deleteCourse(id);
        return sendSuccess(res, null, 'Course deleted successfully');
    });
}
export const courseController = new CourseController();
//# sourceMappingURL=course.controller.js.map