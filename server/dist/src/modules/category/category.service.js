import { prisma } from '../../lib/prisma';
import { AppError } from '../../shared/errorHandler';
/**
 * Category Service
 * Handles all business logic for categories
 */
export class CategoryService {
    /**
     * Get all categories with pagination and filters
     */
    async getAllCategories(pagination, filters) {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
        const { status, search } = filters;
        const skip = (page - 1) * limit;
        // Build where clause
        const where = {};
        if (status)
            where.status = status;
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }
        // Get categories and total count
        const [categories, total] = await Promise.all([
            prisma.category.findMany({
                where,
                include: {
                    _count: {
                        select: {
                            products: true,
                        },
                    },
                },
                orderBy: {
                    [sortBy]: sortOrder,
                },
                skip,
                take: limit,
            }),
            prisma.category.count({ where }),
        ]);
        return {
            data: categories,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    /**
     * Get single category by ID
     */
    async getCategoryById(id) {
        const category = await prisma.category.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        products: true,
                    },
                },
            },
        });
        if (!category) {
            throw new AppError('Category not found', 404);
        }
        return category;
    }
    /**
     * Get category by slug
     */
    async getCategoryBySlug(slug) {
        const category = await prisma.category.findUnique({
            where: { slug },
            include: {
                _count: {
                    select: {
                        products: true,
                    },
                },
            },
        });
        if (!category) {
            throw new AppError('Category not found', 404);
        }
        return category;
    }
    /**
     * Create new category
     */
    async createCategory(data) {
        // Check if slug already exists
        const existingCategory = await prisma.category.findUnique({
            where: { slug: data.slug },
        });
        if (existingCategory) {
            throw new AppError('Category with this slug already exists', 400);
        }
        // Create category
        const category = await prisma.category.create({
            data: {
                name: data.name,
                slug: data.slug,
                description: data.description ?? null,
                image: data.image ?? null,
                status: data.status || 'active',
            },
            include: {
                _count: {
                    select: {
                        products: true,
                    },
                },
            },
        });
        return category;
    }
    /**
     * Update category
     */
    async updateCategory(id, data) {
        // Check if category exists
        const existingCategory = await prisma.category.findUnique({
            where: { id },
        });
        if (!existingCategory) {
            throw new AppError('Category not found', 404);
        }
        // Check if slug is being updated and already exists
        if (data.slug && data.slug !== existingCategory.slug) {
            const slugExists = await prisma.category.findUnique({
                where: { slug: data.slug },
            });
            if (slugExists) {
                throw new AppError('Category with this slug already exists', 400);
            }
        }
        // Update category
        const updateData = {};
        if (data.name !== undefined)
            updateData.name = data.name;
        if (data.slug !== undefined)
            updateData.slug = data.slug;
        if (data.description !== undefined)
            updateData.description = data.description ?? null;
        if (data.image !== undefined)
            updateData.image = data.image ?? null;
        if (data.status !== undefined)
            updateData.status = data.status;
        const category = await prisma.category.update({
            where: { id },
            data: updateData,
            include: {
                _count: {
                    select: {
                        products: true,
                    },
                },
            },
        });
        return category;
    }
    /**
     * Delete category
     */
    async deleteCategory(id) {
        const category = await prisma.category.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        products: true,
                    },
                },
            },
        });
        if (!category) {
            throw new AppError('Category not found', 404);
        }
        // Check if category has products
        if (category._count.products > 0) {
            throw new AppError('Cannot delete category with existing products', 400);
        }
        await prisma.category.delete({
            where: { id },
        });
    }
    /**
     * Get all active categories (for public use)
     */
    async getActiveCategories() {
        return prisma.category.findMany({
            where: {
                status: 'active',
            },
            include: {
                _count: {
                    select: {
                        products: true,
                    },
                },
            },
            orderBy: {
                name: 'asc',
            },
        });
    }
}
export const categoryService = new CategoryService();
//# sourceMappingURL=category.service.js.map