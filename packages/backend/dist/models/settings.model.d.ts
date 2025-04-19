import mongoose, { Document } from 'mongoose';
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
        startOfWeek: 0 | 1 | 6;
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
export declare const Settings: mongoose.Model<ISettings, {}, {}, {}, mongoose.Document<unknown, {}, ISettings> & ISettings & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
