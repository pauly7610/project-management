import { Context } from 'hono';
export declare const authController: {
    signup: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        message: string;
        user: {
            id: `${string}-${string}-${string}-${string}-${string}`;
            name: string;
            email: string;
            emailVerified: any;
            image: any;
            createdAt: string;
            updatedAt: string;
            isVerified: boolean;
        };
    }, 201, "json">) | (Response & import("hono").TypedResponse<{
        error: string;
    }, 409, "json">) | (Response & import("hono").TypedResponse<{
        error: string;
    }, 500, "json">)>;
    signin: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        message: string;
        user: {
            id: string;
            name: string;
            email: string;
            image: string;
        };
    }, import("hono/utils/http-status").ContentfulStatusCode, "json">) | (Response & import("hono").TypedResponse<{
        error: string;
    }, 401, "json">) | (Response & import("hono").TypedResponse<{
        error: string;
    }, 403, "json">) | (Response & import("hono").TypedResponse<{
        error: string;
    }, 500, "json">)>;
    verifyEmail: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        error: string;
    }, 400, "json">) | (Response & import("hono").TypedResponse<undefined, 302, "redirect">) | (Response & import("hono").TypedResponse<{
        error: string;
    }, 500, "json">)>;
    resendVerification: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        message: string;
    }, import("hono/utils/http-status").ContentfulStatusCode, "json">) | (Response & import("hono").TypedResponse<{
        error: string;
    }, 404, "json">) | (Response & import("hono").TypedResponse<{
        error: string;
    }, 500, "json">)>;
    requestPasswordReset: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        message: string;
    }, import("hono/utils/http-status").ContentfulStatusCode, "json">) | (Response & import("hono").TypedResponse<{
        error: string;
    }, 500, "json">)>;
    resetPassword: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        message: string;
    }, import("hono/utils/http-status").ContentfulStatusCode, "json">) | (Response & import("hono").TypedResponse<{
        error: string;
    }, 400, "json">) | (Response & import("hono").TypedResponse<{
        error: string;
    }, 404, "json">) | (Response & import("hono").TypedResponse<{
        error: string;
    }, 500, "json">)>;
};
