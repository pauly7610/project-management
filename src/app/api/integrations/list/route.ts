// GET /api/integrations/list - List available integrations with metadata
import { NextRequest } from "next/server";

const INTEGRATIONS = [
  { key: "github", name: "GitHub", category: "Source Control" },
  { key: "slack", name: "Slack", category: "Communication" },
  { key: "asana", name: "Asana", category: "Project Management" },
  { key: "monday", name: "Monday.com", category: "Project Management" },
  { key: "microsoft", name: "Microsoft Teams", category: "Communication" },
  { key: "jira", name: "Jira", category: "Project Management" },
  { key: "trello", name: "Trello", category: "Project Management" },
  { key: "clickup", name: "ClickUp", category: "Project Management" },
  { key: "notion", name: "Notion", category: "Docs/PM" },
  { key: "google_drive", name: "Google Drive", category: "Docs/Files" },
  { key: "dropbox", name: "Dropbox", category: "Docs/Files" },
  { key: "todoist", name: "Todoist", category: "Tasks" },
  { key: "zendesk", name: "Zendesk", category: "Support" },
  { key: "salesforce", name: "Salesforce", category: "CRM" },
  { key: "hubspot", name: "HubSpot", category: "CRM" },
  { key: "linear", name: "Linear", category: "Issue Tracking" },
  { key: "shortcut", name: "Shortcut", category: "Issue Tracking" },
  { key: "harvest", name: "Harvest", category: "Time Tracking" },
  { key: "clockify", name: "Clockify", category: "Time Tracking" },
  { key: "figma", name: "Figma", category: "Design" },
  { key: "calendly", name: "Calendly", category: "Scheduling" },
  { key: "google_calendar", name: "Google Calendar", category: "Scheduling" },
  { key: "outlook", name: "Outlook", category: "Scheduling" },
  { key: "confluence", name: "Confluence", category: "Docs" },
  { key: "bitbucket", name: "Bitbucket", category: "Source Control" },
  { key: "gitlab", name: "GitLab", category: "Source Control" },
  { key: "airtable", name: "Airtable", category: "Database/PM" },
  { key: "intercom", name: "Intercom", category: "Customer Success" },
  { key: "freshdesk", name: "Freshdesk", category: "Support" }
];

export async function GET(req: NextRequest) {
  return new Response(
    JSON.stringify({ integrations: INTEGRATIONS }),
    { status: 200 }
  );
}
