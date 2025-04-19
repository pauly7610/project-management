import { Hono } from 'hono';
import { authenticate } from '../middleware/auth-middleware';
import type { Variables } from '../types';

// Create router for team endpoints
const teamRouter = new Hono<{ Variables: Variables }>();

// Apply authentication middleware to all team routes
teamRouter.use('*', authenticate);

// Define routes - will be implemented later
teamRouter.get('/', (c) => c.json({ message: 'Get all teams' }));
teamRouter.get('/:id', (c) => c.json({ message: `Get team ${c.req.param('id')}` }));
teamRouter.get('/:id/members', (c) => c.json({ message: `Get members of team ${c.req.param('id')}` }));
teamRouter.post('/', (c) => c.json({ message: 'Create team' }, 201));
teamRouter.put('/:id', (c) => c.json({ message: `Update team ${c.req.param('id')}` }));
teamRouter.delete('/:id', (c) => c.json({ message: `Delete team ${c.req.param('id')}` }));
teamRouter.post('/:id/members', (c) => c.json({ message: `Add member to team ${c.req.param('id')}` }, 201));
teamRouter.delete('/:id/members/:userId', (c) => c.json({ message: `Remove member ${c.req.param('userId')} from team ${c.req.param('id')}` }));

export { teamRouter }; 