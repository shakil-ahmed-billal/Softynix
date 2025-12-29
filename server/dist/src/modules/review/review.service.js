import { prisma } from '../../lib/prisma';
import { AppError } from '../../shared/errorHandler';
/**
 * Review Service
 * Handles all business logic for reviews
 */
export class ReviewService {
    /**
     * Get all reviews with pagination and filters
     */
    async getAllReviews(pagination, filters) {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
        const { status, search, productId, userId } = filters;
        const skip = (page - 1) * limit;
        // Build where clause
        const where = {};
        if (status)
            where.status = status;
        if (productId)
            where.productId = productId;
        if (userId)
            where.userId = userId;
        if (search) {
            where.OR = [
                { comment: { contains: search, mode: 'insensitive' } },
                { user: { name: { contains: search, mode: 'insensitive' } } },
                { user: { email: { contains: search, mode: 'insensitive' } } },
                { product: { name: { contains: search, mode: 'insensitive' } } },
            ];
        }
        // Get reviews and total count
        const [reviews, total] = await Promise.all([
            prisma.review.findMany({
                where,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    product: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        },
                    },
                },
                orderBy: {
                    [sortBy]: sortOrder,
                },
                skip,
                take: limit,
            }),
            prisma.review.count({ where }),
        ]);
        return {
            data: reviews,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    /**
     * Get approved reviews (for homepage)
     */
    async getApprovedReviews(limit = 6) {
        return prisma.review.findMany({
            where: {
                status: 'approved',
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                product: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: limit,
        });
    }
    /**
     * Get reviews by product ID
     */
    async getReviewsByProductId(productId) {
        return prisma.review.findMany({
            where: {
                productId,
                status: 'approved',
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    /**
     * Get reviews by user ID
     */
    async getReviewsByUserId(userId) {
        return prisma.review.findMany({
            where: {
                userId,
            },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        slug: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    /**
     * Get single review by ID
     */
    async getReviewById(id) {
        const review = await prisma.review.findUnique({
            where: { id },
            include: {
                user: true,
                product: true,
            },
        });
        if (!review) {
            throw new AppError('Review not found', 404);
        }
        return review;
    }
    /**
     * Create new review
     */
    async createReview(data) {
        // Verify user has purchased this product
        const hasAccess = await prisma.userProductAccess.findFirst({
            where: {
                userId: data.userId,
                productId: data.productId,
                status: 'active',
            },
        });
        // Also check if user has an order with this product
        if (!hasAccess) {
            const hasOrder = await prisma.orderItem.findFirst({
                where: {
                    order: {
                        userId: data.userId,
                        paymentStatus: 'paid',
                    },
                    productId: data.productId,
                },
            });
            if (!hasOrder) {
                throw new AppError('You must purchase this product before reviewing', 403);
            }
        }
        if (!hasAccess) {
            throw new AppError('You must purchase this product before reviewing', 403);
        }
        // Check if user already reviewed this product
        const existingReview = await prisma.review.findFirst({
            where: {
                userId: data.userId,
                productId: data.productId,
            },
        });
        if (existingReview) {
            throw new AppError('You have already reviewed this product', 400);
        }
        // Create review
        const review = await prisma.review.create({
            data: {
                userId: data.userId,
                productId: data.productId,
                orderId: data.orderId ?? null,
                rating: data.rating,
                comment: data.comment ?? null,
                status: 'pending', // Admin must approve
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                product: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
        });
        return review;
    }
    /**
     * Update review
     */
    async updateReview(id, userId, data) {
        // Check if review exists and belongs to user
        const existingReview = await prisma.review.findUnique({
            where: { id },
        });
        if (!existingReview) {
            throw new AppError('Review not found', 404);
        }
        if (existingReview.userId !== userId) {
            throw new AppError('You can only update your own reviews', 403);
        }
        // Update review
        const updateData = {};
        if (data.rating !== undefined)
            updateData.rating = data.rating;
        if (data.comment !== undefined)
            updateData.comment = data.comment ?? null;
        const review = await prisma.review.update({
            where: { id },
            data: updateData,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                product: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
        });
        return review;
    }
    /**
     * Delete review
     */
    async deleteReview(id, userId) {
        const review = await prisma.review.findUnique({
            where: { id },
        });
        if (!review) {
            throw new AppError('Review not found', 404);
        }
        if (review.userId !== userId) {
            throw new AppError('You can only delete your own reviews', 403);
        }
        await prisma.review.delete({
            where: { id },
        });
    }
    /**
     * Admin: Update review status
     */
    async updateReviewStatus(id, status) {
        const review = await prisma.review.findUnique({
            where: { id },
        });
        if (!review) {
            throw new AppError('Review not found', 404);
        }
        const updated = await prisma.review.update({
            where: { id },
            data: { status },
            include: {
                user: true,
                product: true,
            },
        });
        return updated;
    }
}
export const reviewService = new ReviewService();
//# sourceMappingURL=review.service.js.map