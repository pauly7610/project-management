import { Hono } from 'hono';
import type { Variables } from '../types';
declare const teamRouter: Hono<{
    Variables: Variables;
}, import("hono/types").BlankSchema, "/">;
export { teamRouter };
