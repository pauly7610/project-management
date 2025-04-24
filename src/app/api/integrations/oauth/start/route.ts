// POST /api/integrations/oauth/start - Start OAuth flow for a tool
import { NextRequest } from "next/server";

const OAUTH_URLS: Record<string, (redirectUri: string) => string> = {
  github: (redirectUri) => `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user:email`,
  slack: (redirectUri) => `https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=users:read,channels:read,chat:write&redirect_uri=${encodeURIComponent(redirectUri)}`,
  asana: (redirectUri) => `https://app.asana.com/-/oauth_authorize?client_id=${process.env.ASANA_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`,
  monday: (redirectUri) => `https://auth.monday.com/oauth2/authorize?client_id=${process.env.MONDAY_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`,
  microsoft: (redirectUri) => `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${process.env.MS_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=User.Read`,
  jira: (redirectUri) => `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${process.env.JIRA_CLIENT_ID}&scope=read%3Ajira-user%20read%3Ajira-work&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`,
};

export async function POST(req: NextRequest) {
  const { provider, redirectUri } = await req.json();
  if (!provider || !redirectUri || !OAUTH_URLS[provider]) {
    return new Response(JSON.stringify({ message: "Invalid provider or redirectUri" }), { status: 400 });
  }
  const url = OAUTH_URLS[provider](redirectUri);
  return new Response(JSON.stringify({ url }), { status: 200 });
}
