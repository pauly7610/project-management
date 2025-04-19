/**
 * Generate HTML for email verification message
 */
export declare function generateVerificationEmail(token: string, userEmail: string): string;
/**
 * Generate HTML for password reset email
 */
export declare function generateResetPasswordEmail(token: string, userEmail: string): string;
