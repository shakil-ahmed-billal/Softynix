# Vercel Deployment Fixes

This document outlines the fixes applied for Vercel deployment issues.

## Issues Fixed

### 1. ✅ Prisma Order Creation Error

**Problem**: 
```
Unknown argument `userId`. Did you mean `user`?
```

**Root Cause**: 
When using Prisma relation syntax (`user: { connect: { id } }`), you cannot also set the foreign key (`userId`) directly. Prisma automatically sets it when using the relation.

**Fix Applied**:
- Removed direct `userId` assignment when using relation syntax
- Order now uses only `user: { connect: { id: data.userId } }`
- Order is fetched after creation to ensure `userId` is populated

**File Modified**: `server/src/modules/order/order.service.ts`

### 2. ✅ Google Tag Manager Integration

**Problem**: 
Google Tag Manager was not configured.

**Fix Applied**:
- Created `GoogleTagManager` component
- Added GTM script initialization
- Added noscript fallback
- GTM loads before other analytics scripts

**Files Created**:
- `client/src/components/analytics/GoogleTagManager.tsx`

**Files Modified**:
- `client/src/app/layout.tsx`

**Environment Variable Required**:
```env
NEXT_PUBLIC_GTM_CONTAINER_ID=GTM-XXXXXXX
```

### 3. ✅ Facebook Pixel Verification

**Status**: Facebook Pixel is properly configured and should work on Vercel.

**Verification**:
- Script loads with `afterInteractive` strategy
- Noscript fallback included
- Page view tracking on route changes
- Event tracking integrated

**Environment Variable Required**:
```env
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your-pixel-id
```

## Environment Variables for Vercel

Add these to your Vercel project settings:

### Client Environment Variables

```env
# Analytics
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your-facebook-pixel-id
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_CONTAINER_ID=GTM-XXXXXXX

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://your-api-url.com
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code
```

### Server Environment Variables

```env
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=production
# ... other server env vars
```

## How to Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click on **Settings** → **Environment Variables**
3. Add each variable:
   - **Name**: Variable name (e.g., `NEXT_PUBLIC_FACEBOOK_PIXEL_ID`)
   - **Value**: Variable value
   - **Environment**: Select `Production`, `Preview`, and/or `Development`
4. Click **Save**
5. **Redeploy** your application for changes to take effect

## Testing After Deployment

### 1. Test Order Creation
- Try placing an order on Vercel
- Check Vercel function logs for errors
- Verify order is created in database

### 2. Test Facebook Pixel
- Install [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
- Visit your Vercel site
- Check that pixel fires correctly
- Verify events in Facebook Events Manager

### 3. Test Google Tag Manager
- Install [Tag Assistant Legacy](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
- Visit your Vercel site
- Check that GTM container loads
- Verify tags fire correctly

### 4. Test Google Analytics
- Use [Google Analytics DebugView](https://analytics.google.com/)
- Visit your Vercel site
- Perform actions (add to cart, purchase, etc.)
- Verify events appear in real-time

## Common Vercel Deployment Issues

### Issue: Environment Variables Not Working

**Solution**:
- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding environment variables
- Check variable names match exactly (case-sensitive)

### Issue: Database Connection Errors

**Solution**:
- Verify `DATABASE_URL` is correct
- Check database allows connections from Vercel IPs
- Ensure database is accessible from internet (not localhost)

### Issue: Prisma Client Errors

**Solution**:
- Run `npx prisma generate` before deployment
- Ensure Prisma schema is up to date
- Check that migrations are applied to production database

### Issue: Analytics Not Working

**Solution**:
- Verify environment variables are set in Vercel
- Check browser console for errors
- Ensure scripts are loading (check Network tab)
- Verify IDs are correct

## Deployment Checklist

Before deploying to Vercel:

- [ ] All environment variables are set in Vercel
- [ ] Database is accessible from Vercel
- [ ] Prisma migrations are applied
- [ ] `NEXT_PUBLIC_API_URL` points to your production API
- [ ] Facebook Pixel ID is set
- [ ] Google Analytics Measurement ID is set
- [ ] Google Tag Manager Container ID is set (if using)
- [ ] Test order creation locally
- [ ] Test analytics tracking locally

After deployment:

- [ ] Test order creation on Vercel
- [ ] Verify Facebook Pixel is firing
- [ ] Verify Google Analytics is tracking
- [ ] Verify Google Tag Manager is loading (if using)
- [ ] Check Vercel function logs for errors
- [ ] Test all key user flows

## Support

If issues persist:

1. Check Vercel function logs: Vercel Dashboard → Your Project → Functions → View Logs
2. Check browser console for client-side errors
3. Verify all environment variables are set correctly
4. Test with browser dev tools Network tab to see if scripts load
5. Use analytics debugging tools (Pixel Helper, Tag Assistant, etc.)

---

**Note**: After fixing the Prisma error, orders should now work correctly on Vercel. Make sure to redeploy after adding environment variables.
