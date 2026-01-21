# Prisma Studio Connection Fix

## Issue
Prisma Studio shows "invalid startup packet layout: expected terminator as last byte" error.

## Root Cause
This error occurs when Prisma Studio has issues connecting to PostgreSQL. This can happen due to:
1. Malformed DATABASE_URL connection string
2. Connection string encoding issues
3. PostgreSQL server connection problems

## Solution

### Option 1: Verify DATABASE_URL Format

Ensure your `.env` file has a properly formatted DATABASE_URL:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
```

**Important Notes:**
- If your password contains special characters, URL-encode them
- Use quotes around the connection string
- Ensure no trailing spaces or newlines

### Option 2: Run Prisma Studio Directly

Prisma Studio reads directly from `schema.prisma` and doesn't use the adapter. Run it with:

```bash
cd server
npx prisma studio
```

### Option 3: Use Direct Connection (Bypass Adapter)

If the issue persists, you can temporarily modify `src/lib/prisma.ts` to use direct connection:

```typescript
// Temporarily comment out the adapter for Studio testing
// const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: connectionString,
    },
  },
});
```

**Note:** Remember to restore the adapter for production use.

### Option 4: Check PostgreSQL Connection

Verify your PostgreSQL server is running and accessible:

```bash
# Test connection
psql -h localhost -U your_username -d your_database
```

### Option 5: Regenerate Prisma Client

Sometimes regenerating the client helps:

```bash
cd server
npx prisma generate
npx prisma studio
```

## Common DATABASE_URL Issues

1. **Special Characters in Password**: URL-encode them
   - `@` becomes `%40`
   - `#` becomes `%23`
   - `%` becomes `%25`
   - etc.

2. **Missing Schema**: Add `?schema=public` at the end

3. **Wrong Port**: Ensure PostgreSQL port (default: 5432) is correct

4. **Database Doesn't Exist**: Create the database first:
   ```sql
   CREATE DATABASE softynix_db;
   ```

## Example Correct DATABASE_URL

```env
# Simple (no special chars in password)
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/softynix_db?schema=public"

# With special characters (URL-encoded)
DATABASE_URL="postgresql://postgres:my%40password@localhost:5432/softynix_db?schema=public"
```

