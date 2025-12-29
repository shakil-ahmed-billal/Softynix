import app from "../dist/src/app.js";
import { prisma } from "../dist/src/lib/prisma.js";

// Ensure database connection is ready for serverless functions
// Prisma will handle connection pooling automatically
prisma.$connect().catch(console.error);

export default app;

