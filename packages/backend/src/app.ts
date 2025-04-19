import { Hono } from 'hono';
import type { Context } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';
import { secureHeaders } from 'hono/secure-headers';
import type { Variables } from './types';

// Import routes
import { authRouter } from './routes/auth-routes';
import projectRouter from './routes/project-routes';
import { taskRouter } from './routes/task-routes';
import { teamRouter } from './routes/team-routes';

// Create Hono app
const app = new Hono<{ Variables: Variables }>();

// Apply middleware
app.use('*', logger());
app.use('*', cors());
app.use('*', prettyJSON());
app.use('*', secureHeaders());

// Health check endpoint
app.get('/health', (c: Context<{ Variables: Variables }>) => {
  return c.json({ status: 'ok', message: 'Server is running' });
});

// Mount routers
app.route('/api/auth', authRouter);
app.route('/api/projects', projectRouter);
app.route('/api/tasks', taskRouter);
app.route('/api/teams', teamRouter);

// Error handling
app.onError((err, c: Context<{ Variables: Variables }>) => {
  console.error('Server error:', err);
  return c.json(
    {
      message: err.message || 'Internal Server Error',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    },
    500
  );
});

export default app; 