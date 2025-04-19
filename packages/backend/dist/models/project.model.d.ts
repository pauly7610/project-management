import mongoose, { Document } from 'mongoose';
export interface IProject extends Document {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: 'planning' | 'active' | 'completed' | 'onHold' | 'cancelled';
    owner: mongoose.Types.ObjectId;
    team: mongoose.Types.ObjectId[];
    tasks: mongoose.Types.ObjectId[];
    priority: 'low' | 'medium' | 'high' | 'urgent';
    progress: number;
    budget?: number;
    actualCost?: number;
    tags: string[];
}
export declare const Project: mongoose.Model<IProject, {}, {}, {}, mongoose.Document<unknown, {}, IProject> & IProject & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
