# Motion Magic - Project Management

A modern project management application built with Next.js, React, and Tailwind CSS.

## Features

- Dashboard with productivity metrics and overviews
- Task management with filtering and sorting capabilities
- Project tracking and organization
- Team management and scheduling
- Calendar integration
- AI-powered meeting notes
- ROI calculator
- User retention analytics

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **State Management**: React Hooks, Context API
- **Data Fetching**: TanStack Query
- **Styling**: Tailwind CSS with custom theming
- **Icons**: Lucide React

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── (dashboard)/      # Dashboard layout and pages
│   │   ├── dashboard/    # Dashboard page
│   │   ├── agenda/       # Agenda page
│   │   ├── my-tasks/     # My Tasks page
│   │   └── ...           # Other dashboard pages
│   └── ...               # Other app routes
├── components/           # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   └── forms/            # Form components
├── lib/                  # Utility functions
├── api/                  # API client
└── ...
```

## Available Scripts

- `npm run dev` - Run the development server
- `npm run build` - Build the project for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality
