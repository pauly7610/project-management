import mongoose, { Schema, Document } from 'mongoose';

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

const ProjectSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
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
    status: {
      type: String,
      enum: ['planning', 'active', 'completed', 'onHold', 'cancelled'],
      default: 'planning',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Project owner is required'],
    },
    team: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    tasks: [{
      type: Schema.Types.ObjectId,
      ref: 'Task',
    }],
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    budget: {
      type: Number,
      min: 0,
    },
    actualCost: {
      type: Number,
      min: 0,
    },
    tags: [{
      type: String,
      trim: true,
    }],
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model<IProject>('Project', ProjectSchema); 