import { PrismaClient } from './../../generated/prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
// @ts-ignore - Generated Prisma client outside rootDir
// import { PrismaClient } from '@prisma/client'

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Prisma Studio reads directly from schema.prisma and doesn't use this file
// The adapter is only used by the application server
// For Prisma Studio to work, ensure DATABASE_URL in .env is properly formatted
let prisma: PrismaClient;

// Use PrismaPg adapter for server runtime (better for serverless/edge)
// This doesn't affect Prisma Studio which connects directly via schema.prisma
const adapter = new PrismaPg({ connectionString });
prisma = new PrismaClient({ adapter });

export { prisma };
