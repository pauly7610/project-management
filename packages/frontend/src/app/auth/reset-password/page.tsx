"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send reset link");
      }
      
      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Reset password error:", error);
      setError(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
      <Link 
        href="/auth/signin" 
        className="inline-flex items-center text-sm text-blue-800 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to sign in
      </Link>

      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reset your password</h1>
        <p className="text-gray-600 mt-2">
          {!isSubmitted 
            ? "Enter your email address and we'll send you a link to reset your password." 
            : "Check your email for instructions to reset your password."}
        </p>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">{error}</div>}

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              placeholder="name@example.com"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-800 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-green-50 text-green-800 rounded-md">
            <p>
              If an account exists for <strong>{email}</strong>, you will receive an email with instructions on how to reset your password.
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Didn't receive the email?</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-blue-800 hover:underline text-sm font-medium"
            >
              Try again
            </button>
          </div>

          <Link 
            href="/auth/signin" 
            className="block w-full text-center py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition"
          >
            Return to Sign In
          </Link>
        </div>
      )}
    </div>
  );
} 