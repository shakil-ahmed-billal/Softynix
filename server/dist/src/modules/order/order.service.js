import { prisma } from '../../lib/prisma.js';
import { AppError } from '../../shared/errorHandler.js';
/**
 * Order Service
 * Handles all business logic for orders
 */
export class OrderService {
    /**
     * Generate unique order number
     */
    generateOrderNumber() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `ORD-${timestamp}-${random}`;
    }
    /**
     * Determine product type from category name/slug
     */
    determineProductType(categoryName, categorySlug, productName) {
        const nameLower = categoryName.toLowerCase();
        const slugLower = categorySlug.toLowerCase();
        const productLower = productName.toLowerCase();
        // Check for AI subscriptions
        if (nameLower.includes('ai') ||
            nameLower.includes('subscription') ||
            slugLower.includes('ai') ||
            slugLower.includes('subscription') ||
            productLower.includes('chatgpt') ||
            productLower.includes('claude') ||
            productLower.includes('yai')) {
            return 'ai_subscription';
        }
        // Check for software licenses
        if (nameLower.includes('software') ||
            nameLower.includes('license') ||
            slugLower.includes('software') ||
            slugLower.includes('license')) {
            return 'software_license';
        }
        // Check for productivity apps
        if (nameLower.includes('productivity') ||
            nameLower.includes('app') ||
            slugLower.includes('productivity') ||
            slugLower.includes('app')) {
            return 'productivity_app';
        }
        // Check for courses
        if (nameLower.includes('course') ||
            nameLower.includes('learning') ||
            nameLower.includes('education') ||
            slugLower.includes('course') ||
            slugLower.includes('learning')) {
            return 'course';
        }
        // Default to ai_subscription if unclear
        return 'ai_subscription';
    }
    /**
     * Create UserProductAccess entries for order items
     */
    async createUserProductAccess(tx, order, orderItems, products) {
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
            const productType = this.determineProductType(item.product.category.name, item.product.category.slug, item.product.name);
            // Try to get product credentials from admin-created template
            const productCredentials = await tx.productCredentials.findUnique({
                where: { productId: item.productId },
            });
            // Use credentials from template if available, otherwise generate
            let email;
            let password;
            let licenseKey;
            let subscriptionStatus;
            let expiresAt;
            let accessUrl;
            let downloadUrl;
            if (productCredentials) {
                // Use admin-created credentials
                email = productCredentials.email;
                password = productCredentials.password;
                licenseKey = productCredentials.licenseKey;
                subscriptionStatus = productCredentials.subscriptionStatus || 'active';
                expiresAt = productCredentials.expiresAt || undefined;
                accessUrl = productCredentials.accessUrl;
                downloadUrl = productCredentials.downloadUrl;
            }
            else {
                // Fallback: Generate credentials based on product type
                if (productType === 'ai_subscription' || productType === 'productivity_app') {
                    // Generate email and password for subscriptions/apps
                    const emailPrefix = order.customerEmail.split('@')[0];
                    email = `${emailPrefix}+${item.product.slug}@softynix.com`;
                    password = `Pass${Math.random().toString(36).substring(2, 10)}!`;
                    subscriptionStatus = 'active';
                    // Set expiry to 1 year from now
                    expiresAt = new Date();
                    expiresAt.setFullYear(expiresAt.getFullYear() + 1);
                }
                else if (productType === 'software_license') {
                    // Generate license key
                    licenseKey = `LIC-${item.product.slug.toUpperCase()}-${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
                }
                else if (productType === 'course') {
                    // Course specific fields
                    subscriptionStatus = 'active';
                }
            }
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
    async getUserOrders(userId, pagination, filters) {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
        const { status, search } = filters;
        const skip = (page - 1) * limit;
        // Build where clause
        const where = {
            userId, // Filter by user ID
        };
        if (status)
            where.status = status;
        if (filters.paymentStatus)
            where.paymentStatus = filters.paymentStatus;
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
    async getAllOrders(pagination, filters) {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
        const { status, search } = filters;
        const skip = (page - 1) * limit;
        // Build where clause
        const where = {};
        if (status)
            where.status = status;
        if (filters.paymentStatus)
            where.paymentStatus = filters.paymentStatus;
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
    async getRecentOrders(limit = 5) {
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
    async getOrderById(id) {
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
    async getOrderByOrderNumber(orderNumber) {
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
    async createOrder(data) {
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
        const Decimal = products[0].price.constructor;
        let totalAmount = new Decimal(0);
        const orderItems = [];
        for (const item of data.items) {
            const product = products.find((p) => p.id === item.productId);
            if (!product) {
                throw new AppError(`Product ${item.productId} not found`, 400);
            }
            // Check stock availability
            if (product.stock < item.quantity) {
                throw new AppError(`Insufficient stock for product ${product.name}`, 400);
            }
            // product.price is already a Decimal from Prisma, use it directly
            const price = product.price;
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
        const order = await prisma.$transaction(async (tx) => {
            // Create order
            const orderData = {
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
            // Link to user if logged in (use relation syntax)
            if (data.userId) {
                orderData.user = {
                    connect: { id: data.userId },
                };
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
            if (newOrder.userId) {
                await this.createUserProductAccess(tx, newOrder, orderItems, products);
            }
            // Return order with items
            return tx.order.findUnique({
                where: { id: newOrder.id },
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
        });
        return order;
    }
    /**
     * Update order
     */
    async updateOrder(id, data) {
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
        const updateData = {};
        if (data.status !== undefined)
            updateData.status = data.status;
        if (data.paymentStatus !== undefined)
            updateData.paymentStatus = data.paymentStatus;
        if (data.shippingAddress !== undefined)
            updateData.shippingAddress = data.shippingAddress || null;
        if (data.notes !== undefined)
            updateData.notes = data.notes || null;
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
        if (data.paymentStatus === 'paid' &&
            order.userId &&
            existingOrder.paymentStatus !== 'paid') {
            await prisma.$transaction(async (tx) => {
                // Get products for the order
                const products = await tx.product.findMany({
                    where: {
                        id: { in: order.items.map((item) => item.productId) },
                    },
                    include: {
                        category: true,
                    },
                });
                await this.createUserProductAccess(tx, order, order.items, products);
            });
        }
        return order;
    }
    /**
     * Delete order (soft delete by cancelling)
     */
    async deleteOrder(id) {
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
            await prisma.$transaction(async (tx) => {
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
        }
        else {
            // If already cancelled, just delete
            await prisma.order.delete({
                where: { id },
            });
        }
    }
    /**
     * Get order statistics
     */
    async getOrderStats() {
        const [totalOrders, pendingOrders, processingOrders, deliveredOrders, totalRevenue,] = await Promise.all([
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
//# sourceMappingURL=order.service.js.map