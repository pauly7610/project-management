import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  user: mongoose.Types.ObjectId;
  theme: 'light' | 'dark' | 'system';
  language: string;
  timeZone: string;
  dateFormat: string;
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
    taskReminders: boolean;
    eventReminders: boolean;
    mentionNotifications: boolean;
    dailyDigest: boolean;
  };
  calendar: {
    defaultView: 'month' | 'week' | 'day' | 'agenda';
    startOfWeek: 0 | 1 | 6; // 0 = Sunday, 1 = Monday, 6 = Saturday
    showWeekends: boolean;
    workingHours: {
      start: string;
      end: string;
    };
  };
  dashboard: {
    defaultLayout: 'grid' | 'list';
    visibleWidgets: string[];
    widgetLayout: string;
  };
}

const SettingsSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system',
    },
    language: {
      type: String,
      default: 'en',
      enum: ['en', 'es', 'fr', 'de', 'ja', 'zh', 'ko', 'pt', 'it', 'ru'],
    },
    timeZone: {
      type: String,
      default: 'UTC',
    },
    dateFormat: {
      type: String,
      enum: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'],
      default: 'MM/DD/YYYY',
    },
    notifications: {
      email: {
        type: Boolean,
        default: true,
      },
      push: {
        type: Boolean,
        default: true,
      },
      desktop: {
        type: Boolean,
        default: true,
      },
      taskReminders: {
        type: Boolean,
        default: true,
      },
      eventReminders: {
        type: Boolean,
        default: true,
      },
      mentionNotifications: {
        type: Boolean,
        default: true,
      },
      dailyDigest: {
        type: Boolean,
        default: false,
      },
    },
    calendar: {
      defaultView: {
        type: String,
        enum: ['month', 'week', 'day', 'agenda'],
        default: 'month',
      },
      startOfWeek: {
        type: Number,
        enum: [0, 1, 6], // 0 = Sunday, 1 = Monday, 6 = Saturday
        default: 1,
      },
      showWeekends: {
        type: Boolean,
        default: true,
      },
      workingHours: {
        start: {
          type: String,
          default: '09:00',
        },
        end: {
          type: String,
          default: '17:00',
        },
      },
    },
    dashboard: {
      defaultLayout: {
        type: String,
        enum: ['grid', 'list'],
        default: 'grid',
      },
      visibleWidgets: {
        type: [String],
        default: ['tasks', 'calendar', 'projects', 'activity'],
      },
      widgetLayout: {
        type: String,
        default: '{}',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create index for faster lookups
SettingsSchema.index({ user: 1 });

export const Settings = mongoose.model<ISettings>('Settings', SettingsSchema); 