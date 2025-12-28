# Prisma Studio Connection Troubleshooting

## Error: "invalid startup packet layout: expected terminator as last byte"

This error occurs when Prisma Studio cannot properly connect to PostgreSQL.

## Quick Fixes

### 1. Verify DATABASE_URL Format

Check your `server/.env` file. The DATABASE_URL must be properly formatted:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
```

**Critical Points:**
- Use double quotes around the connection string
- No spaces before or after the quotes
- URL-encode special characters in password:
  - `@` → `%40`
  - `#` → `%23`
  - `%` → `%25`
  - `&` → `%26`
  - Space → `%20` or `+`

### 2. Test Database Connection

Verify PostgreSQL is accessible:

```bash
# Test with psql
psql -h localhost -U your_username -d your_database

# Or test connection string
psql "postgresql://username:password@localhost:5432/database_name"
```

### 3. Regenerate Prisma Client

```bash
cd server
npx prisma generate
npx prisma studio
```

### 4. Check PostgreSQL is Running

```bash
# Windows (if installed as service)
sc query postgresql-x64-*

# Or check if port 5432 is listening
netstat -an | findstr 5432
```

### 5. Alternative: Use Direct Connection String

If the issue persists, try adding `directUrl` to schema.prisma (already done):

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DATABASE_URL")
}
```

### 6. Run Prisma Studio with Explicit Schema

```bash
cd server
npx prisma studio --schema=./prisma/schema.prisma
```

### 7. Check for Connection Pool Issues

If using a connection pooler (like PgBouncer), try connecting directly to PostgreSQL:

```env
# Instead of pooler URL, use direct PostgreSQL URL
DATABASE_URL="postgresql://user:pass@localhost:5432/db?schema=public&connection_limit=1"
```

## Common DATABASE_URL Examples

```env
# Simple (no special chars)
DATABASE_URL="postgresql://postgres:password123@localhost:5432/softynix_db?schema=public"

# With special characters (URL-encoded)
DATABASE_URL="postgresql://postgres:my%40pass%23word@localhost:5432/softynix_db?schema=public"

# With connection parameters
DATABASE_URL="postgresql://postgres:password@localhost:5432/softynix_db?schema=public&connection_limit=5&pool_timeout=10"
```

## Still Not Working?

1. **Check Prisma Version Compatibility:**
   ```bash
   cd server
   npx prisma --version
   ```

2. **Try Updating Prisma:**
   ```bash
   npm install prisma@latest @prisma/client@latest
   npx prisma generate
   ```

3. **Check PostgreSQL Logs:**
   - Look for connection errors in PostgreSQL logs
   - Verify the database exists and user has permissions

4. **Use Alternative Tool:**
   - Use `pgAdmin` or `DBeaver` to verify database connection
   - Use `npx prisma db pull` to test connection

## Verification

After fixing, verify the connection:

```bash
cd server
npx prisma db pull --print
```

If this works, Prisma Studio should also work.

