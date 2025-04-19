import express from 'express';
import { Event } from '../models/event.model';

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
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

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email')
      .populate('attendees', 'name email')
      .populate('project', 'name');
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.status(200).json(event);
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create event
router.post('/', async (req, res) => {
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
      reminders,
      type,
    } = req.body;
    
    const event = new Event({
      title,
      description,
      startDate,
      endDate,
      allDay: allDay || false,
      location,
      organizer,
      attendees: attendees || [],
      recurrence,
      color,
      project,
      reminders: reminders || [],
      type,
    });
    
    await event.save();
    
    res.status(201).json(event);
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update event
router.put('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.status(200).json(event);
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete event
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    // Delete event
    await event.deleteOne();
    
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add attendee to event
router.post('/:id/attendees', async (req, res) => {
  try {
    const { userId } = req.body;
    
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { attendees: userId } },
      { new: true }
    ).populate('attendees', 'name email');
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.status(200).json(event.attendees);
  } catch (error) {
    console.error('Add attendee error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove attendee from event
router.delete('/:id/attendees/:userId', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $pull: { attendees: req.params.userId } },
      { new: true }
    ).populate('attendees', 'name email');
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.status(200).json(event.attendees);
  } catch (error) {
    console.error('Remove attendee error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 