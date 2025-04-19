# Frontend Package

This package contains the Next.js frontend application for Motion Magic.

## Authentication API Implementations

The application supports two different approaches for handling authentication:

### 1. MongoDB Direct Connection (Default)

The first approach involves connecting directly to MongoDB from the Next.js API routes.
This approach can be found in:

- `/src/app/api/auth/signup/route.ts`
- `/src/app/api/auth/verify/route.ts`
- `/src/app/api/auth/signin/route.ts`
- `/src/app/api/auth/reset-password/route.ts`

These routes use Mongoose models defined in `/src/models/` to interact with the database directly.

**Pros:**

- Simpler deployment (no need for a separate backend)
- Lower latency (direct database access)

**Cons:**

- Duplicates database logic between frontend and backend
- May expose database connection details to client-side code

### 2. Backend API Proxy

The second approach involves proxying requests to the backend API.
This approach can be found in:

- `/src/app/api/auth-external/signup/route.ts`
- `/src/app/api/auth-external/verify/route.ts`
- `/src/app/api/auth-external/signin/route.ts`
- `/src/app/api/auth-external/reset-password/route.ts`

These routes forward requests to the backend API at the URL specified in the `BACKEND_API_URL` environment variable.

**Pros:**

- Maintains separation of concerns
- Centralizes business logic in the backend
- More secure (database details remain in backend)

**Cons:**

- Additional network hop (can increase latency)
- Requires the backend service to be running

## How to Use

To use either approach:

1. For direct MongoDB connection:

   - Set the `MONGODB_URI` environment variable
   - Use API endpoints at `/api/auth/*`

2. For backend API proxy:
   - Set the `BACKEND_API_URL` environment variable (default: http://localhost:5000/api)
   - Use API endpoints at `/api/auth-external/*`

## Environment Variables

```
# Required for MongoDB direct connection
MONGODB_URI=mongodb://localhost:27017/motion-magic

# Required for backend API proxy
BACKEND_API_URL=http://localhost:5000/api

# Optional settings
JWT_SECRET=your-secret-key-change-this-in-production
RESEND_API_KEY=your-email-service-api-key
EMAIL_FROM=noreply@motionmagic.space
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```
