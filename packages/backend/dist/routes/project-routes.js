"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const project_middleware_1 = __importDefault(require("../middleware/project-middleware"));
const project_controller_1 = require("../controllers/project-controller");
const projectRouter = new hono_1.Hono();
// Apply middleware to all routes
projectRouter.use('*', project_middleware_1.default);
// Get all projects
projectRouter.get('/', (c) => (0, project_controller_1.getAllProjects)(c));
// Get project by ID
projectRouter.get('/:id', (c) => (0, project_controller_1.getProjectById)(c));
// Create project
projectRouter.post('/', (c) => (0, project_controller_1.createProject)(c));
// Update project
projectRouter.put('/:id', (c) => (0, project_controller_1.updateProject)(c));
// Delete project
projectRouter.delete('/:id', (c) => (0, project_controller_1.deleteProject)(c));
exports.default = projectRouter;
//# sourceMappingURL=project-routes.js.map