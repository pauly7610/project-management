import express from 'express';
import { Settings } from '../models/settings.model';
import { User } from '../models/user.model';

const router = express.Router();

// Get user settings
router.get('/:userId', async (req, res) => {
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
router.put('/:userId', async (req, res) => {
  try {
    // First try to find and update dedicated settings
    let settings = await Settings.findOneAndUpdate(
      { user: req.params.userId },
      { $set: req.body },
      { new: true, upsert: true }
    );
    
    // Also update user settings for backward compatibility
    await User.findByIdAndUpdate(
      req.params.userId,
      { $set: { settings: req.body } }
    );
    
    res.status(200).json(settings);
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Reset user settings to defaults
router.post('/:userId/reset', async (req, res) => {
  try {
    const defaultSettings = new Settings({ user: req.params.userId });
    const defaultValues = defaultSettings.toObject();
    
    // Remove _id from default values
    delete defaultValues._id;
    
    // Update settings
    const settings = await Settings.findOneAndUpdate(
      { user: req.params.userId },
      { $set: defaultValues },
      { new: true, upsert: true }
    );
    
    // Also update user settings for backward compatibility
    await User.findByIdAndUpdate(
      req.params.userId,
      { $set: { settings: defaultValues } }
    );
    
    res.status(200).json(settings);
  } catch (error) {
    console.error('Reset settings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 