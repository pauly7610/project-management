import mongoose, { Document } from 'mongoose';
export interface ITask extends Document {
    title: string;
    description: string;
    dueDate: Date;
    status: 'todo' | 'inProgress' | 'review' | 'done';
    project?: mongoose.Types.ObjectId;
    assignedTo?: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    estimatedHours?: number;
    actualHours?: number;
    comments: {
        user: mongoose.Types.ObjectId;
        text: string;
        createdAt: Date;
    }[];
    attachments: {
        name: string;
        url: string;
        type: string;
        size: number;
    }[];
    tags: string[];
}
export declare const Task: mongoose.Model<ITask, {}, {}, {}, mongoose.Document<unknown, {}, ITask> & ITask & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
