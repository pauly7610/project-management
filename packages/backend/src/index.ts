import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';
import { requireAuth } from './middleware/auth';

// Import all models to ensure they are registered
import { User, Project, Task, Event, Settings } from './models';

// Load environment variables
dotenv.config();

// Initialize server settings
const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://motionmagic.space',
    'https://www.motionmagic.space'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

// ********** AUTH ROUTES **********
const authRouter = express.Router();

// Signup
authRouter.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create new user
    const user = new User({
      name,
      email,
      password,
      verificationToken,
    });

    await user.save();

    // Create default settings for the user
    await Settings.create({
      user: user._id,
    });

    res.status(201).json({
      message: 'User created successfully. Please verify your email.',
      userId: user._id,
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
authRouter.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Create JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '7d' }
    );
    
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ********** PROJECT ROUTES **********
const projectRouter = express.Router();

// Get all projects
projectRouter.get('/', async (req, res) => {
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

// Create project
projectRouter.post('/', async (req, res) => {
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
      startDate: new Date(startDate),
      endDate: new Date(endDate),
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

// ********** TASK ROUTES **********
const taskRouter = express.Router();

// Get all tasks
taskRouter.get('/', async (req, res) => {
  try {
    const { userId, projectId, status } = req.query;
    
    // Build query based on filters
    const query: any = {};
    
    if (userId) {
      query.$or = [{ assignedTo: userId }, { createdBy: userId }];
    }
    
    if (projectId) {
      query.project = projectId;
    }
    
    if (status) {
      query.status = status;
    }
    
    const tasks = await Task.find(query)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('project', 'name')
      .sort({ dueDate: 1 });
    
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create task
taskRouter.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      dueDate,
      status,
      project,
      assignedTo,
      createdBy,
      priority,
      estimatedHours,
      tags,
    } = req.body;
    
    const task = new Task({
      title,
      description,
      dueDate: new Date(dueDate),
      status,
      project,
      assignedTo,
      createdBy,
      priority,
      estimatedHours,
      tags: tags || [],
    });
    
    await task.save();
    
    // Update project tasks array if project is specified
    if (project) {
      await Project.findByIdAndUpdate(
        project,
        { $push: { tasks: task._id } }
      );
    }
    
    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ********** EVENT ROUTES **********
const eventRouter = express.Router();

// Get all events
eventRouter.get('/', async (req, res) => {
  try {
    const { userId, startDate, endDate, type } = req.query;
    
    // Build query based on filters
    const query: any = {};
    
    if (userId) {
      query.$or = [{ organizer: userId }, { attendees: userId }];
    }
    
    if (startDate && endDate) {
      query.$and = [
        { startDate: { $lte: new Date(endDate as string) } },
        { endDate: { $gte: new Date(startDate as string) } },
      ];
    } else if (startDate) {
      query.startDate = { $gte: new Date(startDate as string) };
    } else if (endDate) {
      query.endDate = { $lte: new Date(endDate as string) };
    }
    
    if (type) {
      query.type = type;
    }
    
    const events = await Event.find(query)
      .populate('organizer', 'name email')
      .populate('attendees', 'name email')
      .populate('project', 'name')
      .sort({ startDate: 1 });
    
    res.status(200).json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create event
eventRouter.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      allDay,
      location,
      organizer,
      attendees,
      recurrence,
      color,
      project,
      type,
    } = req.body;
    
    const event = new Event({
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      allDay: allDay || false,
      location,
      organizer,
      attendees: attendees || [],
      recurrence,
      color,
      project,
      type,
    });
    
    await event.save();
    
    res.status(201).json(event);
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ********** SETTINGS ROUTES **********
const settingsRouter = express.Router();

// Get user settings
settingsRouter.get('/:userId', async (req, res) => {
  try {
    // First try to find dedicated settings
    let settings = await Settings.findOne({ user: req.params.userId });
    
    // If no dedicated settings exist, get from user
    if (!settings) {
      const user = await User.findById(req.params.userId).select('settings');
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Create settings record from user settings
      settings = new Settings({
        user: req.params.userId,
        ...user.settings,
      });
      
      await settings.save();
    }
    
    res.status(200).json(settings);
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user settings
settingsRouter.put('/:userId', async (req, res) => {
  try {
    // Find and update dedicated settings
    let settings = await Settings.findOneAndUpdate(
      { user: req.params.userId },
      { $set: req.body },
      { new: true, upsert: true }
    );
    
    res.status(200).json(settings);
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ********** TEAM ROUTES **********
const teamRouter = express.Router();

// Get all team members
teamRouter.get('/members', async (req, res) => {
  try {
    const users = await User.find()
      .select('name email settings.theme isVerified')
      .sort({ name: 1 });
    
    res.status(200).json(users);
  } catch (error) {
    console.error('Get team members error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Mount routers
app.use('/api/auth', authRouter);
app.use('/api/projects', requireAuth, projectRouter);
app.use('/api/tasks', requireAuth, taskRouter);
app.use('/api/teams', requireAuth, teamRouter);
app.use('/api/events', eventRouter);
app.use('/api/settings', settingsRouter);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Connect to MongoDB before starting the server
connectDB().then(() => {
  // Start the server
  async function startServer() {
    try {
      app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  }
  startServer();
});