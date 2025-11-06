# Authentication System Setup

This project uses TanStack Query for server state management with protected and public routes.

## Features

- ✅ JWT token-based authentication
- ✅ Protected routes (require authentication)
- ✅ Public routes (redirect if authenticated)
- ✅ Automatic token management
- ✅ Auth state caching with TanStack Query
- ✅ Logout functionality
- ✅ Redirect after login

## API Endpoints

### Check Authentication

- **Endpoint**: `GET /api/v1.0/is-authenticated`
- **Headers**: `Authorization: Bearer {token}`
- **Success Response**: `true` or `{ authenticated: true }`
- **Error Response (401)**: `{ error: "Unauthorized access" }`

### Logout

- **Endpoint**: `POST /api/v1.0/logout`
- **Headers**: `Authorization: Bearer {token}`
- **Success Response**: `"Logged out successfully"` or `{ message: "Logged out successfully" }`
- **Success Response**: `true` or `{ authenticated: true }`
- **Error Response (401)**: `{ error: "Unauthorized access" }`

## Files Structure

```
src/
├── hooks/
│   ├── use-auth.ts          # Hook to check authentication status
│   ├── use-logout.ts        # Hook to logout user
│   ├── use-sign-in.ts       # Hook for sign-in mutation
│   └── ...
├── components/auth/
│   ├── protected-route.tsx  # Wrapper for protected pages
│   ├── public-route.tsx     # Wrapper for public pages (sign-in, register)
│   └── logout-button.tsx    # Logout button component
├──services/
│   └── auth.service.ts      # Auth API service
├── lib/
│   ├── auth.ts              # Token management utilities
│   └── api-client.ts        # HTTP client with auto token injection
└── types/
    └── auth.ts              # TypeScript types
```

## Usage

### Protected Routes

Wrap your protected pages with `ProtectedRoute` or create a layout:

```tsx
// app/[locale]/dashboard/layout.tsx
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function DashboardLayout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
```

### Public Routes

Wrap auth pages (sign-in, register) with `PublicRoute`:

```tsx
// app/[locale]/(auth)/sign-in/page.tsx
import { PublicRoute } from "@/components/auth/public-route";

export default function SignInPage() {
  return (
    <PublicRoute>
      <SignInForm />
    </PublicRoute>
  );
}
```

### Check Auth Status

Use the `useAuth` hook in any component:

```tsx
import { useAuth } from "@/hooks/use-auth";

function MyComponent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please sign in</div>;

  return <div>Welcome!</div>;
}
```

### Logout

Use the `useLogout` hook with loading state:

```tsx
import { useLogout } from "@/hooks/use-logout";

function LogoutButton() {
  const { logout, isPending } = useLogout();

  return (
    <button onClick={logout} disabled={isPending}>
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
}
```

## How It Works

### 1. Sign In Flow

1. User submits credentials
2. API returns JWT token
3. Token stored in localStorage
4. Auth query invalidated
5. User redirected to dashboard

### 2. Protected Route Flow

1. Check if token exists in localStorage
2. If no token → redirect to sign-in
3. If token exists → call `/is-authenticated` API
4. If API returns true → show page
5. If API returns error → clear token and redirect to sign-in

### 3. Public Route Flow

1. Check if token exists
2. If token exists → call `/is-authenticated` API
3. If authenticated → redirect to dashboard
4. If not authenticated → show page

### 4. API Client

All API requests automatically include the Authorization header:

```
Authorization: Bearer {token}
```

## Token Management

The `authStorage` utility provides:

- `getToken()` - Get stored token
- `setToken(token)` - Store token
- `removeToken()` - Remove token
- `isAuthenticated()` - Check if token exists
- `logout()` - Clear all auth data

## Query Caching

Auth status is cached for 5 minutes using TanStack Query:

```ts
{
  queryKey: ["auth", "check"],
  staleTime: 5 * 60 * 1000, // 5 minutes
}
```

## Redirect After Login

Sign-in supports redirect parameter:

```
/sign-in?redirect=/dashboard/settings
```

After successful login, user will be redirected to the specified URL.
