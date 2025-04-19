"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetSchema = exports.passwordResetRequestSchema = exports.signInSchema = exports.signUpSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
// User schema validation
exports.userSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().min(2),
    email: zod_1.z.string().email(),
    emailVerified: zod_1.z.date().nullable().optional(),
    image: zod_1.z.string().nullable().optional(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date()
});
exports.signUpSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(8, 'Password must be at least 8 characters')
});
exports.signInSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string(),
    rememberMe: zod_1.z.boolean().optional().default(false)
});
exports.passwordResetRequestSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address')
});
exports.passwordResetSchema = zod_1.z.object({
    token: zod_1.z.string(),
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(8, 'Password must be at least 8 characters')
});
