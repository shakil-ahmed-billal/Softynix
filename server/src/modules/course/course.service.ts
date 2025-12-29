import { prisma } from '../../lib/prisma';
import { AppError } from '../../shared/errorHandler';
import { PaginationParams, FilterParams, PaginatedResponse } from '../../types';

/**
 * Course Service
 * Handles all business logic for courses
 */

export class CourseService {
  /**
   * Get all courses with pagination and filters
   */
  async getAllCourses(
    pagination: PaginationParams,
    filters: FilterParams
  ): Promise<PaginatedResponse<any>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
    const { status, search } = filters;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (status) where.status = status;
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
  async getCourseById(id: string): Promise<any> {
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
  async getCourseByProductId(productId: string): Promise<any> {
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
  async createCourse(data: {
    productId: string;
    title: string;
    description?: string;
    instructor?: string;
    duration?: string;
    level?: string;
    language?: string;
    thumbnail?: string;
    videoUrl?: string;
    resources?: string[];
    modules?: string; // JSON string
    status?: string;
  }): Promise<any> {
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
      } catch (error) {
        throw new AppError('Invalid modules JSON format', 400);
      }
    }

    // Create course
    const course = await prisma.course.create({
      data: {
        productId: data.productId,
        title: data.title,
        description: data.description,
        instructor: data.instructor,
        duration: data.duration,
        level: data.level,
        language: data.language || 'en',
        thumbnail: data.thumbnail,
        videoUrl: data.videoUrl,
        resources: data.resources || [],
        modules: data.modules,
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
  async updateCourse(
    id: string,
    data: {
      title?: string;
      description?: string;
      instructor?: string;
      duration?: string;
      level?: string;
      language?: string;
      thumbnail?: string;
      videoUrl?: string;
      resources?: string[];
      modules?: string; // JSON string
      status?: string;
    }
  ): Promise<any> {
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
      } catch (error) {
        throw new AppError('Invalid modules JSON format', 400);
      }
    }

    // Update course
    const course = await prisma.course.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.instructor !== undefined && { instructor: data.instructor }),
        ...(data.duration !== undefined && { duration: data.duration }),
        ...(data.level !== undefined && { level: data.level }),
        ...(data.language !== undefined && { language: data.language }),
        ...(data.thumbnail !== undefined && { thumbnail: data.thumbnail }),
        ...(data.videoUrl !== undefined && { videoUrl: data.videoUrl }),
        ...(data.resources !== undefined && { resources: data.resources }),
        ...(data.modules !== undefined && { modules: data.modules }),
        ...(data.status && { status: data.status }),
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
   * Delete course
   */
  async deleteCourse(id: string): Promise<void> {
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

