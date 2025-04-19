import { Hono } from 'hono';
import { authenticate } from '../middleware/auth-middleware';
import type { Variables } from '../types';

// Create router for project endpoints
const projectRouter = new Hono<{ Variables: Variables }>();

// Apply authentication middleware to all project routes
projectRouter.use('*', authenticate);

// Define routes - will be implemented later
projectRouter.get('/', (c) => c.json({ message: 'Get all projects' }));
projectRouter.get('/:id', (c) => c.json({ message: `Get project ${c.req.param('id')}` }));
projectRouter.post('/', (c) => c.json({ message: 'Create project' }, 201));
projectRouter.put('/:id', (c) => c.json({ message: `Update project ${c.req.param('id')}` }));
projectRouter.delete('/:id', (c) => c.json({ message: `Delete project ${c.req.param('id')}` }));

export { projectRouter }; 