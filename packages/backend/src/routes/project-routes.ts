import { Hono } from 'hono';
import { Context } from 'hono';
import projectMiddleware from '../middleware/project-middleware';
import { 
  getAllProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../controllers/project-controller';

const projectRouter = new Hono();

// Apply middleware to all routes
projectRouter.use('/*', projectMiddleware);

// Define routes
projectRouter.get('/', getAllProjects);
projectRouter.get('/:id', getProjectById);
projectRouter.post('/', createProject);
projectRouter.put('/:id', updateProject);
projectRouter.delete('/:id', deleteProject);

export default projectRouter; 