# Migration: Add Image Field to Reviews

## Database Migration Required

The Review schema has been updated to include an `image` field. You need to run a database migration to add this column.

### Option 1: Using Prisma Migrate (Recommended)

```bash
cd server
npx prisma migrate dev --name add_review_image
```

### Option 2: Manual SQL Migration

If Prisma migrate has issues, you can run this SQL directly:

```sql
ALTER TABLE "reviews" ADD COLUMN "image" TEXT;
```

### Option 3: Reset and Migrate (Development Only - WARNING: Deletes all data)

```bash
cd server
npx prisma migrate reset
```

## What Changed

1. **Schema Update**: Added `image String?` field to Review model
2. **Backend**: 
   - Updated review validation to accept image
   - Updated review controller to handle image uploads via Cloudinary
   - Updated review service to save image field
   - Updated review routes to use multer middleware
3. **Frontend**:
   - Updated review form to include image upload
   - Updated review mutations to handle FormData

## Testing

After running the migration:
1. Test creating a review with an image file
2. Test creating a review with an image URL
3. Test updating a review with a new image
4. Verify images are uploaded to Cloudinary
5. Verify image URLs are stored in the database

