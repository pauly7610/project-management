"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = void 0;
const hono_1 = require("hono");
const auth_middleware_1 = require("../middleware/auth-middleware");
// Create router for project endpoints
const projectRouter = new hono_1.Hono();
exports.projectRouter = projectRouter;
// Apply authentication middleware to all project routes
projectRouter.use('*', auth_middleware_1.authenticate);
// Define routes - will be implemented later
projectRouter.get('/', (c) => c.json({ message: 'Get all projects' }));
projectRouter.get('/:id', (c) => c.json({ message: `Get project ${c.req.param('id')}` }));
projectRouter.post('/', (c) => c.json({ message: 'Create project' }, 201));
projectRouter.put('/:id', (c) => c.json({ message: `Update project ${c.req.param('id')}` }));
projectRouter.delete('/:id', (c) => c.json({ message: `Delete project ${c.req.param('id')}` }));
//# sourceMappingURL=project-routes.js.map