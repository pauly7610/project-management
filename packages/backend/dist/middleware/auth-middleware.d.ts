import { MiddlewareHandler } from 'hono';
/**
 * Authentication middleware to protect routes
 * Sets the userId in the Hono context if authentication is successful
 */
export declare const authenticate: MiddlewareHandler;
