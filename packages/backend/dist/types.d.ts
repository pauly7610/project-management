import { ContextVariableMap } from 'hono';
export interface Variables extends ContextVariableMap {
    userId?: string;
    projectData?: {
        id: string;
        ownerId: string;
        [key: string]: any;
    };
}
export interface Env {
    NODE_ENV: string;
    PORT: string;
    MONGODB_URI: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    RESEND_API_KEY: string;
    EMAIL_FROM: string;
    NEXT_PUBLIC_BASE_URL: string;
}
