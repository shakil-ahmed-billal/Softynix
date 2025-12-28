import { prisma } from '../../lib/prisma';
import { AppError } from '../../shared/errorHandler';
import { PaginationParams, FilterParams, PaginatedResponse } from '../../types';

/**
 * Admin Service
 * Handles all business logic for admin users
 * Note: In production, use proper password hashing (bcrypt)
 */

export class AdminService {
  /**
   * Get all admins with pagination and filters
   */
  async getAllAdmins(
    pagination: PaginationParams,
    filters: FilterParams
  ): Promise<PaginatedResponse<any>> {
    const { page = 1, limit = 10 } = pagination;
    const { status, search } = filters;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get admins and total count
    const [admins, total] = await Promise.all([
      prisma.adminUser.findMany({
        where,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          // Don't return password
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.adminUser.count({ where }),
    ]);

    return {
      data: admins,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get single admin by ID
   */
  async getAdminById(id: string): Promise<any> {
    const admin = await prisma.adminUser.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        // Don't return password
      },
    });

    if (!admin) {
      throw new AppError('Admin not found', 404);
    }

    return admin;
  }

  /**
   * Create new admin
   * Note: In production, hash password with bcrypt
   */
  async createAdmin(data: {
    email: string;
    name: string;
    password: string;
    role?: string;
  }): Promise<any> {
    // Check if email already exists
    const existingAdmin = await prisma.adminUser.findUnique({
      where: { email: data.email },
    });

    if (existingAdmin) {
      throw new AppError('Admin with this email already exists', 400);
    }

    // In production, hash password: const hashedPassword = await bcrypt.hash(data.password, 10);
    // For now, store plain text (NOT RECOMMENDED FOR PRODUCTION)
    const admin = await prisma.adminUser.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password, // TODO: Hash password in production
        role: data.role || 'admin',
        status: 'active',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return admin;
  }

  /**
   * Update admin
   */
  async updateAdmin(
    id: string,
    data: {
      email?: string;
      name?: string;
      password?: string;
      role?: string;
      status?: string;
    }
  ): Promise<any> {
    // Check if admin exists
    const existingAdmin = await prisma.adminUser.findUnique({
      where: { id },
    });

    if (!existingAdmin) {
      throw new AppError('Admin not found', 404);
    }

    // Check if email is being updated and already exists
    if (data.email && data.email !== existingAdmin.email) {
      const emailExists = await prisma.adminUser.findUnique({
        where: { email: data.email },
      });

      if (emailExists) {
        throw new AppError('Admin with this email already exists', 400);
      }
    }

    // Update admin
    const updateData: any = {
      ...(data.name && { name: data.name }),
      ...(data.email && { email: data.email }),
      ...(data.role && { role: data.role }),
      ...(data.status && { status: data.status }),
    };

    // Hash password if being updated
    if (data.password) {
      // TODO: Hash password in production
      updateData.password = data.password;
    }

    const admin = await prisma.adminUser.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return admin;
  }

  /**
   * Delete admin
   */
  async deleteAdmin(id: string): Promise<void> {
    const admin = await prisma.adminUser.findUnique({
      where: { id },
    });

    if (!admin) {
      throw new AppError('Admin not found', 404);
    }

    await prisma.adminUser.delete({
      where: { id },
    });
  }

  /**
   * Get dashboard statistics
   */
  async getDashboardStats(): Promise<any> {
    const [
      totalProducts,
      activeProducts,
      totalCategories,
      totalOrders,
      totalRevenue,
      recentOrders,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { status: 'active' } }),
      prisma.category.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        where: {
          paymentStatus: 'paid',
        },
        _sum: {
          totalAmount: true,
        },
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          items: {
            include: {
              product: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      }),
    ]);

    return {
      products: {
        total: totalProducts,
        active: activeProducts,
      },
      categories: {
        total: totalCategories,
      },
      orders: {
        total: totalOrders,
      },
      revenue: {
        total: totalRevenue._sum.totalAmount || 0,
      },
      recentOrders,
    };
  }

  /**
   * Get all users with pagination and filters
   */
  async getAllUsers(
    pagination: PaginationParams,
    filters: FilterParams
  ): Promise<PaginatedResponse<any>> {
    const { page = 1, limit = 10 } = pagination;
    const { status, search } = filters;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get users and total count
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          avatar: true,
          status: true,
          emailVerified: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              orders: true,
            },
          },
          // Don't return password
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    return {
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

export const adminService = new AdminService();

