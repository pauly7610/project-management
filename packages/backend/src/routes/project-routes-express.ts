import express from 'express';
import { Project } from '../models/project.model';
import { Task } from '../models/task.model';

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || req.body.userId;
    const query = userId ? { $or: [{ owner: userId }, { team: userId }] } : {};
    
    const projects = await Project.find(query)
      .populate('owner', 'name email')
      .populate('team', 'name email')
      .sort({ updatedAt: -1 });
    
    res.status(200).json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('team', 'name email')
      .populate({
        path: 'tasks',
        select: 'title status priority dueDate assignedTo',
        populate: {
          path: 'assignedTo',
          select: 'name email',
        },
      });
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.status(200).json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create project
router.post('/', async (req, res) => {
  try {
    const {
      name,
      description,
      startDate,
      endDate,
      status,
      owner,
      team,
      priority,
      budget,
      tags,
    } = req.body;
    
    const project = new Project({
      name,
      description,
      startDate,
      endDate,
      status,
      owner,
      team: team || [],
      priority,
      budget,
      tags: tags || [],
      progress: 0,
    });
    
    await project.save();
    
    res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update project
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.status(200).json(project);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Delete associated tasks
    await Task.deleteMany({ project: req.params.id });
    
    // Delete project
    await project.deleteOne();
    
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get project tasks
router.get('/:id/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.id })
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Get project tasks error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 