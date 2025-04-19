"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_model_1 = require("../models/user.model");
const router = express_1.default.Router();
// Get all team members
router.get('/members', async (req, res) => {
    try {
        const users = await user_model_1.User.find()
            .select('name email settings.theme isVerified')
            .sort({ name: 1 });
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Get team members error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// Get team member by ID
router.get('/members/:id', async (req, res) => {
    try {
        const user = await user_model_1.User.findById(req.params.id)
            .select('-password -verificationToken -passwordResetToken -passwordResetExpires');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Get team member error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// Update team member
router.put('/members/:id', async (req, res) => {
    try {
        // Don't allow updating password through this endpoint
        if (req.body.password) {
            delete req.body.password;
        }
        const user = await user_model_1.User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).select('-password -verificationToken -passwordResetToken -passwordResetExpires');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Update team member error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// Add team member (simpler user creation without verification)
router.post('/members', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        const existingUser = await user_model_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // Create new user (already verified as added by admin)
        const user = new user_model_1.User({
            name,
            email,
            password,
            isVerified: true,
        });
        await user.save();
        res.status(201).json({
            message: 'Team member added successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error('Add team member error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// Delete team member
router.delete('/members/:id', async (req, res) => {
    try {
        const user = await user_model_1.User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // TODO: Reassign or delete user's tasks, projects before deletion
        // Delete user
        await user.deleteOne();
        res.status(200).json({ message: 'Team member deleted successfully' });
    }
    catch (error) {
        console.error('Delete team member error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.default = router;
//# sourceMappingURL=team-routes-express.js.map