export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  emailVerified?: Date;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}

export interface ResetPasswordFormData {
  email: string;
}

export interface NewPasswordFormData {
  password: string;
  token: string;
}

export type AuthProvider = "credentials" | "github"; 