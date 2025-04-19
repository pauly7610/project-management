"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const hono_1 = require("hono");
const auth_middleware_1 = require("../middleware/auth-middleware");
// Create router for task endpoints
const taskRouter = new hono_1.Hono();
exports.taskRouter = taskRouter;
// Apply authentication middleware to all task routes
taskRouter.use('*', auth_middleware_1.authenticate);
// Define routes - will be implemented later
taskRouter.get('/', (c) => c.json({ message: 'Get all tasks' }));
taskRouter.get('/:id', (c) => c.json({ message: `Get task ${c.req.param('id')}` }));
taskRouter.post('/', (c) => c.json({ message: 'Create task' }, 201));
taskRouter.put('/:id', (c) => c.json({ message: `Update task ${c.req.param('id')}` }));
taskRouter.delete('/:id', (c) => c.json({ message: `Delete task ${c.req.param('id')}` }));
//# sourceMappingURL=task-routes.js.map