import { sendOrderConfirmationEmail } from '../../lib/email.js';
import { prisma } from '../../lib/prisma.js';
import { AppError } from '../../shared/errorHandler.js';
import { FilterParams, PaginatedResponse, PaginationParams } from '../../types/index.js';

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
   * Determine product type from category name/slug
   */
  private determineProductType(categoryName: string, categorySlug: string, productName: string): string {
    const nameLower = categoryName.toLowerCase();
    const slugLower = categorySlug.toLowerCase();
    const productLower = productName.toLowerCase();

    // Check for AI subscriptions
    if (
      nameLower.includes('ai') ||
      nameLower.includes('subscription') ||
      slugLower.includes('ai') ||
      slugLower.includes('subscription') ||
      productLower.includes('chatgpt') ||
      productLower.includes('claude') ||
      productLower.includes('yai')
    ) {
      return 'ai_subscription';
    }

    // Check for software licenses
    if (
      nameLower.includes('software') ||
      nameLower.includes('license') ||
      slugLower.includes('software') ||
      slugLower.includes('license')
    ) {
      return 'software_license';
    }

    // Check for productivity apps
    if (
      nameLower.includes('productivity') ||
      nameLower.includes('app') ||
      slugLower.includes('productivity') ||
      slugLower.includes('app')
    ) {
      return 'productivity_app';
    }

    // Check for courses
    if (
      nameLower.includes('course') ||
      nameLower.includes('learning') ||
      nameLower.includes('education') ||
      slugLower.includes('course') ||
      slugLower.includes('learning')
    ) {
      return 'course';
    }

    // Default to ai_subscription if unclear
    return 'ai_subscription';
  }

  /**
   * Create UserProductAccess entries for order items
   */
  private async createUserProductAccess(
    tx: any,
    order: any,
    orderItems: any[],
    products: any[]
  ): Promise<void> {
    if (!order.userId) {
      return; // Skip if no user is associated
    }

    // Get order items with product details
    const itemsWithProducts = await tx.orderItem.findMany({
      where: { orderId: order.id },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    });

    for (const item of itemsWithProducts) {
      // Check if access already exists
      const existingAccess = await tx.userProductAccess.findUnique({
        where: { orderItemId: item.id },
      });

      if (existingAccess) {
        continue; // Skip if already exists
      }

      const productType = this.determineProductType(
        item.product.category.name,
        item.product.category.slug,
        item.product.name
      );

      // Try to get product credentials from admin-created template
      // Only use credentials if admin has created them - no automatic generation
      const productCredentials = await tx.productCredentials.findUnique({
        where: { productId: item.productId },
      });

      // Initialize credential variables - will only be set if admin has created credentials
      let email: string | undefined;
      let password: string | undefined;
      let licenseKey: string | undefined;
      let subscriptionStatus: string | undefined;
      let expiresAt: Date | undefined;
      let accessUrl: string | undefined;
      let downloadUrl: string | undefined;

      if (productCredentials) {
        // Use admin-created credentials only
        email = productCredentials.email;
        password = productCredentials.password;
        licenseKey = productCredentials.licenseKey;
        subscriptionStatus = productCredentials.subscriptionStatus || 'active';
        expiresAt = productCredentials.expiresAt || undefined;
        accessUrl = productCredentials.accessUrl;
        downloadUrl = productCredentials.downloadUrl;
      }
      // If no admin credentials exist, all values remain undefined/null
      // Admin must create credentials from the admin dashboard

      await tx.userProductAccess.create({
        data: {
          userId: order.userId,
          orderId: order.id,
          orderItemId: item.id,
          productId: item.productId,
          productType,
          email,
          password,
          licenseKey,
          accessUrl,
          downloadUrl,
          subscriptionStatus,
          expiresAt,
          status: 'active',
        },
      });
    }
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
   * Get recent orders (public, limited data)
   */
  async getRecentOrders(limit: number = 5): Promise<any[]> {
    const orders = await prisma.order.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        orderNumber: true,
        customerName: true,
        totalAmount: true,
        status: true,
        createdAt: true,
      },
    });

    return orders;
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
    // Get Decimal constructor from the first product's price
    if (products.length === 0 || !products[0]?.price) {
      throw new AppError('No products found', 400);
    }
    
    const Decimal = (products[0]!.price as any).constructor;
    let totalAmount = new Decimal(0);
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

      // product.price is already a Decimal from Prisma, use it directly
      const price = product.price as any;
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
      const orderData: any = {
        orderNumber: this.generateOrderNumber(),
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        paymentMethod: data.paymentMethod,
        senderPhone: data.senderPhone,
        transactionId: data.transactionId,
        totalAmount: totalAmount,
        status: 'pending',
        paymentStatus: 'pending',
      };

      // Link to user if logged in (use relation syntax only - don't set userId directly)
      if (data.userId) {
        orderData.user = {
          connect: { id: data.userId },
        };
        // Note: Don't set userId directly when using relation syntax - Prisma handles it
      }

      const newOrder = await tx.order.create({
        data: orderData,
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

      // Create UserProductAccess entries if user is logged in
      // We'll create them even for pending orders, they'll be activated when payment is confirmed
      // Use data.userId directly since newOrder.userId might not be populated immediately
      if (data.userId) {
        // Ensure the order object has userId for createUserProductAccess
        const orderWithUserId = { ...newOrder, userId: data.userId };
        await this.createUserProductAccess(tx, orderWithUserId, orderItems, products);
      }

      // Return order with items and userId
      // Fetch the order again to ensure userId is populated
      return tx.order.findUnique({
        where: { id: newOrder.id },
        select: {
          id: true,
          orderNumber: true,
          userId: true, // Explicitly select userId
          customerName: true,
          customerEmail: true,
          customerPhone: true,
          totalAmount: true,
          status: true,
          paymentStatus: true,
          paymentMethod: true,
          senderPhone: true,
          transactionId: true,
          shippingAddress: true,
          notes: true,
          createdAt: true,
          updatedAt: true,
          items: {
            include: {
              product: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      });
    });

    // Send email and WhatsApp notifications (don't await to avoid blocking)
    // Send notifications asynchronously so they don't block the response
    Promise.all([
      sendOrderConfirmationEmail({
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        totalAmount: order.totalAmount.toString(),
        items: order.items.map((item: any) => ({
          product: {
            name: item.product.name,
            image: item.product.image,
          },
          quantity: item.quantity,
          price: item.price.toString(),
          subtotal: item.subtotal.toString(),
        })),
        paymentMethod: order.paymentMethod || undefined,
        transactionId: order.transactionId || undefined,
      }).catch((error) => {
        console.error('Failed to send order confirmation email:', error);
      }),

      // sendOrderConfirmationWhatsApp({
      //   orderNumber: order.orderNumber,
      //   customerName: order.customerName,
      //   customerPhone: order.customerPhone || '',
      //   totalAmount: order.totalAmount.toString(),
      //   items: order.items.map((item: any) => ({
      //     product: {
      //       name: item.product.name,
      //     },
      //     quantity: item.quantity,
      //     subtotal: item.subtotal.toString(),
      //   })),
      //   paymentMethod: order.paymentMethod || undefined,
      //   transactionId: order.transactionId || undefined,
      // }).catch((error) => {
      //   console.error('Failed to send order confirmation WhatsApp:', error);
      // }),

    ]).catch((error) => {
      console.error('Error sending notifications:', error);
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
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

    if (!existingOrder) {
      throw new AppError('Order not found', 404);
    }

    // Update order
    const updateData: {
      status?: string;
      paymentStatus?: string;
      shippingAddress?: string | null;
      notes?: string | null;
    } = {};
    
    if (data.status !== undefined) updateData.status = data.status;
    if (data.paymentStatus !== undefined) updateData.paymentStatus = data.paymentStatus;
    if (data.shippingAddress !== undefined) updateData.shippingAddress = data.shippingAddress || null;
    if (data.notes !== undefined) updateData.notes = data.notes || null;

    const order = await prisma.order.update({
      where: { id },
      data: updateData,
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

    // If payment status changed to 'paid' and user exists, create/activate UserProductAccess
    // Note: UserProductAccess should already be created during order creation
    // This is just a safety check in case it wasn't created initially
    if (
      data.paymentStatus === 'paid' &&
      order.userId &&
      existingOrder.paymentStatus !== 'paid'
    ) {
      await prisma.$transaction(async (tx: any) => {
        // Check if UserProductAccess entries already exist for this order
        const existingAccess = await tx.userProductAccess.findFirst({
          where: { orderId: order.id },
        });

        // Only create if they don't exist
        if (!existingAccess) {
          // Get products for the order
          const products = await tx.product.findMany({
            where: {
              id: { in: order.items.map((item: any) => item.productId) },
            },
            include: {
              category: true,
            },
          });

          await this.createUserProductAccess(tx, order, order.items, products);
        }
      });
    }

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

