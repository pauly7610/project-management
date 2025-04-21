import { NextRequest, NextResponse } from "next/server";

// Mock OAuth configuration - in a real app, these would be stored securely
const oauthProviders = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || "google-client-id",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "google-client-secret",
    redirectUri: process.env.OAUTH_REDIRECT_URI || "http://localhost:3000/api/auth/oauth/callback/google"
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID || "github-client-id",
    clientSecret: process.env.GITHUB_CLIENT_SECRET || "github-client-secret",
    redirectUri: process.env.OAUTH_REDIRECT_URI || "http://localhost:3000/api/auth/oauth/callback/github"
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: { provider: string } }
) {
  const provider = params.provider.toLowerCase();
  
  // Validate provider
  if (!["google", "github"].includes(provider)) {
    return NextResponse.json(
      { error: "Unsupported OAuth provider" },
      { status: 400 }
    );
  }

  try {
    // Get provider config
    const providerConfig = oauthProviders[provider as keyof typeof oauthProviders];
    
    // Generate a random state for security (prevents CSRF)
    const state = Math.random().toString(36).substring(2, 15);
    
    // Store state in a cookie for validation when the user returns
    const stateCookie = `oauth_state=${state}; Path=/; HttpOnly; SameSite=Lax; Max-Age=600`;
    
    // Construct OAuth authorization URL
    let authUrl = "";
    
    if (provider === "google") {
      authUrl = "https://accounts.google.com/o/oauth2/v2/auth";
      authUrl += `?client_id=${providerConfig.clientId}`;
      authUrl += `&redirect_uri=${encodeURIComponent(providerConfig.redirectUri)}`;
      authUrl += "&response_type=code";
      authUrl += "&scope=email profile";
      authUrl += `&state=${state}`;
    } else if (provider === "github") {
      authUrl = "https://github.com/login/oauth/authorize";
      authUrl += `?client_id=${providerConfig.clientId}`;
      authUrl += `&redirect_uri=${encodeURIComponent(providerConfig.redirectUri)}`;
      authUrl += `&state=${state}`;
      authUrl += "&scope=user:email";
    }

    // Return the authorization URL for the client to redirect to
    return NextResponse.json(
      { redirectUrl: authUrl },
      { 
        status: 200,
        headers: {
          "Set-Cookie": stateCookie
        }
      }
    );
  } catch (error) {
    console.error(`OAuth ${provider} error:`, error);
    return NextResponse.json(
      { error: "Failed to initialize OAuth flow" },
      { status: 500 }
    );
  }
} 