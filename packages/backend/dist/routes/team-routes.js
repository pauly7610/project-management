"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamRouter = void 0;
const hono_1 = require("hono");
const auth_middleware_1 = require("../middleware/auth-middleware");
// Create router for team endpoints
const teamRouter = new hono_1.Hono();
exports.teamRouter = teamRouter;
// Apply authentication middleware to all team routes
teamRouter.use('*', auth_middleware_1.authenticate);
// Define routes - will be implemented later
teamRouter.get('/', (c) => c.json({ message: 'Get all teams' }));
teamRouter.get('/:id', (c) => c.json({ message: `Get team ${c.req.param('id')}` }));
teamRouter.get('/:id/members', (c) => c.json({ message: `Get members of team ${c.req.param('id')}` }));
teamRouter.post('/', (c) => c.json({ message: 'Create team' }, 201));
teamRouter.put('/:id', (c) => c.json({ message: `Update team ${c.req.param('id')}` }));
teamRouter.delete('/:id', (c) => c.json({ message: `Delete team ${c.req.param('id')}` }));
teamRouter.post('/:id/members', (c) => c.json({ message: `Add member to team ${c.req.param('id')}` }, 201));
teamRouter.delete('/:id/members/:userId', (c) => c.json({ message: `Remove member ${c.req.param('userId')} from team ${c.req.param('id')}` }));
//# sourceMappingURL=team-routes.js.map