import { prisma } from '../../lib/prisma.js';
import { AppError } from '../../shared/errorHandler.js';
/**
 * Course Service
 * Handles all business logic for courses
 */
export class CourseService {
    /**
     * Get all courses with pagination and filters
     */
    async getAllCourses(pagination, filters) {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
        const { status, search } = filters;
        const skip = (page - 1) * limit;
        // Build where clause
        const where = {};
        if (status)
            where.status = status;
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { instructor: { contains: search, mode: 'insensitive' } },
            ];
        }
        // Get courses and total count
        const [courses, total] = await Promise.all([
            prisma.course.findMany({
                where,
                include: {
                    product: {
                        include: {
                            category: {
                                select: {
                                    id: true,
                                    name: true,
                                    slug: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    [sortBy]: sortOrder,
                },
                skip,
                take: limit,
            }),
            prisma.course.count({ where }),
        ]);
        return {
            data: courses,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    /**
     * Get single course by ID
     */
    async getCourseById(id) {
        const course = await prisma.course.findUnique({
            where: { id },
            include: {
                product: {
                    include: {
                        category: true,
                    },
                },
            },
        });
        if (!course) {
            throw new AppError('Course not found', 404);
        }
        return course;
    }
    /**
     * Get course by product ID
     */
    async getCourseByProductId(productId) {
        const course = await prisma.course.findUnique({
            where: { productId },
            include: {
                product: {
                    include: {
                        category: true,
                    },
                },
            },
        });
        if (!course) {
            throw new AppError('Course not found', 404);
        }
        return course;
    }
    /**
     * Create new course
     */
    async createCourse(data) {
        // Verify product exists
        const product = await prisma.product.findUnique({
            where: { id: data.productId },
        });
        if (!product) {
            throw new AppError('Product not found', 404);
        }
        // Check if course already exists for this product
        const existingCourse = await prisma.course.findUnique({
            where: { productId: data.productId },
        });
        if (existingCourse) {
            throw new AppError('Course already exists for this product', 400);
        }
        // Validate modules JSON if provided
        if (data.modules) {
            try {
                JSON.parse(data.modules);
            }
            catch (error) {
                throw new AppError('Invalid modules JSON format', 400);
            }
        }
        // Create course
        const course = await prisma.course.create({
            data: {
                productId: data.productId,
                title: data.title,
                description: data.description ?? null,
                instructor: data.instructor ?? null,
                duration: data.duration ?? null,
                level: data.level ?? null,
                language: data.language || 'en',
                thumbnail: data.thumbnail ?? null,
                videoUrl: data.videoUrl ?? null,
                resources: data.resources || [],
                modules: data.modules ?? null,
                status: data.status || 'active',
            },
            include: {
                product: {
                    include: {
                        category: true,
                    },
                },
            },
        });
        return course;
    }
    /**
     * Update course
     */
    async updateCourse(id, data) {
        // Check if course exists
        const existingCourse = await prisma.course.findUnique({
            where: { id },
        });
        if (!existingCourse) {
            throw new AppError('Course not found', 404);
        }
        // Validate modules JSON if provided
        if (data.modules) {
            try {
                JSON.parse(data.modules);
            }
            catch (error) {
                throw new AppError('Invalid modules JSON format', 400);
            }
        }
        // Update course
        const updateData = {};
        if (data.title !== undefined)
            updateData.title = data.title;
        if (data.description !== undefined)
            updateData.description = data.description ?? null;
        if (data.instructor !== undefined)
            updateData.instructor = data.instructor ?? null;
        if (data.duration !== undefined)
            updateData.duration = data.duration ?? null;
        if (data.level !== undefined)
            updateData.level = data.level ?? null;
        if (data.language !== undefined)
            updateData.language = data.language;
        if (data.thumbnail !== undefined)
            updateData.thumbnail = data.thumbnail ?? null;
        if (data.videoUrl !== undefined)
            updateData.videoUrl = data.videoUrl ?? null;
        if (data.resources !== undefined)
            updateData.resources = data.resources;
        if (data.modules !== undefined)
            updateData.modules = data.modules ?? null;
        if (data.status !== undefined)
            updateData.status = data.status;
        // Note: productId update is not supported in update method
        const course = await prisma.course.update({
            where: { id },
            data: updateData,
            include: {
                product: {
                    include: {
                        category: true,
                    },
                },
            },
        });
        return course;
    }
    /**
     * Delete course
     */
    async deleteCourse(id) {
        const course = await prisma.course.findUnique({
            where: { id },
        });
        if (!course) {
            throw new AppError('Course not found', 404);
        }
        await prisma.course.delete({
            where: { id },
        });
    }
}
export const courseService = new CourseService();
//# sourceMappingURL=course.service.js.map