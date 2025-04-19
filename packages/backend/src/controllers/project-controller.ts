import { Context } from 'hono';

/**
 * Get all projects for the authenticated user
 */
export const getAllProjects = async (c: Context) => {
  try {
    const userId = c.get('userId');
    
    // Here you would fetch projects from database
    // For now, return mock data
    return c.json({
      success: true,
      data: [
        { id: '1', name: 'Website Redesign', description: 'Modernize our company website', ownerId: userId },
        { id: '2', name: 'Mobile App Development', description: 'Create iOS and Android apps', ownerId: userId },
        { id: '3', name: 'Content Marketing', description: 'Create blog posts and social media content', ownerId: userId }
      ]
    });
  } catch (error) {
    console.error('Error getting projects:', error);
    return c.json({ success: false, message: 'Failed to retrieve projects' }, 500);
  }
};

/**
 * Get a single project by ID
 */
export const getProjectById = async (c: Context) => {
  try {
    const projectData = c.get('projectData');
    
    // Here you would fetch project details from database
    // For now, return the data set by middleware with additional properties
    return c.json({
      success: true,
      data: {
        id: projectData.id,
        name: `Project ${projectData.id}`,
        description: `Description for project ${projectData.id}`,
        ownerId: projectData.ownerId,
        status: 'active',
        createdAt: '2023-05-15T10:00:00Z',
        updatedAt: '2023-05-20T14:30:00Z',
        members: [
          { id: '101', name: 'John Doe', role: 'editor' },
          { id: '102', name: 'Jane Smith', role: 'viewer' }
        ]
      }
    });
  } catch (error) {
    console.error(`Error getting project with ID ${c.req.param('id')}:`, error);
    return c.json({ success: false, message: 'Failed to retrieve project' }, 500);
  }
};

/**
 * Create a new project
 */
export const createProject = async (c: Context) => {
  try {
    const userId = c.get('userId');
    // Parse request body
    const body = await c.req.json();
    
    // Validate input
    if (!body.name) {
      return c.json({ success: false, message: 'Project name is required' }, 400);
    }
    
    // Here you would create a new project in the database
    // For now, simulate a created project
    const newProject = {
      id: Math.random().toString(36).substring(2, 10),
      name: body.name,
      description: body.description || '',
      ownerId: userId,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return c.json({
      success: true,
      message: 'Project created successfully',
      data: newProject
    }, 201);
  } catch (error) {
    console.error('Error creating project:', error);
    return c.json({ success: false, message: 'Failed to create project' }, 500);
  }
};

/**
 * Update an existing project
 */
export const updateProject = async (c: Context) => {
  try {
    const projectData = c.get('projectData');
    // Parse request body
    const body = await c.req.json();
    
    // Validate input
    if (!body.name && !body.description && !body.status) {
      return c.json({ 
        success: false, 
        message: 'Please provide at least one field to update' 
      }, 400);
    }
    
    // Here you would update project in database
    // For now, return a merged object
    const updatedProject = {
      id: projectData.id,
      name: body.name || `Project ${projectData.id}`,
      description: body.description || `Description for project ${projectData.id}`,
      status: body.status || 'active',
      ownerId: projectData.ownerId,
      updatedAt: new Date().toISOString()
    };
    
    return c.json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject
    });
  } catch (error) {
    console.error(`Error updating project with ID ${c.req.param('id')}:`, error);
    return c.json({ success: false, message: 'Failed to update project' }, 500);
  }
};

/**
 * Delete a project
 */
export const deleteProject = async (c: Context) => {
  try {
    const projectId = c.req.param('id');
    
    // Here you would delete the project from database
    // For now, simulate deletion
    
    return c.json({
      success: true,
      message: `Project ${projectId} deleted successfully`
    });
  } catch (error) {
    console.error(`Error deleting project with ID ${c.req.param('id')}:`, error);
    return c.json({ success: false, message: 'Failed to delete project' }, 500);
  }
}; 