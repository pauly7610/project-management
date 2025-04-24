import mongoose, { Document, Schema } from 'mongoose';
import { userSchema as sharedUserSchema } from '../../shared/src/types/user';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  emailVerified?: Date | null;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  verificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  integrations?: Record<string, { accessToken: string }>;
}

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  emailVerified: { type: Date, default: null },
  image: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  verificationToken: { type: String, default: null },
  passwordResetToken: { type: String, default: null },
  passwordResetExpires: { type: Date, default: null },
  integrations: { type: Schema.Types.Mixed, default: {} },
});

UserSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
