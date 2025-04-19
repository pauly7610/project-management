import { Hono } from 'hono';
import type { Variables } from './types';
declare const app: Hono<{
    Variables: Variables;
}, import("hono/types").BlankSchema, "/">;
export default app;
