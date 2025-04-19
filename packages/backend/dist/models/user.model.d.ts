import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    verificationToken?: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    settings: {
        theme: string;
        language: string;
        timeZone: string;
        dateFormat: string;
        emailNotifications: boolean;
        pushNotifications: boolean;
    };
    comparePassword(candidatePassword: string): Promise<boolean>;
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
