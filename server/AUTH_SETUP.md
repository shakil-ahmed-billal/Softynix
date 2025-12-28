# Authentication System Setup Guide

## 🚀 Quick Start

### 1. Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/softynix_db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"

# Admin API Key (optional, for admin routes)
ADMIN_API_KEY="your-admin-api-key"

# Server Port
PORT=5000
```

### 2. Generate Prisma Client

```bash
cd server
npx prisma generate
```

### 3. Run Database Migrations

```bash
npx prisma migrate dev --name add_user_authentication
```

### 4. Start the Server

```bash
pnpm dev
```

## 📚 API Endpoints

### Public Endpoints

#### Signup
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890" // optional
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Protected Endpoints (Require Authentication)

Add `Authorization: Bearer <token>` header to all protected requests.

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "+1234567890",
  "avatar": "https://example.com/avatar.jpg"
}
```

#### Change Password
```http
PUT /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

#### Get My Orders
```http
GET /api/orders/my-orders?page=1&limit=10
Authorization: Bearer <token>
```

## 🎣 Frontend Usage (React Query Hooks)

### Setup

The hooks are already set up in `client/src/hooks/useAuth.tsx`

### Example Usage

```tsx
"use client";

import { useSignup, useLogin, useProfile, useLogout } from "@/hooks/useAuth";

function LoginPage() {
  const login = useLogin();
  const signup = useSignup();
  const { data: profile, isLoading } = useProfile();
  const logout = useLogout();

  const handleLogin = async () => {
    try {
      const result = await login.mutateAsync({
        email: "user@example.com",
        password: "password123",
      });
      console.log("Logged in:", result.user);
      console.log("Token saved automatically");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSignup = async () => {
    try {
      const result = await signup.mutateAsync({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      });
      console.log("Signed up:", result.user);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
      <button onClick={logout}>Logout</button>
      
      {isLoading ? (
        <p>Loading profile...</p>
      ) : profile ? (
        <div>
          <h2>Welcome, {profile.name}!</h2>
          <p>Email: {profile.email}</p>
        </div>
      ) : null}
    </div>
  );
}
```

## 🔐 Authentication Flow

1. **Signup/Login**: User provides credentials
2. **Token Generation**: Server generates JWT token
3. **Token Storage**: Frontend stores token in `localStorage`
4. **Protected Requests**: Frontend includes token in `Authorization` header
5. **Token Verification**: Server verifies token on each protected request

## 🛡️ Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token-based authentication
- ✅ Token expiration (configurable, default 7 days)
- ✅ Protected routes with middleware
- ✅ User status validation (active/inactive)
- ✅ Secure password change (requires current password)

## 📝 Database Schema

The `User` model includes:
- `id`: UUID (primary key)
- `email`: Unique email address
- `name`: User's full name
- `password`: Hashed password (bcrypt)
- `phone`: Optional phone number
- `avatar`: Optional avatar URL
- `status`: Account status (active/inactive/suspended)
- `emailVerified`: Email verification status
- `createdAt`: Account creation timestamp
- `updatedAt`: Last update timestamp

## 🔧 Troubleshooting

### Token Not Working
- Check if token is being sent in `Authorization: Bearer <token>` header
- Verify `JWT_SECRET` matches between server restarts
- Check token expiration

### Password Issues
- Ensure password is at least 6 characters
- Check bcrypt installation: `pnpm list bcrypt`

### Database Connection
- Verify `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Run migrations: `npx prisma migrate dev`

## 🚨 Important Notes

1. **Change JWT_SECRET**: Use a strong, random secret in production
2. **HTTPS**: Always use HTTPS in production
3. **Token Storage**: Consider using httpOnly cookies for better security
4. **Password Policy**: Consider adding stronger password requirements
5. **Email Verification**: Implement email verification for production

