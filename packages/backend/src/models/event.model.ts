import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  location?: string;
  organizer: mongoose.Types.ObjectId;
  attendees: mongoose.Types.ObjectId[];
  recurrence?: string;
  color?: string;
  project?: mongoose.Types.ObjectId;
  reminders: {
    time: Date;
    sent: boolean;
  }[];
  type: 'meeting' | 'deadline' | 'reminder' | 'task' | 'other';
}

const EventSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    allDay: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      trim: true,
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Event organizer is required'],
    },
    attendees: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    recurrence: {
      type: String,
      enum: ['none', 'daily', 'weekly', 'monthly', 'yearly'],
      default: 'none',
    },
    color: {
      type: String,
      default: '#3788d8',
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
    reminders: [{
      time: {
        type: Date,
        required: true,
      },
      sent: {
        type: Boolean,
        default: false,
      },
    }],
    type: {
      type: String,
      enum: ['meeting', 'deadline', 'reminder', 'task', 'other'],
      default: 'other',
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
EventSchema.index({ startDate: 1, endDate: 1 });
EventSchema.index({ organizer: 1 });
EventSchema.index({ attendees: 1 });

export const Event = mongoose.model<IEvent>('Event', EventSchema); 