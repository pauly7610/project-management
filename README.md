# Motion Magic - Project Management

A modern project management application built with Next.js, React, MongoDB, and Tailwind CSS.

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

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Hono.js, Express, Node.js
- **Database**: MongoDB with Mongoose
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

The application supports two different approaches for handling API requests:

### 1. MongoDB Direct Connection

The frontend connects directly to MongoDB for authentication and data operations.
Routes implemented at `/src/app/api/auth/*` in the frontend package.

**Pros:**

- Simpler deployment (no need for a separate backend)
- Lower latency (direct database access)

**Cons:**

- Duplicates database logic between frontend and backend
- May expose database connection details to client-side code

### 2. Backend API Proxy

The frontend proxies requests to the backend API server.
Routes implemented at `/src/app/api/auth-external/*` in the frontend package.

**Pros:**

- Maintains separation of concerns
- Centralizes business logic in the backend
- More secure (database details remain in backend)

**Cons:**

- Additional network hop (can increase latency)
- Requires the backend service to be running

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start MongoDB (local or cloud instance)
4. Set up environment variables:

   - For frontend: Copy `.env.example` to `.env.local` in the frontend package
   - For backend: Copy `.env.example` to `.env` in the backend package

5. Run the development servers:

   ```bash
   # Run both frontend and backend
   npm run dev:all

   # Or run them separately
   npm run dev:frontend
   npm run dev:backend
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
packages/
├── frontend/             # Next.js application
│   ├── src/
│   │   ├── app/          # App router pages
│   │   │   ├── api/      # Direct MongoDB API routes
│   │   │   ├── api-external/ # Backend proxy API routes
│   │   │   └── ...       # Page components
│   │   ├── components/   # React components
│   │   ├── models/       # Mongoose models
│   │   └── lib/          # Utility functions
├── backend/              # Hono.js API server
│   ├── src/
│   │   ├── controllers/  # API controllers
│   │   ├── models/       # Mongoose models
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
