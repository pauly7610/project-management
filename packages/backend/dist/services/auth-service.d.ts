import { SignUpData } from '@motion-magic/shared';
/**
 * Register a new user
 */
export declare function registerUser(data: SignUpData): Promise<{
    user: {
        id: `${string}-${string}-${string}-${string}-${string}`;
        name: string;
        email: string;
        emailVerified: any;
        image: any;
        createdAt: Date;
        updatedAt: Date;
        isVerified: boolean;
    };
}>;
/**
 * Authenticate a user with email and password
 */
export declare function authenticateUser(email: string, password: string): Promise<{
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    emailVerified?: Date | null | undefined;
    image?: string | null | undefined;
}>;
/**
 * Verify a user's email with token
 */
export declare function verifyEmail(token: string): Promise<void>;
/**
 * Resend verification email
 */
export declare function resendVerificationEmail(email: string): Promise<void>;
/**
 * Request password reset
 */
export declare function requestPasswordReset(email: string): Promise<void>;
/**
 * Reset password with token
 */
export declare function resetPassword(token: string, email: string, newPassword: string): Promise<void>;
