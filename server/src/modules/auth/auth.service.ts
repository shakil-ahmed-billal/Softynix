import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma';
import { AppError } from '../../shared/errorHandler';
import { generateToken, TokenPayload } from '../../lib/jwt';

/**
 * Auth Service
 * Handles all authentication business logic
 */

export class AuthService {
  /**
   * Hash password
   */
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Compare password with hash
   */
  private async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * User signup
   */
  async signup(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<{ user: any; token: string }> {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new AppError('User with this email already exists', 400);
    }

    // Hash password
    const hashedPassword = await this.hashPassword(data.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        status: 'active',
        emailVerified: false,
      },
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
        // Don't return password
      },
    });

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      type: 'user',
    });

    return { user, token };
  }

  /**
   * User login
   */
  async login(email: string, password: string): Promise<{ user: any; token: string }> {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // Check if user is active
    if (user.status !== 'active') {
      throw new AppError('Account is inactive. Please contact support.', 403);
    }

    // Verify password
    const isPasswordValid = await this.comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      type: 'user',
    });

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  /**
   * Admin login
   */
  async adminLogin(email: string, password: string): Promise<{ admin: any; token: string }> {
    // Find admin
    const admin = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!admin) {
      throw new AppError('Invalid email or password', 401);
    }

    // Check if admin is active
    if (admin.status !== 'active') {
      throw new AppError('Account is inactive. Please contact support.', 403);
    }

    // Verify password (for now, simple comparison - in production use bcrypt)
    // TODO: Implement proper password hashing for admin users
    const isPasswordValid = password === admin.password;

    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    // Generate token
    const token = generateToken({
      userId: admin.id,
      email: admin.email,
      type: 'admin',
    });

    // Return admin without password
    const { password: _, ...adminWithoutPassword } = admin;

    return {
      admin: adminWithoutPassword,
      token,
    };
  }

  /**
   * Get user profile
   */
  async getProfile(userId: string): Promise<any> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
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
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  /**
   * Update user profile
   */
  async updateProfile(
    userId: string,
    data: {
      name?: string;
      phone?: string;
      avatar?: string;
    }
  ): Promise<any> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.phone !== undefined && { phone: data.phone }),
        ...(data.avatar !== undefined && { avatar: data.avatar || null }),
      },
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
      },
    });

    return updatedUser;
  }

  /**
   * Change password
   */
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Verify current password
    const isPasswordValid = await this.comparePassword(currentPassword, user.password);

    if (!isPasswordValid) {
      throw new AppError('Current password is incorrect', 400);
    }

    // Hash new password
    const hashedPassword = await this.hashPassword(newPassword);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });
  }
}

export const authService = new AuthService();

