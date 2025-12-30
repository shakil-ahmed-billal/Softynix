import cors from "cors";
import express from "express";
import morgan from "morgan";
import { errorHandler } from "./shared/errorHandler.js";
// Import routes
import adminRoutes from "./modules/admin/admin.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import categoryRoutes from "./modules/category/category.routes.js";
import courseRoutes from "./modules/course/course.routes.js";
import orderRoutes from "./modules/order/order.routes.js";
import productRoutes from "./modules/product/product.routes.js";
import productCredentialsRoutes from "./modules/product-credentials/product-credentials.routes.js";
import reviewRoutes from "./modules/review/review.routes.js";
import userProductAccessRoutes from "./modules/user-product-access/user-product-access.routes.js";
const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// middleware connection
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://softynix-emn3.vercel.app",
    ],
    credentials: true,
}));
// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
        timestamp: new Date().toISOString(),
    });
});
// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/product-credentials", productCredentialsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user-product-access", userProductAccessRoutes);
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path,
        timestamp: new Date().toISOString(),
        endpoint: {
            "POST_login": "/api/auth/login",
            "GET_products": "/api/products",
            "GET_categories": "/api/categories",
            "GET_orders": "/api/orders",
            "GET_admin": "/api/admin",
            "POST_register": "/api/auth/register",
            "POST_logout": "/api/auth/logout",
            "POST_forgot-password": "/api/auth/forgot-password",
            "POST_reset-password": "/api/auth/reset-password",
            "POST_verify-email": "/api/auth/verify-email",
            "POST_verify-email-otp": "/api/auth/verify-email-otp",
            "POST_verify-email-otp-resend": "/api/auth/verify-email-otp-resend",
        }
    });
});
// Global error handler (must be last)
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map