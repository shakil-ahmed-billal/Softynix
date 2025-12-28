#!/usr/bin/env node
/**
 * Fix script for Prisma Studio connection issues
 * This script validates and fixes DATABASE_URL format
 */

import { config } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: join(__dirname, ".env") });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL is not set in .env file");
  console.log("\nPlease add DATABASE_URL to server/.env:");
  console.log(
    'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/database_name?schema=public"'
  );
  process.exit(1);
}

console.log("✅ DATABASE_URL found");
console.log("📝 Format check...");

// Validate format
const postgresqlRegex = /^postgresql:\/\/[^:]+:[^@]+@[^:]+:\d+\/[^?]+(\?.*)?$/;

if (!postgresqlRegex.test(DATABASE_URL)) {
  console.warn("⚠️  DATABASE_URL format might be incorrect");
  console.log(
    "Expected format: postgresql://user:password@host:port/database?schema=public"
  );
}

// Check for common issues
const issues = [];

if (DATABASE_URL.includes(" ") && !DATABASE_URL.startsWith('"')) {
  issues.push("Connection string contains spaces and is not quoted");
}

if (DATABASE_URL.includes("@") && DATABASE_URL.split("@").length > 2) {
  issues.push("Password might contain @ character - needs URL encoding (%40)");
}

if (DATABASE_URL.includes("#") && !DATABASE_URL.includes("%23")) {
  issues.push("Password contains # character - needs URL encoding (%23)");
}

if (issues.length > 0) {
  console.warn("\n⚠️  Potential issues found:");
  issues.forEach((issue) => console.warn(`  - ${issue}`));
} else {
  console.log("✅ DATABASE_URL format looks good");
}

console.log("\n🔧 To fix Prisma Studio:");
console.log("1. Ensure DATABASE_URL is properly formatted in server/.env");
console.log("2. URL-encode special characters in password");
console.log("3. Run: cd server && npx prisma studio");
console.log("\n📖 See PRISMA_STUDIO_TROUBLESHOOTING.md for detailed help");
