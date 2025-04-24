import mongoose, { Document, Schema } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description?: string;
  owner: mongoose.Schema.Types.ObjectId;
  members: { user: mongoose.Schema.Types.ObjectId; role: string }[];
  invites: { email: string; role?: string; invitedBy: mongoose.Schema.Types.ObjectId; accepted: boolean }[];
  createdAt: Date;
  updatedAt: Date;
}

const TeamSchema: Schema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      role: { type: String, default: 'member' }
    }
  ],
  invites: [
    {
      email: { type: String, required: true },
      role: { type: String, default: 'member' },
      invitedBy: { type: Schema.Types.ObjectId, ref: 'User' },
      accepted: { type: Boolean, default: false }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

TeamSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const Team = mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema);
