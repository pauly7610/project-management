import mongoose, { Schema, Document } from 'mongoose';

export interface IVerificationToken extends Document {
  token: string;
  email: string;
  expires: Date;
  createdAt: Date;
}

const VerificationTokenSchema: Schema = new Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      ref: 'User',
    },
    expires: {
      type: Date,
      required: true,
      // Default to 24 hours from now
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  },
  {
    timestamps: true,
  }
);

// Index tokens for fast lookup and automatically expire them
VerificationTokenSchema.index({ expires: 1 }, { expireAfterSeconds: 0 });

// Check if model exists before creating to prevent overwrite during hot reload
export const VerificationToken = mongoose.models.VerificationToken || 
  mongoose.model<IVerificationToken>('VerificationToken', VerificationTokenSchema); 