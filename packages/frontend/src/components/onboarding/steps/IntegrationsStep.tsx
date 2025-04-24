import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaGithub, FaSlack, FaTrello, FaBitbucket, FaGitlab, FaFigma, FaRegClock, FaRegFileAlt, FaRegCheckCircle, FaRegListAlt, FaRegUserCircle, FaRegComments, FaRegChartBar, FaRegBell, FaRegFolderOpen, FaRegClipboard, FaRegEdit, FaRegCalendar, FaRegEnvelope, FaRegQuestionCircle } from "react-icons/fa";
import { SiAsana, SiJira, SiGoogledrive, SiDropbox, SiNotion, SiHubspot, SiSalesforce } from "react-icons/si";

const PROVIDERS = [
  { key: "github", label: "GitHub", icon: FaGithub },
  { key: "slack", label: "Slack", icon: FaSlack },
  { key: "asana", label: "Asana", icon: SiAsana },
  { key: "monday", label: "Monday.com", icon: FaRegListAlt },
  // If TeamsLogo24Filled is available, import it. Otherwise, use a fallback below.
  // import { TeamsLogo24Filled } from "@fluentui/react-icons";
  // Uncomment the next line if TeamsLogo24Filled is available:
  // { key: "microsoft", label: "Microsoft Teams", icon: TeamsLogo24Filled },
  // If not available, use a fallback icon, e.g. FaRegQuestionCircle:
  { key: "microsoft", label: "Microsoft Teams", icon: FaRegQuestionCircle },
  { key: "jira", label: "Jira", icon: SiJira },
  { key: "trello", label: "Trello", icon: FaTrello },
  { key: "clickup", label: "ClickUp", icon: FaRegCheckCircle },
  { key: "notion", label: "Notion", icon: SiNotion },
  { key: "google_drive", label: "Google Drive", icon: SiGoogledrive },
  { key: "dropbox", label: "Dropbox", icon: SiDropbox },
  { key: "todoist", label: "Todoist", icon: FaRegClipboard },
  { key: "zendesk", label: "Zendesk", icon: FaRegComments },
  { key: "salesforce", label: "Salesforce", icon: SiSalesforce },
  { key: "hubspot", label: "HubSpot", icon: SiHubspot },
  { key: "linear", label: "Linear", icon: FaRegChartBar },
  { key: "shortcut", label: "Shortcut", icon: FaRegEdit },
  { key: "harvest", label: "Harvest", icon: FaRegClock },
  { key: "clockify", label: "Clockify", icon: FaRegClock },
  { key: "figma", label: "Figma", icon: FaFigma },
  { key: "calendly", label: "Calendly", icon: FaRegCalendar },
  { key: "google_calendar", label: "Google Calendar", icon: FaRegCalendar },
  { key: "outlook", label: "Outlook", icon: FaRegEnvelope },
  { key: "confluence", label: "Confluence", icon: FaRegFileAlt },
  { key: "bitbucket", label: "Bitbucket", icon: FaBitbucket },
  { key: "gitlab", label: "GitLab", icon: FaGitlab },
  { key: "airtable", label: "Airtable", icon: FaRegFolderOpen },
  { key: "intercom", label: "Intercom", icon: FaRegUserCircle },
  { key: "freshdesk", label: "Freshdesk", icon: FaRegBell },
];

export default function IntegrationsStep({ onNext, userId }: { onNext: () => void, userId: string }) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [connected, setConnected] = useState<Record<string, boolean>>({});
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const router = useRouter();

  async function handleConnect(provider: string) {
    setLoadingProvider(provider);
    setError("");
    try {
      const redirectUri = `${window.location.origin}/onboarding?provider=${provider}&cb=1`;
      const res = await fetch("/api/integrations/oauth/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, redirectUri })
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.message || "Failed to start OAuth");
      localStorage.setItem("integration_oauth", JSON.stringify({ provider, userId }));
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingProvider(null);
    }
  }

  // Handle OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const provider = params.get("provider");
    const cb = params.get("cb");
    if (code && provider && cb) {
      const oauthState = localStorage.getItem("integration_oauth");
      if (!oauthState) return;
      const { userId: cbUserId } = JSON.parse(oauthState);
      setLoadingProvider(provider);
      fetch("/api/integrations/oauth/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, code, userId: cbUserId, redirectUri: window.location.origin + "/onboarding?provider=" + provider + "&cb=1" })
      })
        .then(r => r.json().then(data => ({ ok: r.ok, data })))
        .then(({ ok, data }) => {
          if (!ok) throw new Error(data.message || "Failed to connect");
          setConnected(prev => ({ ...prev, [provider]: true }));
          setError("");
        })
        .catch(e => setError(e.message))
        .finally(() => {
          setLoadingProvider(null);
          router.replace("/onboarding");
        });
    }
  }, [router]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Connect Tools</h2>
      <p className="text-gray-600">Integrate with your favorite tools to supercharge your workflow.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {PROVIDERS.map(({ key, label, icon: Icon }) => (
          <div key={key} className="relative group">
            <button
              className={`btn btn-outline w-full flex items-center gap-2 ${connected[key] ? "btn-success" : ""}`}
              onClick={() => handleConnect(key)}
              disabled={!!connected[key] || loadingProvider === key}
              onMouseEnter={() => setShowTooltip(key)}
              onMouseLeave={() => setShowTooltip(null)}
            >
              <Icon size={20} />
              <span>{loadingProvider === key ? `Connecting...` : connected[key] ? `${label} Connected` : `Connect ${label}`}</span>
            </button>
            {showTooltip === key && (
              <div className="absolute left-1/2 -translate-x-1/2 top-12 bg-gray-900 text-white text-xs rounded px-2 py-1 shadow-lg z-10 animate-fade-in">
                Connect your {label} account
              </div>
            )}
          </div>
        ))}
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <button className="btn btn-primary mt-4" onClick={onNext}>Continue</button>
    </div>
  );
}