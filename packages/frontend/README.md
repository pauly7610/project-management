# Frontend Package

This package contains the Next.js frontend application for Motion Magic.

## Backend API & Authentication

All authentication and data operations now use **Prisma** with **PostgreSQL** via the backend API. The direct MongoDB/Mongoose approach has been fully replaced.

### Auth API Endpoints
- `/api/auth/signup` — User registration
- `/api/auth/signin` — User login
- `/api/auth/forgot-password` — Request password reset
- `/api/auth/reset-password` — Reset password
- `/api/auth/verify` — Email verification
- `/api/auth/verify-email` — Email verification (alias)
- `/api/auth/me` — Get current user info

### Projects, Tasks, Events, Users
- `/api/projects` — CRUD for projects (POST, GET, PUT, DELETE)
- `/api/tasks` — CRUD for tasks (POST, GET, PUT, DELETE)
- `/api/events` — CRUD for events (POST, GET, PUT, DELETE)
- `/api/users` — CRUD for users (POST, GET, PUT, DELETE)

### Teams & Integrations
- `/api/teams/create` — Create team
- `/api/teams/invite` — Invite member
- `/api/teams/check-name` — Check team name uniqueness
- `/api/integrations/list` — List available integrations
- `/api/integrations/connect` — Connect a tool
- `/api/integrations/oauth/start` — Start OAuth flow
- `/api/integrations/oauth/callback` — Handle OAuth callback

## Usage

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up your `.env.local` as needed
3. Start the frontend:
   ```bash
   npm run dev
   ```

## Notes
- All database and authentication logic is handled by the backend via Prisma/PostgreSQL.
- Update your `.env.local` to point to the correct backend API URL.

## Environment Variables

```
# Required for backend API proxy
BACKEND_API_URL=http://localhost:5000/api

# Optional settings
JWT_SECRET=your-secret-key-change-this-in-production
RESEND_API_KEY=your-email-service-api-key
EMAIL_FROM=noreply@motionmagic.space
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## License
[MIT](../../LICENSE)
