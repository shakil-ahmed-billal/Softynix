# Frontend ↔ Backend Connection Guide

## ✅ Complete Integration Summary

All frontend pages are now connected to the backend API and using real database data.

---

## 🔌 API Connection Setup

### Environment Variables Required

**Client (`client/.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_ADMIN_API_KEY=your-admin-api-key-here
```

**Server (`server/.env`):**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/softynix_db
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
ADMIN_API_KEY=your-admin-api-key-here
PORT=5000
```

---

## 📡 Frontend Pages Connected

### ✅ Home Page (`/`)
- **BestSelling**: Uses `useAllProducts()` - fetches latest products
- **TrendingProducts**: Uses `useFeaturedProducts()` - fetches featured products
- **CategorySection**: Uses `useActiveCategories()` - fetches active categories
- **RecentOrders**: Uses `useAllOrders()` - fetches recent orders

### ✅ Shop Page (`/shop`)
- Uses `useAllProducts()` with filters (search, category, price range, sorting)
- Uses `useActiveCategories()` for filter sidebar
- Real-time pagination
- Client-side price filtering

### ✅ Product Detail Page (`/products/[id]`)
- Uses `useSingleProduct(id)` - fetches product by ID
- Real product data with category information
- Add to cart functionality with toast notifications

### ✅ Categories Page (`/categories`)
- Uses `useActiveCategories()` - displays all active categories
- Links to filtered shop page

### ✅ Cart Page (`/cart`)
- Uses `useActiveCategories()` for category grouping
- Real-time cart calculations
- Checkout redirect to `/checkout`

---

## 🎛️ Admin Dashboard (`/dashboad-admin`)

### ✅ Dashboard Home (`/dashboad-admin`)
- **Stats Cards**: Products, Categories, Orders, Revenue
- **Recent Orders**: Last 5 orders
- **Charts**: Revenue overview
- Uses `useAdminDashboardStats()`

### ✅ Products Management (`/dashboad-admin/products`)
- **List**: Uses `useAllProducts()` with admin auth
- **Create**: Uses `useCreateProduct()` - Full form with validation
- **Update**: Uses `useUpdateProduct()` - Edit existing products
- **Delete**: Uses `useDeleteProduct()` - Remove products
- **Search & Pagination**: Real-time filtering

### ✅ Categories Management (`/dashboad-admin/categories`)
- **List**: Uses `useAllCategories()` with admin auth
- **Create**: Uses `useCreateCategory()` - Full form
- **Update**: Uses `useUpdateCategory()` - Edit categories
- **Delete**: Uses `useDeleteCategory()` - Remove categories
- **Search & Pagination**: Real-time filtering

### ✅ Orders Management (`/dashboad-admin/orders`)
- **List**: Uses `useAdminOrders()` - All orders with filters
- **Stats**: Uses `useAdminOrderStats()` - Order statistics
- **Update**: Uses `useUpdateOrder()` - Update status & payment
- **View Details**: Full order information with items
- **Filter**: By status, search by order number/customer

### ✅ Users & Settings
- Placeholder pages ready for future implementation

---

## 🎣 React Query Hooks

### Public Hooks (No Auth Required)
- `useAllProducts(params)` - Get products with filters
- `useSingleProduct(id)` - Get single product
- `useProductBySlug(slug)` - Get product by slug
- `useFeaturedProducts(limit)` - Get featured products
- `useAllCategories(params)` - Get categories
- `useActiveCategories()` - Get active categories only
- `useSingleCategory(id)` - Get single category
- `useCategoryBySlug(slug)` - Get category by slug
- `useAllOrders(params)` - Get orders (public endpoint)
- `useSingleOrder(id)` - Get single order
- `useOrderByOrderNumber(orderNumber)` - Get order by number

### Admin Hooks (Requires Admin Auth)
- `useAdminDashboardStats()` - Dashboard statistics
- `useAdminOrders(params)` - Admin order list
- `useAdminOrderStats()` - Order statistics
- `useCreateProduct()` - Create product (admin)
- `useUpdateProduct()` - Update product (admin)
- `useDeleteProduct()` - Delete product (admin)
- `useCreateCategory()` - Create category (admin)
- `useUpdateCategory()` - Update category (admin)
- `useDeleteCategory()` - Delete category (admin)
- `useUpdateOrder()` - Update order (admin)
- `useDeleteOrder()` - Delete order (admin)

### User Auth Hooks
- `useSignup()` - User registration
- `useLogin()` - User login
- `useLogout()` - User logout
- `useProfile()` - Get user profile
- `useUpdateProfile()` - Update profile
- `useChangePassword()` - Change password

---

## 🔐 Authentication

### Admin Authentication
- Uses `useAxiosAdmin()` hook
- Automatically includes `Authorization: Bearer {ADMIN_API_KEY}` header
- Set `NEXT_PUBLIC_ADMIN_API_KEY` in client `.env.local`

### User Authentication
- Uses `useAxiosAuth()` hook
- JWT tokens stored in `localStorage`
- Automatic token injection in requests

---

## 🎨 Toast Notifications

All mutations use `react-hot-toast` for user feedback:
- ✅ Success messages on create/update/delete
- ❌ Error messages with details
- Automatic toast display

---

## 🗑️ Removed Dummy Data

All imports from `@/lib/dummy-data` have been removed from:
- ✅ Home page components
- ✅ Shop page
- ✅ Product detail page
- ✅ Categories page
- ✅ Cart components
- ✅ Filter sidebar

**Note**: `dummy-data.ts` file still exists but is no longer used. You can delete it if desired.

---

## 🚀 How to Run

### 1. Start Backend Server
```bash
cd server
pnpm install
npx prisma generate
npx prisma migrate dev
pnpm dev
```

### 2. Start Frontend
```bash
cd client
pnpm install
pnpm dev
```

### 3. Access Admin Dashboard
Navigate to: `http://localhost:3000/dashboad-admin`

**Important**: Set `NEXT_PUBLIC_ADMIN_API_KEY` in `client/.env.local` to match `ADMIN_API_KEY` in `server/.env`

---

## 📝 API Endpoints Used

### Public Endpoints
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product
- `GET /api/products/featured` - Featured products
- `GET /api/categories` - List categories
- `GET /api/categories/active` - Active categories
- `GET /api/orders/:id` - Get order
- `POST /api/orders` - Create order

### Admin Endpoints (Protected)
- `GET /api/admin/dashboard/stats` - Dashboard stats
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category
- `GET /api/orders` - List all orders (admin)
- `GET /api/orders/stats` - Order statistics
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

---

## ✨ Features Implemented

1. ✅ Real-time data fetching from PostgreSQL
2. ✅ Full CRUD operations for Products
3. ✅ Full CRUD operations for Categories
4. ✅ Order management with status updates
5. ✅ Admin dashboard with statistics
6. ✅ Toast notifications for all actions
7. ✅ Loading states and error handling
8. ✅ Pagination support
9. ✅ Search and filtering
10. ✅ Responsive admin sidebar navigation
11. ✅ Form validation with Zod
12. ✅ Type-safe API calls

---

## 🎯 Next Steps (Optional)

1. Implement user management in admin panel
2. Add image upload functionality
3. Implement checkout page
4. Add email notifications
5. Add analytics and reporting
6. Implement product reviews/ratings

---

## 🔧 Troubleshooting

### Admin routes not working?
- Check `NEXT_PUBLIC_ADMIN_API_KEY` is set in client `.env.local`
- Verify `ADMIN_API_KEY` matches in server `.env`
- Check browser console for auth errors

### Products not loading?
- Verify backend server is running on correct port
- Check `NEXT_PUBLIC_API_URL` in client `.env.local`
- Verify database connection in server

### Forms not submitting?
- Check browser console for errors
- Verify all required fields are filled
- Check network tab for API responses

---

**Status**: ✅ **FULLY CONNECTED AND FUNCTIONAL**

All frontend pages are now using real backend data. No dummy data remains in active use.

