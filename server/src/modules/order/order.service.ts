import { prisma } from '../../lib/prisma';
import { AppError } from '../../shared/errorHandler';
import { PaginationParams, FilterParams, PaginatedResponse } from '../../types';

/**
 * Order Service
 * Handles all business logic for orders
 */

export class OrderService {
  /**
   * Generate unique order number
   */
  private generateOrderNumber(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
  }

  /**
   * Get user's orders
   */
  async getUserOrders(
    userId: string,
    pagination: PaginationParams,
    filters: FilterParams
  ): Promise<PaginatedResponse<any>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
    const { status, search } = filters;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      userId, // Filter by user ID
    };
    if (status) where.status = status;
    if (filters.paymentStatus) where.paymentStatus = filters.paymentStatus;
    if (search) {
      where.OR = [
        { orderNumber: { contains: search, mode: 'insensitive' } },
        { customerName: { contains: search, mode: 'insensitive' } },
        { customerEmail: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get orders and total count
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  image: true,
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
      prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get all orders with pagination and filters
   */
  async getAllOrders(
    pagination: PaginationParams,
    filters: FilterParams
  ): Promise<PaginatedResponse<any>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
    const { status, search } = filters;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (status) where.status = status;
    if (filters.paymentStatus) where.paymentStatus = filters.paymentStatus;
    if (search) {
      where.OR = [
        { orderNumber: { contains: search, mode: 'insensitive' } },
        { customerName: { contains: search, mode: 'insensitive' } },
        { customerEmail: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get orders and total count
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  image: true,
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
      prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get single order by ID
   */
  async getOrderById(id: string): Promise<any> {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
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
        },
      },
    });

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    return order;
  }

  /**
   * Get order by order number
   */
  async getOrderByOrderNumber(orderNumber: string): Promise<any> {
    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: {
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
        },
      },
    });

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    return order;
  }

  /**
   * Create new order
   */
  async createOrder(data: {
    userId?: string; // Optional: if user is logged in
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    paymentMethod: string;
    senderPhone: string;
    transactionId: string;
    items: Array<{
      productId: string;
      quantity: number;
    }>;
  }): Promise<any> {
    // Validate all products exist and get their details
    const productIds = data.items.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
        status: 'active',
      },
    });

    if (products.length !== productIds.length) {
      throw new AppError('One or more products not found or inactive', 400);
    }

    // Calculate totals and validate stock
    let totalAmount = new prisma.Decimal(0);
    const orderItems: any[] = [];

    for (const item of data.items) {
      const product = products.find((p: any) => p.id === item.productId);
      if (!product) {
        throw new AppError(`Product ${item.productId} not found`, 400);
      }

      // Check stock availability
      if (product.stock < item.quantity) {
        throw new AppError(`Insufficient stock for product ${product.name}`, 400);
      }

      const price = new prisma.Decimal(product.price.toString());
      const subtotal = price.mul(item.quantity);
      totalAmount = totalAmount.add(subtotal);

      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: price,
        subtotal: subtotal,
      });
    }

    // Create order with items in a transaction
    const order = await prisma.$transaction(async (tx: any) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          orderNumber: this.generateOrderNumber(),
          userId: data.userId || null, // Link to user if logged in
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone,
          paymentMethod: data.paymentMethod,
          senderPhone: data.senderPhone,
          transactionId: data.transactionId,
          totalAmount: totalAmount,
          status: 'pending',
          paymentStatus: 'pending',
        },
      });

      // Create order items
      await tx.orderItem.createMany({
        data: orderItems.map((item) => ({
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.subtotal,
        })),
      });

      // Update product stock
      for (const item of data.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      // Return order with items
      return tx.order.findUnique({
        where: { id: newOrder.id },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  image: true,
                },
              },
            },
          },
        },
      });
    });

    return order;
  }

  /**
   * Update order
   */
  async updateOrder(
    id: string,
    data: {
      status?: string;
      paymentStatus?: string;
      shippingAddress?: string;
      notes?: string;
    }
  ): Promise<any> {
    // Check if order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      throw new AppError('Order not found', 404);
    }

    // Update order
    const order = await prisma.order.update({
      where: { id },
      data: {
        ...(data.status && { status: data.status }),
        ...(data.paymentStatus && { paymentStatus: data.paymentStatus }),
        ...(data.shippingAddress !== undefined && { shippingAddress: data.shippingAddress }),
        ...(data.notes !== undefined && { notes: data.notes }),
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                image: true,
              },
            },
          },
        },
      },
    });

    return order;
  }

  /**
   * Delete order (soft delete by cancelling)
   */
  async deleteOrder(id: string): Promise<void> {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    // If order is not cancelled, restore stock and cancel order
    if (order.status !== 'cancelled') {
      await prisma.$transaction(async (tx: any) => {
        // Restore stock for all items
        for (const item of order.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                increment: item.quantity,
              },
            },
          });
        }

        // Cancel order
        await tx.order.update({
          where: { id },
          data: {
            status: 'cancelled',
          },
        });
      });
    } else {
      // If already cancelled, just delete
      await prisma.order.delete({
        where: { id },
      });
    }
  }

  /**
   * Get order statistics
   */
  async getOrderStats(): Promise<any> {
    const [
      totalOrders,
      pendingOrders,
      processingOrders,
      deliveredOrders,
      totalRevenue,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: 'pending' } }),
      prisma.order.count({ where: { status: 'processing' } }),
      prisma.order.count({ where: { status: 'delivered' } }),
      prisma.order.aggregate({
        where: {
          paymentStatus: 'paid',
        },
        _sum: {
          totalAmount: true,
        },
      }),
    ]);

    return {
      totalOrders,
      pendingOrders,
      processingOrders,
      deliveredOrders,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
    };
  }
}

export const orderService = new OrderService();

