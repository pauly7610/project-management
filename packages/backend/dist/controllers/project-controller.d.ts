import { Context } from 'hono';
/**
 * Get all projects for the authenticated user
 */
export declare const getAllProjects: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
    success: true;
    data: {
        id: string;
        name: string;
        description: string;
        ownerId: any;
    }[];
}, import("hono/utils/http-status").ContentfulStatusCode, "json">) | (Response & import("hono").TypedResponse<{
    success: false;
    message: string;
}, 500, "json">)>;
/**
 * Get a single project by ID
 */
export declare const getProjectById: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
    success: true;
    data: {
        id: any;
        name: string;
        description: string;
        ownerId: any;
        status: string;
        createdAt: string;
        updatedAt: string;
        members: {
            id: string;
            name: string;
            role: string;
        }[];
    };
}, import("hono/utils/http-status").ContentfulStatusCode, "json">) | (Response & import("hono").TypedResponse<{
    success: false;
    message: string;
}, 500, "json">)>;
/**
 * Create a new project
 */
export declare const createProject: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
    success: false;
    message: string;
}, 400, "json">) | (Response & import("hono").TypedResponse<{
    success: true;
    message: string;
    data: {
        id: string;
        name: any;
        description: any;
        ownerId: any;
        status: string;
        createdAt: string;
        updatedAt: string;
    };
}, 201, "json">) | (Response & import("hono").TypedResponse<{
    success: false;
    message: string;
}, 500, "json">)>;
/**
 * Update an existing project
 */
export declare const updateProject: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
    success: false;
    message: string;
}, 400, "json">) | (Response & import("hono").TypedResponse<{
    success: true;
    message: string;
    data: {
        id: any;
        name: any;
        description: any;
        status: any;
        ownerId: any;
        updatedAt: string;
    };
}, import("hono/utils/http-status").ContentfulStatusCode, "json">) | (Response & import("hono").TypedResponse<{
    success: false;
    message: string;
}, 500, "json">)>;
/**
 * Delete a project
 */
export declare const deleteProject: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
    success: true;
    message: string;
}, import("hono/utils/http-status").ContentfulStatusCode, "json">) | (Response & import("hono").TypedResponse<{
    success: false;
    message: string;
}, 500, "json">)>;
