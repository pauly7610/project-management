import { Hono } from 'hono';
import { Context } from 'hono';
import type { Variables } from '../types';
import projectMiddleware from '../middleware/project-middleware';
import { 
  getAllProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../controllers/project-controller';

const projectRouter = new Hono<{ Variables: Variables }>();

// Apply middleware to all routes
projectRouter.use('*', projectMiddleware);

// Get all projects
projectRouter.get('/', (c: Context<{ Variables: Variables }>) => getAllProjects(c));

// Get project by ID
projectRouter.get('/:id', (c: Context<{ Variables: Variables }>) => getProjectById(c));

// Create project
projectRouter.post('/', (c: Context<{ Variables: Variables }>) => createProject(c));

// Update project
projectRouter.put('/:id', (c: Context<{ Variables: Variables }>) => updateProject(c));

// Delete project
projectRouter.delete('/:id', (c: Context<{ Variables: Variables }>) => deleteProject(c));

export default projectRouter; 