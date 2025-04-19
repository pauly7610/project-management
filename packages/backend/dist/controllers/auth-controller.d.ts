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
    }, any, "json">) | (Response & import("hono").TypedResponse<{
        error: string;
    }, any, "json">)>;
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
    }, any, "json">)>;
    verifyEmail: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        error: string;
    }, any, "json">) | (Response & import("hono").TypedResponse<undefined, 302, "redirect">)>;
    resendVerification: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        message: string;
    }, import("hono/utils/http-status").ContentfulStatusCode, "json">) | (Response & import("hono").TypedResponse<{
        error: string;
    }, any, "json">)>;
    requestPasswordReset: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        message: string;
    }, import("hono/utils/http-status").ContentfulStatusCode, "json">) | (Response & import("hono").TypedResponse<{
        error: string;
    }, any, "json">)>;
    resetPassword: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        message: string;
    }, import("hono/utils/http-status").ContentfulStatusCode, "json">) | (Response & import("hono").TypedResponse<{
        error: string;
    }, any, "json">)>;
};
