"use server";

import { NextRequest, NextResponse } from "next/server";

// Define the backend API URL from environment variables
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:5000/api';

export async function POST(request: NextRequest) {
  try {
    // Get the request data
    const body = await request.json();
    
    // Forward the request to the backend API
    const response = await fetch(`${BACKEND_API_URL}/auth/reset-password`, {
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
    console.error("Error forwarding password reset request to backend:", error);
    return NextResponse.json(
      { error: "Failed to process password reset request" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Get the request data
    const body = await request.json();
    
    // Forward the request to the backend API
    const response = await fetch(`${BACKEND_API_URL}/auth/reset-password`, {
      method: 'PUT',
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
    console.error("Error forwarding password reset request to backend:", error);
    return NextResponse.json(
      { error: "Failed to process password reset request" },
      { status: 500 }
    );
  }
} 