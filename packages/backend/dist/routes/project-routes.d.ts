import { Hono } from 'hono';
import type { Variables } from '../types';
declare const projectRouter: Hono<{
    Variables: Variables;
}, import("hono/types").BlankSchema, "/">;
export default projectRouter;
