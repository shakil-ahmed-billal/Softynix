# User Dashboard Implementation Guide

## Overview
This document describes the implementation of a dynamic user dashboard system that displays user-specific product purchases, subscriptions, licenses, apps, and courses.

## Database Schema

### New Models Added

1. **UserProductAccess** - Stores access details for purchased products
   - Links users to their purchased products via orders
   - Stores credentials (email/password), license keys, download URLs
   - Tracks course progress and subscription status
   - Supports multiple product types: `ai_subscription`, `software_license`, `productivity_app`, `course`

2. **Course** - Stores course-specific data
   - Links to products
   - Contains course metadata (instructor, duration, level, etc.)
   - Stores course resources and modules

### Schema Relationships
- `UserProductAccess` → `User` (many-to-one)
- `UserProductAccess` → `Order` (many-to-one)
- `UserProductAccess` → `OrderItem` (one-to-one)
- `UserProductAccess` → `Product` (many-to-one)
- `Course` → `Product` (one-to-one)

## API Endpoints

### User Product Access Endpoints
- `GET /api/user-product-access/purchases` - Get all user purchases with pagination
- `GET /api/user-product-access/ai-subscriptions` - Get AI subscriptions
- `GET /api/user-product-access/software-licenses` - Get software licenses
- `GET /api/user-product-access/productivity-apps` - Get productivity apps
- `GET /api/user-product-access/courses` - Get courses
- `GET /api/user-product-access/:id` - Get single product access
- `PUT /api/user-product-access/:id/course-progress` - Update course progress

All endpoints require authentication (`userAuth` middleware).

## Frontend Implementation

### Hooks Created
- `useUserPurchases` - Fetch user purchases with filters
- `useAISubscriptions` - Fetch AI subscriptions
- `useSoftwareLicenses` - Fetch software licenses
- `useProductivityApps` - Fetch productivity apps
- `useCourses` - Fetch courses
- `useUpdateCourseProgress` - Update course progress

### Pages Updated
1. **My Purchases** (`/dashboard/purchases`)
   - Displays all purchased products
   - Shows product name, category, purchase date, amount
   - Links to specific product type pages

2. **AI Subscriptions** (`/dashboard/ai-subscription`)
   - Shows active and expired subscriptions
   - Displays email/password credentials
   - Shows expiry dates

3. **Software Licenses** (`/dashboard/software-license`)
   - Displays license keys
   - Shows download links
   - Displays activation status

4. **Productivity Apps** (`/dashboard/productivity-apps`)
   - Shows app access credentials
   - Provides access buttons
   - Displays expiry information

5. **Learning Courses** (`/dashboard/learning-platform`)
   - Displays course cards with progress
   - Shows completion status
   - Links to course content

## Setup Instructions

### 1. Database Migration

Run the migration to create the new tables:

```bash
cd server
npx prisma migrate dev --name add_user_product_access_and_courses
```

If you encounter drift issues, you may need to reset:

```bash
npx prisma migrate reset
npx prisma migrate dev
```

### 2. Generate Prisma Client

```bash
cd server
npx prisma generate
```

### 3. Create Product Access Entries

When an order is completed/paid, you need to create `UserProductAccess` entries. This should be done in the order service when payment status changes to "paid".

**TODO**: Add logic in `order.service.ts` to create `UserProductAccess` entries when:
- Order status = "completed" OR
- Payment status = "paid"

Example implementation needed in `order.service.ts`:

```typescript
// After order is created and payment confirmed
if (order.paymentStatus === 'paid' && order.userId) {
  // Create UserProductAccess for each order item
  for (const item of order.items) {
    await prisma.userProductAccess.create({
      data: {
        userId: order.userId,
        orderId: order.id,
        orderItemId: item.id,
        productId: item.productId,
        productType: determineProductType(item.product), // Helper function
        // Add credentials, license keys, etc. based on product type
        status: 'active',
      },
    });
  }
}
```

### 4. Product Type Determination

You need to determine product type based on:
- Category name/slug
- Product metadata
- Custom field in Product model (recommended: add `productType` field)

**Recommended**: Add a `productType` field to the `Product` model:

```prisma
model Product {
  // ... existing fields
  productType String? // ai_subscription, software_license, productivity_app, course
}
```

## Data Flow

1. User purchases a product → Order created
2. Payment confirmed → Order status updated to "completed"
3. System creates `UserProductAccess` entry with:
   - User credentials (if subscription/app)
   - License key (if software)
   - Course access (if course)
   - Download links (if applicable)
4. User views dashboard → API fetches their `UserProductAccess` entries
5. Frontend displays products based on type

## Security Considerations

1. **Password Storage**: Passwords should be encrypted at rest (use bcrypt or similar)
2. **Access Control**: All endpoints verify user ownership
3. **Data Validation**: All inputs are validated using Zod schemas
4. **Rate Limiting**: Consider adding rate limiting to prevent abuse

## Next Steps

1. ✅ Database schema created
2. ✅ API endpoints created
3. ✅ Frontend pages updated
4. ⏳ Run database migration
5. ⏳ Add logic to create UserProductAccess on order completion
6. ⏳ Add productType field to Product model (optional but recommended)
7. ⏳ Test with real data

## Testing

1. Create a test order with payment status "paid"
2. Verify UserProductAccess entries are created
3. View dashboard pages and verify data displays correctly
4. Test course progress updates
5. Verify all product types work correctly

