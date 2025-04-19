"use server";

import { NextRequest, NextResponse } from "next/server";

// Define the backend API URL from environment variables
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:5000/api';

export async function POST(request: NextRequest) {
  try {
    // Get the request data
    const body = await request.json();
    
    // Forward the request to the backend API
    const response = await fetch(`${BACKEND_API_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Get the response data
    const responseData = await response.json();
    
    // If the response includes a Set-Cookie header, forward it
    const setCookieHeader = response.headers.get('Set-Cookie');
    const headers = new Headers();
    
    if (setCookieHeader) {
      headers.set('Set-Cookie', setCookieHeader);
    }

    // Return the response with the same status code and cookies
    return NextResponse.json(responseData, { 
      status: response.status,
      headers
    });
  } catch (error) {
    console.error("Error forwarding signin request to backend:", error);
    return NextResponse.json(
      { error: "Failed to process signin request" },
      { status: 500 }
    );
  }
} 