import { prisma } from '../../lib/prisma';
import { AppError } from '../../shared/errorHandler';

interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface FilterParams {
  productType?: string;
  status?: string;
  search?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * User Product Access Service
 * Handles all business logic for user product access
 */
export class UserProductAccessService {
  /**
   * Get user's purchased products with access details
   */
  async getUserPurchases(
    userId: string,
    pagination: PaginationParams = {},
    filters: FilterParams = {}
  ): Promise<PaginatedResponse<any>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
    const { productType, status, search } = filters;

    const skip = (page - 1) * limit;

    const where: any = {
      userId,
    };

    if (productType) {
      where.productType = productType;
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { product: { name: { contains: search, mode: 'insensitive' } } },
        { product: { description: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const [accesses, total] = await Promise.all([
      prisma.userProductAccess.findMany({
        where,
        include: {
          product: {
            include: {
              category: true,
            },
          },
          order: {
            select: {
              id: true,
              orderNumber: true,
              createdAt: true,
              totalAmount: true,
            },
          },
          orderItem: {
            select: {
              id: true,
              quantity: true,
              price: true,
            },
          },
        },
        orderBy: {
          [sortBy]: sortOrder,
        },
        skip,
        take: limit,
      }),
      prisma.userProductAccess.count({ where }),
    ]);

    return {
      data: accesses,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get user's AI subscriptions
   */
  async getUserAISubscriptions(userId: string): Promise<any[]> {
    const accesses = await prisma.userProductAccess.findMany({
      where: {
        userId,
        productType: 'ai_subscription',
        status: 'active',
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
        order: {
          select: {
            orderNumber: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return accesses;
  }

  /**
   * Get user's software licenses
   */
  async getUserSoftwareLicenses(userId: string): Promise<any[]> {
    const accesses = await prisma.userProductAccess.findMany({
      where: {
        userId,
        productType: 'software_license',
        status: 'active',
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
        order: {
          select: {
            orderNumber: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return accesses;
  }

  /**
   * Get user's productivity apps
   */
  async getUserProductivityApps(userId: string): Promise<any[]> {
    const accesses = await prisma.userProductAccess.findMany({
      where: {
        userId,
        productType: 'productivity_app',
        status: 'active',
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
        order: {
          select: {
            orderNumber: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return accesses;
  }

  /**
   * Get user's courses
   */
  async getUserCourses(userId: string): Promise<any[]> {
    const accesses = await prisma.userProductAccess.findMany({
      where: {
        userId,
        productType: 'course',
        status: 'active',
      },
      include: {
        product: {
          include: {
            category: true,
            course: true,
          },
        },
        order: {
          select: {
            orderNumber: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return accesses;
  }

  /**
   * Get single product access by ID
   */
  async getProductAccessById(accessId: string, userId: string): Promise<any> {
    const access = await prisma.userProductAccess.findFirst({
      where: {
        id: accessId,
        userId, // Ensure user owns this access
      },
      include: {
        product: {
          include: {
            category: true,
            course: true,
          },
        },
        order: {
          select: {
            id: true,
            orderNumber: true,
            createdAt: true,
            totalAmount: true,
          },
        },
        orderItem: {
          select: {
            id: true,
            quantity: true,
            price: true,
          },
        },
      },
    });

    if (!access) {
      throw new AppError('Product access not found', 404);
    }

    return access;
  }

  /**
   * Update course progress
   */
  async updateCourseProgress(
    accessId: string,
    userId: string,
    progress: number
  ): Promise<any> {
    if (progress < 0 || progress > 100) {
      throw new AppError('Progress must be between 0 and 100', 400);
    }

    const access = await prisma.userProductAccess.findFirst({
      where: {
        id: accessId,
        userId,
        productType: 'course',
      },
    });

    if (!access) {
      throw new AppError('Course access not found', 404);
    }

    const updatedAccess = await prisma.userProductAccess.update({
      where: { id: accessId },
      data: {
        courseProgress: progress,
        courseStatus: progress === 100 ? 'completed' : progress > 0 ? 'in_progress' : 'not_started',
      },
    });

    return updatedAccess;
  }

  /**
   * Get lesson completions for a course access
   */
  async getLessonCompletions(accessId: string, userId: string): Promise<any[]> {
    // Verify ownership
    const access = await prisma.userProductAccess.findFirst({
      where: {
        id: accessId,
        userId,
        productType: 'course',
      },
      include: {
        product: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!access || !access.product.course) {
      throw new AppError('Course access not found', 404);
    }

    const completions = await prisma.courseLessonCompletion.findMany({
      where: {
        userProductAccessId: accessId,
        courseId: access.product.course.id,
      },
    });

    return completions;
  }

  /**
   * Complete a lesson
   */
  async completeLesson(
    accessId: string,
    userId: string,
    milestoneId: number,
    moduleId: number
  ): Promise<any> {
    // Verify ownership
    const access = await prisma.userProductAccess.findFirst({
      where: {
        id: accessId,
        userId,
        productType: 'course',
      },
      include: {
        product: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!access || !access.product.course) {
      throw new AppError('Course access not found', 404);
    }

    // Upsert lesson completion
    const completion = await prisma.courseLessonCompletion.upsert({
      where: {
        userProductAccessId_courseId_milestoneId_moduleId: {
          userProductAccessId: accessId,
          courseId: access.product.course.id,
          milestoneId,
          moduleId,
        },
      },
      update: {
        completed: true,
        viewed: true,
        completedAt: new Date(),
        viewedAt: new Date(),
      },
      create: {
        userProductAccessId: accessId,
        courseId: access.product.course.id,
        milestoneId,
        moduleId,
        completed: true,
        viewed: true,
        completedAt: new Date(),
        viewedAt: new Date(),
      },
    });

    // Calculate new progress
    const courseData = JSON.parse(access.product.course.modules || '{}');
    const totalLessons = courseData.milestones?.reduce(
      (sum: number, milestone: any) => sum + (milestone.modules?.length || 0),
      0
    ) || 1;

    const completedLessons = await prisma.courseLessonCompletion.count({
      where: {
        userProductAccessId: accessId,
        courseId: access.product.course.id,
        completed: true,
      },
    });

    const newProgress = Math.round((completedLessons / totalLessons) * 100);

    // Update course progress
    await prisma.userProductAccess.update({
      where: { id: accessId },
      data: {
        courseProgress: newProgress,
        courseStatus: newProgress === 100 ? 'completed' : 'in_progress',
      },
    });

    return completion;
  }

  /**
   * Mark lesson as viewed
   */
  async markLessonViewed(
    accessId: string,
    userId: string,
    milestoneId: number,
    moduleId: number
  ): Promise<any> {
    // Verify ownership
    const access = await prisma.userProductAccess.findFirst({
      where: {
        id: accessId,
        userId,
        productType: 'course',
      },
      include: {
        product: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!access || !access.product.course) {
      throw new AppError('Course access not found', 404);
    }

    // Upsert lesson completion (viewed only)
    const completion = await prisma.courseLessonCompletion.upsert({
      where: {
        userProductAccessId_courseId_milestoneId_moduleId: {
          userProductAccessId: accessId,
          courseId: access.product.course.id,
          milestoneId,
          moduleId,
        },
      },
      update: {
        viewed: true,
        viewedAt: new Date(),
      },
      create: {
        userProductAccessId: accessId,
        courseId: access.product.course.id,
        milestoneId,
        moduleId,
        viewed: true,
        viewedAt: new Date(),
      },
    });

    return completion;
  }
}

export const userProductAccessService = new UserProductAccessService();

