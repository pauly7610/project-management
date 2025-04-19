"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_model_1 = require("../models/task.model");
const project_model_1 = require("../models/project.model");
const router = express_1.default.Router();
// Get all tasks
router.get('/', async (req, res) => {
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
        const tasks = await task_model_1.Task.find(query)
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
// Get task by ID
router.get('/:id', async (req, res) => {
    try {
        const task = await task_model_1.Task.findById(req.params.id)
            .populate('assignedTo', 'name email')
            .populate('createdBy', 'name email')
            .populate('project', 'name')
            .populate('comments.user', 'name email');
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    }
    catch (error) {
        console.error('Get task error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// Create task
router.post('/', async (req, res) => {
    try {
        const { title, description, dueDate, status, project, assignedTo, createdBy, priority, estimatedHours, tags, } = req.body;
        const task = new task_model_1.Task({
            title,
            description,
            dueDate,
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
            await project_model_1.Project.findByIdAndUpdate(project, { $push: { tasks: task._id } });
        }
        res.status(201).json(task);
    }
    catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// Update task
router.put('/:id', async (req, res) => {
    try {
        const task = await task_model_1.Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    }
    catch (error) {
        console.error('Update task error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// Delete task
router.delete('/:id', async (req, res) => {
    try {
        const task = await task_model_1.Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        // Remove task from project
        if (task.project) {
            await project_model_1.Project.findByIdAndUpdate(task.project, { $pull: { tasks: task._id } });
        }
        // Delete task
        await task.deleteOne();
        res.status(200).json({ message: 'Task deleted successfully' });
    }
    catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// Add comment to task
router.post('/:id/comments', async (req, res) => {
    try {
        const { user, text } = req.body;
        const task = await task_model_1.Task.findByIdAndUpdate(req.params.id, {
            $push: {
                comments: {
                    user,
                    text,
                    createdAt: new Date(),
                },
            },
        }, { new: true }).populate('comments.user', 'name email');
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task.comments);
    }
    catch (error) {
        console.error('Add comment error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.default = router;
//# sourceMappingURL=task-routes-express.js.map