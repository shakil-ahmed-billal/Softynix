import { PrismaClient } from './../../generated/prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
// @ts-ignore - Generated Prisma client outside rootDir
// import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
