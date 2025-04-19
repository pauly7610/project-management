import jwt from 'jsonwebtoken';
export declare const generateToken: (userId: string) => string;
export declare const verifyToken: (token: string) => jwt.JwtPayload | string;
export declare const getTokenFromHeader: (authHeader: string) => string | null;
