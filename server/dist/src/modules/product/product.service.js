import { prisma } from '../../lib/prisma.js';
import { AppError } from '../../shared/errorHandler.js';
/**
 * Product Service
 * Handles all business logic for products
 */
export class ProductService {
    /**
     * Get all products with pagination and filters
     */
    async getAllProducts(pagination, filters) {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
        const { status, categoryId, featured, search } = filters;
        const skip = (page - 1) * limit;
        // Build where clause
        const where = {};
        if (status)
            where.status = status;
        if (categoryId)
            where.categoryId = categoryId;
        if (featured !== undefined)
            where.featured = featured;
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }
        // Get products and total count
        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                        },
                    },
                },
                orderBy: {
                    [sortBy]: sortOrder,
                },
                skip,
                take: limit,
            }),
            prisma.product.count({ where }),
        ]);
        return {
            data: products,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    /**
     * Get single product by ID
     */
    async getProductById(id) {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        description: true,
                    },
                },
            },
        });
        if (!product) {
            throw new AppError('Product not found', 404);
        }
        return product;
    }
    /**
     * Get product by slug
     */
    async getProductBySlug(slug) {
        const product = await prisma.product.findUnique({
            where: { slug },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        description: true,
                    },
                },
            },
        });
        if (!product) {
            throw new AppError('Product not found', 404);
        }
        return product;
    }
    /**
     * Create new product
     */
    async createProduct(data) {
        // Check if slug already exists
        const existingProduct = await prisma.product.findUnique({
            where: { slug: data.slug },
        });
        if (existingProduct) {
            throw new AppError('Product with this slug already exists', 400);
        }
        // Verify category exists
        const category = await prisma.category.findUnique({
            where: { id: data.categoryId },
        });
        if (!category) {
            throw new AppError('Category not found', 404);
        }
        // Create product
        const product = await prisma.product.create({
            data: {
                name: data.name,
                slug: data.slug,
                description: data.description ?? null,
                price: data.price,
                image: data.image ?? null,
                images: data.images || [],
                categoryId: data.categoryId,
                status: data.status || 'active',
                stock: data.stock || 0,
                featured: data.featured || false,
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
        });
        return product;
    }
    /**
     * Update product
     */
    async updateProduct(id, data) {
        // Check if product exists
        const existingProduct = await prisma.product.findUnique({
            where: { id },
        });
        if (!existingProduct) {
            throw new AppError('Product not found', 404);
        }
        // Check if slug is being updated and already exists
        if (data.slug && data.slug !== existingProduct.slug) {
            const slugExists = await prisma.product.findUnique({
                where: { slug: data.slug },
            });
            if (slugExists) {
                throw new AppError('Product with this slug already exists', 400);
            }
        }
        // Verify category exists if being updated
        if (data.categoryId) {
            const category = await prisma.category.findUnique({
                where: { id: data.categoryId },
            });
            if (!category) {
                throw new AppError('Category not found', 404);
            }
        }
        // Update product
        const updateData = {};
        if (data.name !== undefined)
            updateData.name = data.name;
        if (data.slug !== undefined)
            updateData.slug = data.slug;
        if (data.description !== undefined)
            updateData.description = data.description ?? null;
        if (data.price !== undefined)
            updateData.price = data.price;
        if (data.image !== undefined)
            updateData.image = data.image ?? null;
        if (data.images !== undefined)
            updateData.images = data.images;
        if (data.categoryId !== undefined)
            updateData.categoryId = data.categoryId;
        if (data.status !== undefined)
            updateData.status = data.status;
        if (data.stock !== undefined)
            updateData.stock = data.stock;
        if (data.featured !== undefined)
            updateData.featured = data.featured;
        const product = await prisma.product.update({
            where: { id },
            data: updateData,
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
        });
        return product;
    }
    /**
     * Delete product
     */
    async deleteProduct(id) {
        const product = await prisma.product.findUnique({
            where: { id },
        });
        if (!product) {
            throw new AppError('Product not found', 404);
        }
        await prisma.product.delete({
            where: { id },
        });
    }
    /**
     * Get featured products
     */
    async getFeaturedProducts(limit = 10) {
        return prisma.product.findMany({
            where: {
                featured: true,
                status: 'active',
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: limit,
        });
    }
}
export const productService = new ProductService();
//# sourceMappingURL=product.service.js.map