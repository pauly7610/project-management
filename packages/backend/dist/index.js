"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
// Import all models to ensure they are registered
const models_1 = require("./models");
// Load environment variables
dotenv_1.default.config();
// Initialize server settings
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
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
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// ********** AUTH ROUTES **********
const authRouter = express_1.default.Router();
// Signup
authRouter.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        const existingUser = await models_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // Create verification token
        const verificationToken = crypto_1.default.randomBytes(32).toString('hex');
        // Create new user
        const user = new models_1.User({
            name,
            email,
            password,
            verificationToken,
        });
        await user.save();
        // Create default settings for the user
        await models_1.Settings.create({
            user: user._id,
        });
        res.status(201).json({
            message: 'User created successfully. Please verify your email.',
            userId: user._id,
        });
    }
    catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// Login
authRouter.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user
        const user = await models_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        // Create JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '7d' });
        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// ********** PROJECT ROUTES **********
const projectRouter = express_1.default.Router();
// Get all projects
projectRouter.get('/', async (req, res) => {
    try {
        const userId = req.query.userId || req.body.userId;
        const query = userId ? { $or: [{ owner: userId }, { team: userId }] } : {};
        const projects = await models_1.Project.find(query)
            .populate('owner', 'name email')
            .populate('team', 'name email')
            .sort({ updatedAt: -1 });
        res.status(200).json(projects);
    }
    catch (error) {
        console.error('Get projects error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// Create project
projectRouter.post('/', async (req, res) => {
    try {
        const { name, description, startDate, endDate, status, owner, team, priority, budget, tags, } = req.body;
        const project = new models_1.Project({
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
    }
    catch (error) {
        console.error('Create project error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// ********** TASK ROUTES **********
const taskRouter = express_1.default.Router();
// Get all tasks
taskRouter.get('/', async (req, res) => {
    try {
        const { userId, projectId, status } = req.query;
        // Build query based on filters
        const query = {};
        if (userId) {
            query.$or = [{ assignedTo: userId }, { createdBy: userId }];
        }
        if (projectId) {
            query.project = projectId;
        }
        if (status) {
            query.status = status;
        }
        const tasks = await models_1.Task.find(query)
            .populate('assignedTo', 'name email')
            .populate('createdBy', 'name email')
            .populate('project', 'name')
            .sort({ dueDate: 1 });
        res.status(200).json(tasks);
    }
    catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// Create task
taskRouter.post('/', async (req, res) => {
    try {
        const { title, description, dueDate, status, project, assignedTo, createdBy, priority, estimatedHours, tags, } = req.body;
        const task = new models_1.Task({
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
            await models_1.Project.findByIdAndUpdate(project, { $push: { tasks: task._id } });
        }
        res.status(201).json(task);
    }
    catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// ********** EVENT ROUTES **********
const eventRouter = express_1.default.Router();
// Get all events
eventRouter.get('/', async (req, res) => {
    try {
        const { userId, startDate, endDate, type } = req.query;
        // Build query based on filters
        const query = {};
        if (userId) {
            query.$or = [{ organizer: userId }, { attendees: userId }];
        }
        if (startDate && endDate) {
            query.$and = [
                { startDate: { $lte: new Date(endDate) } },
                { endDate: { $gte: new Date(startDate) } },
            ];
        }
        else if (startDate) {
            query.startDate = { $gte: new Date(startDate) };
        }
        else if (endDate) {
            query.endDate = { $lte: new Date(endDate) };
        }
        if (type) {
            query.type = type;
        }
        const events = await models_1.Event.find(query)
            .populate('organizer', 'name email')
            .populate('attendees', 'name email')
            .populate('project', 'name')
            .sort({ startDate: 1 });
        res.status(200).json(events);
    }
    catch (error) {
        console.error('Get events error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// Create event
eventRouter.post('/', async (req, res) => {
    try {
        const { title, description, startDate, endDate, allDay, location, organizer, attendees, recurrence, color, project, type, } = req.body;
        const event = new models_1.Event({
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
    }
    catch (error) {
        console.error('Create event error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// ********** SETTINGS ROUTES **********
const settingsRouter = express_1.default.Router();
// Get user settings
settingsRouter.get('/:userId', async (req, res) => {
    try {
        // First try to find dedicated settings
        let settings = await models_1.Settings.findOne({ user: req.params.userId });
        // If no dedicated settings exist, get from user
        if (!settings) {
            const user = await models_1.User.findById(req.params.userId).select('settings');
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            // Create settings record from user settings
            settings = new models_1.Settings({
                user: req.params.userId,
                ...user.settings,
            });
            await settings.save();
        }
        res.status(200).json(settings);
    }
    catch (error) {
        console.error('Get settings error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// Update user settings
settingsRouter.put('/:userId', async (req, res) => {
    try {
        // Find and update dedicated settings
        let settings = await models_1.Settings.findOneAndUpdate({ user: req.params.userId }, { $set: req.body }, { new: true, upsert: true });
        res.status(200).json(settings);
    }
    catch (error) {
        console.error('Update settings error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// ********** TEAM ROUTES **********
const teamRouter = express_1.default.Router();
// Get all team members
teamRouter.get('/members', async (req, res) => {
    try {
        const users = await models_1.User.find()
            .select('name email settings.theme isVerified')
            .sort({ name: 1 });
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Get team members error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// Mount routers
app.use('/api/auth', authRouter);
app.use('/api/projects', projectRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/teams', teamRouter);
app.use('/api/events', eventRouter);
app.use('/api/settings', settingsRouter);
// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});
// Global error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});
// Start the server
async function startServer() {
    try {
        // Connect to MongoDB
        await (0, database_1.connectDB)();
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=index.js.map