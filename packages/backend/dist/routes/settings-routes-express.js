"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const settings_model_1 = require("../models/settings.model");
const user_model_1 = require("../models/user.model");
const router = express_1.default.Router();
// Get user settings
router.get('/:userId', async (req, res) => {
    try {
        // First try to find dedicated settings
        let settings = await settings_model_1.Settings.findOne({ user: req.params.userId });
        // If no dedicated settings exist, get from user
        if (!settings) {
            const user = await user_model_1.User.findById(req.params.userId).select('settings');
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            // Create settings record from user settings
            settings = new settings_model_1.Settings({
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
router.put('/:userId', async (req, res) => {
    try {
        // First try to find and update dedicated settings
        let settings = await settings_model_1.Settings.findOneAndUpdate({ user: req.params.userId }, { $set: req.body }, { new: true, upsert: true });
        // Also update user settings for backward compatibility
        await user_model_1.User.findByIdAndUpdate(req.params.userId, { $set: { settings: req.body } });
        res.status(200).json(settings);
    }
    catch (error) {
        console.error('Update settings error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// Reset user settings to defaults
router.post('/:userId/reset', async (req, res) => {
    try {
        const defaultSettings = new settings_model_1.Settings({ user: req.params.userId });
        const defaultValues = defaultSettings.toObject();
        // Remove _id from default values
        delete defaultValues._id;
        // Update settings
        const settings = await settings_model_1.Settings.findOneAndUpdate({ user: req.params.userId }, { $set: defaultValues }, { new: true, upsert: true });
        // Also update user settings for backward compatibility
        await user_model_1.User.findByIdAndUpdate(req.params.userId, { $set: { settings: defaultValues } });
        res.status(200).json(settings);
    }
    catch (error) {
        console.error('Reset settings error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.default = router;
//# sourceMappingURL=settings-routes-express.js.map