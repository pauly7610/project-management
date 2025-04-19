import mongoose, { Document } from 'mongoose';
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
export declare const Event: mongoose.Model<IEvent, {}, {}, {}, mongoose.Document<unknown, {}, IEvent> & IEvent & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
