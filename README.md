# Motion Magic - Project Management

A modern project management application built with Next.js, React, **PostgreSQL (via Prisma)**, and Tailwind CSS.

## Features

- Dashboard with productivity metrics and overviews
- Task management with filtering and sorting capabilities
- Project tracking and organization
- Team management and scheduling
- Calendar integration
- AI-powered meeting notes
- ROI calculator
- User retention analytics
- User authentication with email verification
- **CRUD for Projects, Tasks, Events, and Users**
- Integrations with popular tools (GitHub, Slack, Asana, etc.)

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Hono.js, Express, Node.js
- **Database**: **PostgreSQL with Prisma**
- **UI Components**: shadcn/ui with Radix UI primitives
- **State Management**: React Hooks, Context API
- **Data Fetching**: TanStack Query
- **Styling**: Tailwind CSS with custom theming
- **Icons**: Lucide React
- **Email Service**: Resend

## Architecture

This project uses a monorepo structure with three main packages:

1. **Frontend Package** (`packages/frontend`): Next.js application with API routes
2. **Backend Package** (`packages/backend`): Standalone API server using Hono.js
3. **Shared Package** (`packages/shared`): Common types and utilities

## API Overview

All endpoints now use **Prisma** for database operations with PostgreSQL. The following RESTful endpoints are available:

### Auth
- `/api/auth/signup` — User registration
- `/api/auth/signin` — User login
- `/api/auth/forgot-password` — Request password reset
- `/api/auth/reset-password` — Reset password
- `/api/auth/verify` — Email verification
- `/api/auth/verify-email` — Email verification (alias)
- `/api/auth/me` — Get current user info

### Teams
- `/api/teams/create` — Create team
- `/api/teams/invite` — Invite member
- `/api/teams/check-name` — Check team name uniqueness

### Onboarding
- `/api/onboarding/status` — Get onboarding status

### Integrations
- `/api/integrations/list` — List available integrations
- `/api/integrations/connect` — Connect a tool
- `/api/integrations/oauth/start` — Start OAuth flow
- `/api/integrations/oauth/callback` — Handle OAuth callback

### Projects
- `/api/projects` — CRUD for projects (POST, GET, PUT, DELETE)

### Tasks
- `/api/tasks` — CRUD for tasks (POST, GET, PUT, DELETE)

### Events
- `/api/events` — CRUD for events (POST, GET, PUT, DELETE)

### Users
- `/api/users` — CRUD for users (POST, GET, PUT, DELETE)

## Migration from MongoDB/Mongoose

- All endpoints have been refactored to use Prisma and PostgreSQL.
- Legacy Mongoose/MongoDB logic has been removed.

## Getting Started

1. Clone the repository
2. Install dependencies
3. Set up your `.env` files (see `.env.example`)
4. Run database migrations with `npx prisma migrate dev`
5. Start the development server with `npm run dev`

## Project Structure

```
packages/
├── frontend/             # Next.js application
│   ├── src/
│   │   ├── app/          # App router pages
│   │   │   ├── api/      # API routes
│   │   │   └── ...       # Page components
│   │   ├── components/   # React components
│   │   ├── lib/          # Utility functions
│   │   └── ...           # Other frontend files
├── backend/              # Hono.js API server
│   ├── src/
│   │   ├── controllers/  # API controllers
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Middleware functions
│   │   └── services/     # Business logic
└── shared/               # Shared types and utilities
    ├── src/
    │   ├── types/        # TypeScript type definitions
    │   └── validation/   # Zod validation schemas
```

## Available Scripts

- `npm run dev:all` - Run both frontend and backend servers
- `npm run dev:frontend` - Run the Next.js frontend server
- `npm run dev:backend` - Run the Hono.js backend server
- `npm run build:all` - Build both frontend and backend
- `npm run start:all` - Start both servers in production mode
- `npm run lint` - Run ESLint across all packages

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License
[MIT](LICENSE)
