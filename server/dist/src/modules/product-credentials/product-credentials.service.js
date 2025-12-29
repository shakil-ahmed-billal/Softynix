import { prisma } from '../../lib/prisma';
import { AppError } from '../../shared/errorHandler';
/**
 * Product Credentials Service
 * Handles management of product credentials that admins can assign to products
 */
export class ProductCredentialsService {
    /**
     * Get all product credentials with pagination and filters
     */
    async getAllProductCredentials(pagination, filters) {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
        const { productId, productType, search } = filters;
        const skip = (page - 1) * limit;
        // Build where clause
        const where = {};
        if (productId)
            where.productId = productId;
        if (productType)
            where.productType = productType;
        if (search) {
            where.OR = [
                { product: { name: { contains: search, mode: 'insensitive' } } },
                { email: { contains: search, mode: 'insensitive' } },
                { licenseKey: { contains: search, mode: 'insensitive' } },
            ];
        }
        // Get credentials and total count
        const [credentials, total] = await Promise.all([
            prisma.productCredentials.findMany({
                where,
                include: {
                    product: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                            image: true,
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
            prisma.productCredentials.count({ where }),
        ]);
        return {
            data: credentials,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    /**
     * Get credentials by product ID
     */
    async getCredentialsByProductId(productId) {
        return prisma.productCredentials.findUnique({
            where: { productId },
            include: {
                product: {
                    include: {
                        category: true,
                    },
                },
            },
        });
    }
    /**
     * Get single credentials by ID
     */
    async getCredentialsById(id) {
        const credentials = await prisma.productCredentials.findUnique({
            where: { id },
            include: {
                product: {
                    include: {
                        category: true,
                    },
                },
            },
        });
        if (!credentials) {
            throw new AppError('Product credentials not found', 404);
        }
        return credentials;
    }
    /**
     * Create or update product credentials
     */
    async upsertProductCredentials(data) {
        // Verify product exists
        const product = await prisma.product.findUnique({
            where: { id: data.productId },
            include: { category: true },
        });
        if (!product) {
            throw new AppError('Product not found', 404);
        }
        // Check if credentials already exist
        const existing = await prisma.productCredentials.findUnique({
            where: { productId: data.productId },
        });
        if (existing) {
            // Update existing credentials
            return prisma.productCredentials.update({
                where: { productId: data.productId },
                data: {
                    productType: data.productType,
                    email: data.email ?? null,
                    password: data.password ?? null,
                    licenseKey: data.licenseKey ?? null,
                    accessUrl: data.accessUrl ?? null,
                    downloadUrl: data.downloadUrl ?? null,
                    subscriptionStatus: data.subscriptionStatus ?? null,
                    expiresAt: data.expiresAt ?? null,
                    metadata: data.metadata ?? null,
                    notes: data.notes ?? null,
                },
                include: {
                    product: {
                        include: {
                            category: true,
                        },
                    },
                },
            });
        }
        else {
            // Create new credentials
            return prisma.productCredentials.create({
                data: {
                    productId: data.productId,
                    productType: data.productType,
                    email: data.email ?? null,
                    password: data.password ?? null,
                    licenseKey: data.licenseKey ?? null,
                    accessUrl: data.accessUrl ?? null,
                    downloadUrl: data.downloadUrl ?? null,
                    subscriptionStatus: data.subscriptionStatus ?? null,
                    expiresAt: data.expiresAt ?? null,
                    metadata: data.metadata ?? null,
                    notes: data.notes ?? null,
                },
                include: {
                    product: {
                        include: {
                            category: true,
                        },
                    },
                },
            });
        }
    }
    /**
     * Delete product credentials
     */
    async deleteProductCredentials(id) {
        const credentials = await prisma.productCredentials.findUnique({
            where: { id },
        });
        if (!credentials) {
            throw new AppError('Product credentials not found', 404);
        }
        await prisma.productCredentials.delete({
            where: { id },
        });
    }
    /**
     * Apply credentials to existing user product access entries
     * This updates all UserProductAccess entries for a product with the credentials
     */
    async applyCredentialsToUsers(productId) {
        const credentials = await prisma.productCredentials.findUnique({
            where: { productId },
        });
        if (!credentials) {
            throw new AppError('Product credentials not found', 404);
        }
        // Update all active user access entries for this product
        const result = await prisma.userProductAccess.updateMany({
            where: {
                productId,
                status: 'active',
            },
            data: {
                email: credentials.email,
                password: credentials.password,
                licenseKey: credentials.licenseKey,
                accessUrl: credentials.accessUrl,
                downloadUrl: credentials.downloadUrl,
                subscriptionStatus: credentials.subscriptionStatus,
                expiresAt: credentials.expiresAt,
                metadata: credentials.metadata,
            },
        });
        return result.count;
    }
}
export const productCredentialsService = new ProductCredentialsService();
//# sourceMappingURL=product-credentials.service.js.map