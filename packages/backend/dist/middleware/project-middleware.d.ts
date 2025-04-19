import { MiddlewareHandler } from 'hono';
/**
 * Project middleware to verify project existence and ownership
 * This middleware will be used on project routes to ensure project exists and user has access
 */
declare const projectMiddleware: MiddlewareHandler;
export default projectMiddleware;
