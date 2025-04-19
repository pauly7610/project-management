import { Context, MiddlewareHandler, Next } from 'hono';

/**
 * Project middleware to verify project existence and ownership
 * This middleware will be used on project routes to ensure project exists and user has access
 */
const projectMiddleware: MiddlewareHandler = async (c: Context, next: Next) => {
  try {
    // Get user ID from authentication middleware
    const userId = c.get('userId');
    
    if (!userId) {
      return c.json({ message: 'Authentication required' }, 401);
    }
    
    // If this is a specific project request (has ID parameter)
    const projectId = c.req.param('id');
    
    if (projectId) {
      // Here we would normally query the database to check:
      // 1. If project exists
      // 2. If user has permission to access this project
      
      // For now, simulating authorization check
      console.log(`Verifying access for user ${userId} to project ${projectId}`);
      
      // Set project data in context for route handlers to use
      c.set('projectData', {
        id: projectId,
        ownerId: userId,
        // Other project data would be added here
      });
    }
    
    // Continue to the next middleware/handler
    await next();
  } catch (error) {
    console.error('Project middleware error:', error);
    return c.json({ message: 'Server error' }, 500);
  }
};

export default projectMiddleware; 