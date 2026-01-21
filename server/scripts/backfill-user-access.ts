/**
 * Script to backfill UserProductAccess entries for existing orders
 * Run with: npx tsx scripts/backfill-user-access.ts
 */

import { prisma } from '../src/lib/prisma';

/**
 * Determine product type from category name/slug
 */
function determineProductType(categoryName: string, categorySlug: string, productName: string): string {
  const nameLower = categoryName.toLowerCase();
  const slugLower = categorySlug.toLowerCase();
  const productLower = productName.toLowerCase();

  // Check for AI subscriptions
  if (
    nameLower.includes('ai') ||
    nameLower.includes('subscription') ||
    slugLower.includes('ai') ||
    slugLower.includes('subscription') ||
    productLower.includes('chatgpt') ||
    productLower.includes('claude') ||
    productLower.includes('yai')
  ) {
    return 'ai_subscription';
  }

  // Check for software licenses
  if (
    nameLower.includes('software') ||
    nameLower.includes('license') ||
    slugLower.includes('software') ||
    slugLower.includes('license')
  ) {
    return 'software_license';
  }

  // Check for productivity apps
  if (
    nameLower.includes('productivity') ||
    nameLower.includes('app') ||
    slugLower.includes('productivity') ||
    slugLower.includes('app')
  ) {
    return 'productivity_app';
  }

  // Check for courses
  if (
    nameLower.includes('course') ||
    nameLower.includes('learning') ||
    nameLower.includes('education') ||
    slugLower.includes('course') ||
    slugLower.includes('learning')
  ) {
    return 'course';
  }

  // Default to ai_subscription if unclear
  return 'ai_subscription';
}

async function backfillUserAccess(userEmail: string) {
  console.log(`\n🔍 Finding user: ${userEmail}...`);

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    console.error(`❌ User not found: ${userEmail}`);
    process.exit(1);
  }

  console.log(`✅ Found user: ${user.name} (${user.id})\n`);

  // Find all orders for this user
  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  console.log(`📦 Found ${orders.length} orders for this user\n`);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const order of orders) {
    console.log(`Processing order: ${order.orderNumber} (${order.items.length} items)`);

    for (const item of order.items) {
      try {
        // Check if access already exists
        const existingAccess = await prisma.userProductAccess.findUnique({
          where: { orderItemId: item.id },
        });

        if (existingAccess) {
          console.log(`  ⏭️  Skipping item ${item.id} - access already exists`);
          skipped++;
          continue;
        }

        const productType = determineProductType(
          item.product.category.name,
          item.product.category.slug,
          item.product.name
        );

        // Only use admin-created credentials - no automatic generation
        const productCredentials = await prisma.productCredentials.findUnique({
          where: { productId: item.productId },
        });

        // Initialize credential variables - will only be set if admin has created credentials
        let email: string | undefined;
        let password: string | undefined;
        let licenseKey: string | undefined;
        let subscriptionStatus: string | undefined;
        let expiresAt: Date | undefined;
        let accessUrl: string | undefined;
        let downloadUrl: string | undefined;

        if (productCredentials) {
          // Use admin-created credentials only
          email = productCredentials.email;
          password = productCredentials.password;
          licenseKey = productCredentials.licenseKey;
          subscriptionStatus = productCredentials.subscriptionStatus || 'active';
          expiresAt = productCredentials.expiresAt || undefined;
          accessUrl = productCredentials.accessUrl;
          downloadUrl = productCredentials.downloadUrl;
        }
        // If no admin credentials exist, all values remain undefined/null
        // Admin must create credentials from the admin dashboard

        await prisma.userProductAccess.create({
          data: {
            userId: order.userId!,
            orderId: order.id,
            orderItemId: item.id,
            productId: item.productId,
            productType,
            email,
            password,
            licenseKey,
            accessUrl,
            downloadUrl,
            subscriptionStatus,
            expiresAt,
            status: 'active',
          },
        });

        console.log(`  ✅ Created access for: ${item.product.name} (${productType})`);
        created++;
      } catch (error: any) {
        console.error(`  ❌ Error creating access for item ${item.id}:`, error.message);
        errors++;
      }
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Created: ${created}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Errors: ${errors}`);
  console.log(`\n✨ Done!\n`);
}

// Run the script
const userEmail = process.argv[2] || 'shakil@gmail.com';

backfillUserAccess(userEmail)
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

