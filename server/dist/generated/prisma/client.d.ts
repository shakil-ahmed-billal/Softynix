import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class.js";
import * as Prisma from "./internal/prismaNamespace.js";
export * as $Enums from './enums.js';
export * from "./enums.js";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Categories
 * const categories = await prisma.category.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model Category
 *
 */
export type Category = Prisma.CategoryModel;
/**
 * Model Product
 *
 */
export type Product = Prisma.ProductModel;
/**
 * Model ProductCredentials
 *
 */
export type ProductCredentials = Prisma.ProductCredentialsModel;
/**
 * Model Order
 *
 */
export type Order = Prisma.OrderModel;
/**
 * Model OrderItem
 *
 */
export type OrderItem = Prisma.OrderItemModel;
/**
 * Model AdminUser
 *
 */
export type AdminUser = Prisma.AdminUserModel;
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model Review
 *
 */
export type Review = Prisma.ReviewModel;
/**
 * Model UserProductAccess
 *
 */
export type UserProductAccess = Prisma.UserProductAccessModel;
/**
 * Model Course
 *
 */
export type Course = Prisma.CourseModel;
/**
 * Model CourseLessonCompletion
 *
 */
export type CourseLessonCompletion = Prisma.CourseLessonCompletionModel;
//# sourceMappingURL=client.d.ts.map