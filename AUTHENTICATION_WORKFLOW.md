# JWT Authentication Workflow

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         LOGIN FLOW                              │
└─────────────────────────────────────────────────────────────────┘

Client                    AuthController              JwtUtil
  │                             │                        │
  │  POST /login               │                        │
  │  {email, password}         │                        │
  ├───────────────────────────>│                        │
  │                             │                        │
  │                             │  Validate credentials  │
  │                             │  (AuthenticationMgr)   │
  │                             │                        │
  │                             │  Generate JWT          │
  │                             ├───────────────────────>│
  │                             │                        │
  │                             │<───────────────────────┤
  │                             │  Return JWT token      │
  │                             │                        │
  │  200 OK                     │                        │
  │  {email, token}             │                        │
  │  Cookie: jwt=<token>        │                        │
  │<────────────────────────────┤                        │
  │                             │                        │


┌─────────────────────────────────────────────────────────────────┐
│                    PROTECTED REQUEST FLOW                       │
└─────────────────────────────────────────────────────────────────┘

Client              JwtRequestFilter         JwtUtil        Controller
  │                        │                    │               │
  │  GET /protected        │                    │               │
  │  Authorization: Bearer │                    │               │
  │  OR Cookie: jwt=token  │                    │               │
  ├───────────────────────>│                    │               │
  │                        │                    │               │
  │                        │  Extract JWT       │               │
  │                        │  (header/cookie)   │               │
  │                        │                    │               │
  │                        │  Validate token    │               │
  │                        ├───────────────────>│               │
  │                        │                    │               │
  │                        │<───────────────────┤               │
  │                        │  Token valid       │               │
  │                        │                    │               │
  │                        │  Set Authentication│               │
  │                        │  in SecurityContext│               │
  │                        │                    │               │
  │                        │  Forward request   │               │
  │                        ├───────────────────────────────────>│
  │                        │                    │               │
  │                        │                    │  Process      │
  │                        │                    │               │
  │  200 OK                │                    │               │
  │  Response data         │                    │               │
  │<───────────────────────────────────────────────────────────┤
  │                        │                    │               │
```

## Key Components

**JwtUtil** - Token generation & validation

- `generateToken(UserDetails)` → Creates JWT with email, issued date, expiration
- `validateToken(token, UserDetails)` → Verifies signature & expiration
- Uses HS256 algorithm with 256-bit secret key

**JwtRequestFilter** - Intercepts every request

- Extracts JWT from `Authorization: Bearer <token>` OR `Cookie: jwt=<token>`
- Validates token and sets authentication in Spring Security context
- Skips public URLs: `/login`, `/register`, `/send-reset-otp`, `/reset-password`

**AuthController** - Handles login

- Validates credentials via `AuthenticationManager`
- Generates JWT token
- Returns token in response body + HTTP-only cookie

## Token Structure

```
Header:    { "alg": "HS256", "typ": "JWT" }
Payload:   { "sub": "user@email.com", "iat": 1234567890, "exp": 1234603890 }
Signature: HMACSHA256(base64(header) + "." + base64(payload), secret)
```

## Configuration

```properties
jwt.secret.key=w/F+cR/xR/lO2Qe8w3bFkF6y/qM8uE4tA3jE0vR+tZ0=  # 256-bit Base64
jwt.expiration.ms=36000000                                  # 10 hours
```

## Quick Reference

**Login**: `POST /api/v1.0/login` → Returns JWT
**Protected**: Include JWT via header OR cookie → Auto-validated by filter
**Public URLs**: No JWT required
