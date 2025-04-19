import { Hono } from 'hono';
import type { Context } from 'hono';
import { authenticate } from '../middleware/auth-middleware';
import type { Variables } from '../types';

// Create router for task endpoints
const taskRouter = new Hono<{ Variables: Variables }>();

// Apply authentication middleware to all task routes
taskRouter.use('*', authenticate);

// Define routes - will be implemented later
taskRouter.get('/', (c: Context<{ Variables: Variables }>) => c.json({ message: 'Get all tasks' }));
taskRouter.get('/:id', (c: Context<{ Variables: Variables }>) => c.json({ message: `Get task ${c.req.param('id')}` }));
taskRouter.post('/', (c: Context<{ Variables: Variables }>) => c.json({ message: 'Create task' }, 201));
taskRouter.put('/:id', (c: Context<{ Variables: Variables }>) => c.json({ message: `Update task ${c.req.param('id')}` }));
taskRouter.delete('/:id', (c: Context<{ Variables: Variables }>) => c.json({ message: `Delete task ${c.req.param('id')}` }));

export { taskRouter }; 