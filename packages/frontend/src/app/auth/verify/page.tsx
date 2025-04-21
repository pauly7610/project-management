"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      setStatus("error");
      setErrorMessage("Invalid verification link. Missing token or email.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/auth/verify?token=${token}&email=${encodeURIComponent(email)}`);
        
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Verification failed");
        }

        setStatus("success");
        
        // Redirect to sign in page after 3 seconds
        setTimeout(() => {
          router.push("/auth/signin?verified=true");
        }, 3000);
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error("Verification error:", error);
        setStatus("error");
        setErrorMessage(error.message || "An error occurred during verification");
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  if (status === "loading") {
    return (
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Verifying your email</h1>
          <p className="text-gray-600 mt-2">Please wait while we verify your email address...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-red-600"
              >
                <path
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Verification Failed</h1>
        </div>
        <p className="text-gray-600 mb-6 text-center">{errorMessage}</p>
        <Link
          href="/auth/signin"
          className="block w-full py-2 px-4 bg-blue-800 text-white text-center rounded-md hover:bg-blue-700"
        >
          Return to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-green-600"
            >
              <path
                d="M20 6L9 17l-5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Email Verified!</h1>
        <p className="text-gray-600 mt-2">
          Your email has been successfully verified. You'll be redirected to the sign-in page in a moment.
        </p>
      </div>
      <Link
        href="/auth/signin?verified=true"
        className="block w-full py-2 px-4 bg-blue-800 text-white text-center rounded-md hover:bg-blue-700"
      >
        Sign In Now
      </Link>
    </div>
  );
}

// Loading fallback for the Suspense boundary
function VerifyPageLoading() {
  return (
    <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Loading verification</h1>
        <p className="text-gray-600 mt-2">Please wait...</p>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<VerifyPageLoading />}>
      <VerifyPageContent />
    </Suspense>
  );
} 