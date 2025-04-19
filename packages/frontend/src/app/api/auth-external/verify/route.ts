"use server";

import { NextRequest, NextResponse } from "next/server";

// Define the backend API URL from environment variables
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:5000/api';

export async function GET(request: NextRequest) {
  try {
    // Extract the token from the URL
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 }
      );
    }

    // Forward the request to the backend API
    const response = await fetch(`${BACKEND_API_URL}/auth/verify?token=${token}`, {
      method: 'GET',
    });

    // If the backend redirects, we should also redirect
    if (response.redirected) {
      return NextResponse.redirect(response.url);
    }

    // Get the response data
    const responseData = await response.json();

    // Return the response with the same status code
    return NextResponse.json(responseData, { status: response.status });
  } catch (error) {
    console.error("Error forwarding verification request to backend:", error);
    return NextResponse.json(
      { error: "Failed to process verification request" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get the request data
    const body = await request.json();
    
    // Forward the request to the backend API
    const response = await fetch(`${BACKEND_API_URL}/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Get the response data
    const responseData = await response.json();

    // Return the response with the same status code
    return NextResponse.json(responseData, { status: response.status });
  } catch (error) {
    console.error("Error forwarding verification request to backend:", error);
    return NextResponse.json(
      { error: "Failed to process verification request" },
      { status: 500 }
    );
  }
} 