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
projectRouter.use('/*', project_middleware_1.default);
// Define routes
projectRouter.get('/', project_controller_1.getAllProjects);
projectRouter.get('/:id', project_controller_1.getProjectById);
projectRouter.post('/', project_controller_1.createProject);
projectRouter.put('/:id', project_controller_1.updateProject);
projectRouter.delete('/:id', project_controller_1.deleteProject);
exports.default = projectRouter;
//# sourceMappingURL=project-routes.js.map