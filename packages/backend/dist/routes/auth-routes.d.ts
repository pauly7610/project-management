import { Hono } from 'hono';
import type { Variables } from '../types';
declare const authRouter: Hono<{
    Variables: Variables;
}, import("hono/types").BlankSchema, "/">;
export { authRouter };
