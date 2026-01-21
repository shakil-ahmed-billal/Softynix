# Vercel Deployment Guide - Complete Fix

এই গাইডে Vercel deployment এর জন্য সব সমস্যার সমাধান দেওয়া হয়েছে।

## 🔧 সমাধান করা সমস্যাগুলো

### 1. ✅ Order Creation Error (Prisma)

**সমস্যা**: 
```
Unknown argument `userId`. Did you mean `user`?
```

**সমাধান**: 
- Prisma relation syntax ব্যবহার করার সময় `userId` সরাসরি set করা যাবে না
- শুধুমাত্র `user: { connect: { id } }` ব্যবহার করা হয়েছে
- Order create করার পর userId সহ fetch করা হচ্ছে

**ফাইল পরিবর্তন**: `server/src/modules/order/order.service.ts`

### 2. ✅ Google Tag Manager যোগ করা হয়েছে

**সমস্যা**: 
Google Tag Manager কাজ করছিল না

**সমাধান**: 
- Google Tag Manager component তৈরি করা হয়েছে
- Layout এ GTM script যোগ করা হয়েছে
- Noscript fallback যোগ করা হয়েছে

**নতুন ফাইল**: `client/src/components/analytics/GoogleTagManager.tsx`

### 3. ✅ Facebook Pixel Verification

**স্ট্যাটাস**: Facebook Pixel সঠিকভাবে configure করা আছে

**যাচাই**: 
- Script সঠিকভাবে load হচ্ছে
- Page view tracking কাজ করছে
- Event tracking integrated আছে

## 📋 Vercel এ Environment Variables

Vercel project settings এ এই variables গুলো add করুন:

### Client-Side Variables (NEXT_PUBLIC_ prefix)

```env
# Analytics & Tracking
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your-facebook-pixel-id
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_CONTAINER_ID=GTM-XXXXXXX

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://your-api-url.com
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code
NEXT_PUBLIC_ADMIN_API_KEY=your-admin-api-key
```

### Server-Side Variables

```env
DATABASE_URL=your-postgresql-connection-string
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=production

# Cloudinary (if using)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (if using)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Admin
ADMIN_API_KEY=your-admin-api-key
```

## 🚀 Vercel এ Environment Variables যোগ করার নিয়ম

1. Vercel dashboard এ যান
2. আপনার project select করুন
3. **Settings** → **Environment Variables** এ যান
4. প্রতিটি variable add করুন:
   - **Name**: Variable name (যেমন: `NEXT_PUBLIC_FACEBOOK_PIXEL_ID`)
   - **Value**: Variable value
   - **Environment**: `Production`, `Preview`, `Development` select করুন
5. **Save** করুন
6. **Redeploy** করুন (important!)

## 🔍 Testing Checklist

### Order Creation Test
- [ ] Vercel site এ order করার চেষ্টা করুন
- [ ] Vercel function logs check করুন
- [ ] Database এ order create হয়েছে কিনা verify করুন

### Facebook Pixel Test
1. [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) install করুন
2. Vercel site visit করুন
3. Pixel fire হচ্ছে কিনা check করুন
4. Facebook Events Manager এ events verify করুন

### Google Tag Manager Test
1. [Tag Assistant Legacy](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk) install করুন
2. Vercel site visit করুন
3. GTM container load হচ্ছে কিনা check করুন
4. Tags fire হচ্ছে কিনা verify করুন

### Google Analytics Test
1. [Google Analytics DebugView](https://analytics.google.com/) ব্যবহার করুন
2. Vercel site visit করুন
3. Actions perform করুন (add to cart, purchase, etc.)
4. Real-time events check করুন

## ⚠️ Common Issues & Solutions

### Issue: Environment Variables কাজ করছে না

**সমাধান**:
- Variables `NEXT_PUBLIC_` দিয়ে শুরু হয়েছে কিনা check করুন
- Variables add করার পর **Redeploy** করুন
- Variable names exactly match করছে কিনা verify করুন (case-sensitive)

### Issue: Database Connection Error

**সমাধান**:
- `DATABASE_URL` সঠিক কিনা check করুন
- Database Vercel IPs থেকে connection allow করছে কিনা verify করুন
- Database internet থেকে accessible কিনা check করুন (localhost নয়)

### Issue: Analytics Scripts Load হচ্ছে না

**সমাধান**:
- Browser console check করুন (errors আছে কিনা)
- Network tab এ scripts load হচ্ছে কিনা check করুন
- Environment variables Vercel এ set করা আছে কিনা verify করুন
- IDs সঠিক কিনা check করুন

## 📝 Deployment Steps

### Before Deployment:
1. ✅ সব environment variables Vercel এ set করুন
2. ✅ Database production ready আছে কিনা check করুন
3. ✅ Prisma migrations apply করুন
4. ✅ Local এ test করুন

### After Deployment:
1. ✅ Order creation test করুন
2. ✅ Facebook Pixel verify করুন
3. ✅ Google Analytics verify করুন
4. ✅ Google Tag Manager verify করুন
5. ✅ Vercel function logs check করুন

## 🎯 Quick Fix Summary

### Order Error Fix:
```typescript
// ❌ Wrong (causes error)
if (data.userId) {
  orderData.user = { connect: { id: data.userId } };
  orderData.userId = data.userId; // This causes error!
}

// ✅ Correct
if (data.userId) {
  orderData.user = { connect: { id: data.userId } };
  // Don't set userId directly when using relation
}
```

### Analytics Setup:
1. Facebook Pixel: `NEXT_PUBLIC_FACEBOOK_PIXEL_ID`
2. Google Analytics: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
3. Google Tag Manager: `NEXT_PUBLIC_GTM_CONTAINER_ID`

## 📞 Support

যদি সমস্যা থাকে:

1. Vercel function logs check করুন: Dashboard → Project → Functions → Logs
2. Browser console check করুন
3. সব environment variables সঠিক কিনা verify করুন
4. Network tab এ scripts load হচ্ছে কিনা check করুন

---

**মনে রাখবেন**: Environment variables add করার পর অবশ্যই **Redeploy** করুন, নাহলে changes apply হবে না!
