"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.authenticateUser = authenticateUser;
exports.verifyEmail = verifyEmail;
exports.resendVerificationEmail = resendVerificationEmail;
exports.requestPasswordReset = requestPasswordReset;
exports.resetPassword = resetPassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const resend_1 = require("resend");
const email_templates_1 = require("../utils/email-templates");
// Setup Resend email client
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
// Mock databases for now - will be replaced with MongoDB models later
const users = new Map();
const verificationTokens = new Map();
const passwordResetTokens = new Map();
/**
 * Register a new user
 */
async function registerUser(data) {
    // Check if user already exists
    if (getUserByEmail(data.email)) {
        throw new Error('User with this email already exists');
    }
    // Hash the password
    const hashedPassword = await bcrypt_1.default.hash(data.password, 12);
    // Create new user
    const userId = crypto_1.default.randomUUID();
    const newUser = {
        id: userId,
        name: data.name,
        email: data.email,
        password: hashedPassword,
        emailVerified: null,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        isVerified: false
    };
    // Store user
    users.set(data.email, newUser);
    // Generate verification token
    const token = createVerificationToken(data.email);
    // Send verification email
    await sendVerificationEmail(data.email, token);
    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    return { user: userWithoutPassword };
}
/**
 * Authenticate a user with email and password
 */
async function authenticateUser(email, password) {
    // Find user
    const user = getUserByEmail(email);
    if (!user) {
        throw new Error('Invalid credentials');
    }
    // Check password
    const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }
    // Check if email is verified
    if (!user.isVerified) {
        throw new Error('Please verify your email before signing in');
    }
    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
/**
 * Verify a user's email with token
 */
async function verifyEmail(token) {
    // Find token
    const verificationData = verificationTokens.get(token);
    if (!verificationData) {
        throw new Error('Invalid or expired verification token');
    }
    // Check if token is expired
    if (verificationData.expires < new Date()) {
        verificationTokens.delete(token);
        throw new Error('Verification token has expired');
    }
    // Find user
    const user = getUserByEmail(verificationData.email);
    if (!user) {
        throw new Error('User not found');
    }
    // Mark user as verified
    user.isVerified = true;
    user.emailVerified = new Date();
    user.updatedAt = new Date();
    users.set(verificationData.email, user);
    // Delete the token
    verificationTokens.delete(token);
}
/**
 * Resend verification email
 */
async function resendVerificationEmail(email) {
    // Find user
    const user = getUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }
    // Check if already verified
    if (user.isVerified) {
        throw new Error('Email is already verified');
    }
    // Generate new token
    const token = createVerificationToken(email);
    // Send email
    await sendVerificationEmail(email, token);
}
/**
 * Request password reset
 */
async function requestPasswordReset(email) {
    // Find user
    const user = getUserByEmail(email);
    // Don't reveal if user exists for security reasons
    if (!user) {
        return;
    }
    // Generate token
    const token = crypto_1.default.randomBytes(32).toString('hex');
    // Store token with 1 hour expiration
    passwordResetTokens.set(token, {
        email,
        expires: new Date(Date.now() + 60 * 60 * 1000)
    });
    // Send password reset email
    await sendPasswordResetEmail(email, token);
}
/**
 * Reset password with token
 */
async function resetPassword(token, email, newPassword) {
    // Find token
    const resetData = passwordResetTokens.get(token);
    if (!resetData || resetData.email !== email) {
        throw new Error('Invalid or expired token');
    }
    // Check if token is expired
    if (resetData.expires < new Date()) {
        passwordResetTokens.delete(token);
        throw new Error('Token has expired');
    }
    // Find user
    const user = getUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }
    // Hash new password
    const hashedPassword = await bcrypt_1.default.hash(newPassword, 12);
    // Update user
    user.password = hashedPassword;
    user.updatedAt = new Date();
    users.set(email, user);
    // Delete token
    passwordResetTokens.delete(token);
}
// Helper functions
function getUserByEmail(email) {
    return users.get(email);
}
function createVerificationToken(email) {
    const token = crypto_1.default.randomBytes(32).toString('hex');
    // Store token with 24 hour expiration
    verificationTokens.set(token, {
        email,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });
    return token;
}
async function sendVerificationEmail(email, token) {
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify?token=${token}`;
    const emailHtml = (0, email_templates_1.generateVerificationEmail)(token, email);
    try {
        await resend.emails.send({
            from: process.env.EMAIL_FROM || 'noreply@motionmagic.space',
            to: email,
            subject: 'Verify your Motion Magic account',
            html: emailHtml,
        });
    }
    catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }
}
async function sendPasswordResetEmail(email, token) {
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
    const emailHtml = (0, email_templates_1.generateResetPasswordEmail)(token, email);
    try {
        await resend.emails.send({
            from: process.env.EMAIL_FROM || 'noreply@motionmagic.space',
            to: email,
            subject: 'Reset your Motion Magic password',
            html: emailHtml,
        });
    }
    catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Failed to send password reset email');
    }
}
//# sourceMappingURL=auth-service.js.map