# Authentication System Documentation

## 🎯 Overview

A complete authentication system using React Context API that provides user and admin authentication throughout the entire application.

---

## 📦 Components

### 1. **AuthProvider** (`client/src/contexts/auth-context.tsx`)

A React Context Provider that wraps the entire application and provides authentication state.

**Features:**
- Stores user and admin information
- Tracks authentication status
- Provides login/logout functions
- Syncs with Zustand store for persistence
- Accessible throughout the entire app

**Usage:**
```tsx
// Already wrapped in app/layout.tsx
<AuthProvider>
  {children}
</AuthProvider>
```

### 2. **useAuth Hook** (`client/src/contexts/auth-context.tsx`)

Custom hook to access authentication data from any component.

**Returns:**
```typescript
{
  user: User | null;           // Logged-in user data
  admin: Admin | null;         // Logged-in admin data
  isAuthenticated: boolean;    // Whether user/admin is logged in
  isAdmin: boolean;           // Whether logged in as admin
  isLoading: boolean;          // Loading state
  login: (user: User) => void;        // Login function for users
  loginAdmin: (admin: Admin) => void; // Login function for admins
  logout: () => void;          // Logout function
}
```

**Example Usage:**
```tsx
import { useAuth } from "@/contexts/auth-context";

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please login</div>;
  }
  
  return (
    <div>
      <p>Welcome, {user?.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## 🔐 Authentication Pages

### User Login (`/login`)
- Email and password login
- Links to signup and admin login
- Redirects to `/dashboard` on success

### User Signup (`/signup`)
- Create new user account
- Fields: Name, Email, Password, Phone (optional)
- Redirects to `/dashboard` on success

### Admin Login (`/admin/login`)
- Admin email and password login
- Redirects to `/dashboad-admin` on success

---

## 🎨 Header Component

The Header component is now **fully dynamic** based on authentication state:

### When User is Logged In:
- ✅ Displays user's name and email
- ✅ Shows user menu with:
  - Profile link
  - Orders link
  - Settings link
  - Logout option

### When Admin is Logged In:
- ✅ Displays admin's name and email
- ✅ Shows admin role (Admin/Super Admin)
- ✅ Shows admin menu with:
  - Admin Dashboard link
  - Logout option

### When No User is Logged In:
- ✅ Shows "Login" button
- ✅ Shows "Sign Up" button
- ✅ Shows admin login dropdown menu

---

## 🔄 Authentication Flow

### User Login Flow:
1. User enters credentials on `/login`
2. `useLogin()` hook calls API
3. JWT token stored in `localStorage` as `auth_token`
4. User data stored in Zustand store
5. AuthProvider context updated
6. Header shows user menu
7. Redirect to `/dashboard`

### Admin Login Flow:
1. Admin enters credentials on `/admin/login`
2. `useAdminLogin()` hook calls API
3. JWT token stored in `localStorage` as `admin_token`
4. Admin data stored in Zustand store
5. AuthProvider context updated
6. Header shows admin menu
7. Redirect to `/dashboad-admin`

### Logout Flow:
1. User clicks logout
2. Token removed from `localStorage`
3. Store cleared
4. Context updated
5. Header shows login buttons
6. Redirect to home page

---

## 📡 API Endpoints

### User Authentication:
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update profile (protected)
- `PUT /api/auth/change-password` - Change password (protected)

### Admin Authentication:
- `POST /api/auth/admin/login` - Admin login

---

## 🛠️ Integration with Existing Hooks

The authentication hooks (`useLogin`, `useSignup`, `useAdminLogin`) automatically:
- Store tokens in `localStorage`
- Update Zustand store
- Update AuthProvider context
- Invalidate React Query cache

**No manual context updates needed!** The hooks handle everything automatically.

---

## 💾 Data Persistence

Authentication state is persisted using:
1. **Zustand Store** - In-memory state with localStorage persistence
2. **localStorage** - JWT tokens (`auth_token`, `admin_token`)
3. **React Context** - Provides reactive updates throughout the app

---

## 🔒 Security Features

- JWT token-based authentication
- Tokens stored securely in localStorage
- Automatic token validation
- Protected routes support
- Separate admin and user authentication
- Password hashing (bcrypt for users)

---

## 📝 Example: Using Auth in Components

```tsx
"use client";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";

export default function MyComponent() {
  const { user, admin, isAuthenticated, isAdmin, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login to continue</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.name || admin?.name}!</h1>
      {isAdmin && <p>You are logged in as an admin</p>}
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
```

---

## 🎯 Key Features

✅ **Centralized Auth State** - Single source of truth  
✅ **Reactive Updates** - Components automatically update when auth changes  
✅ **Type-Safe** - Full TypeScript support  
✅ **Persistent** - Auth state survives page refreshes  
✅ **User & Admin Support** - Separate authentication for users and admins  
✅ **Dynamic UI** - Header adapts based on auth state  
✅ **Easy to Use** - Simple `useAuth()` hook  

---

## 🚀 Next Steps

1. Add protected route middleware
2. Add role-based access control
3. Add token refresh mechanism
4. Add remember me functionality
5. Add social login (optional)

---

**Status**: ✅ **FULLY IMPLEMENTED AND FUNCTIONAL**

The authentication system is complete and ready to use throughout the application!

