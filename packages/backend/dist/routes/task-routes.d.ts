import { Hono } from 'hono';
import type { Variables } from '../types';
declare const taskRouter: Hono<{
    Variables: Variables;
}, import("hono/types").BlankSchema, "/">;
export { taskRouter };
