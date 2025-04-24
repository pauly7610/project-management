import { useState } from "react";

function parseEmails(input: string): string[] {
  return input
    .split(/[\s,;]+/)
    .map(e => e.trim())
    .filter(Boolean);
}

function isValidEmail(email: string) {
  // RFC 5322 Official Standard regex (simplified for UX)
  return /^[\w.!#$%&'*+/=?^_`{|}~-]+@[\w-]+(\.[\w-]+)+$/.test(email);
}

export default function InviteStep({ onNext, teamId, userId }: { onNext: () => void, teamId: string, userId: string }) {
  const [emails, setEmails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [invalids, setInvalids] = useState<string[]>([]);
  const [duplicates, setDuplicates] = useState<string[]>([]);

  function validateEmails(input: string) {
    const parsed = parseEmails(input);
    const seen = new Set<string>();
    const dups: string[] = [];
    const invalid: string[] = [];
    for (const e of parsed) {
      if (!isValidEmail(e)) invalid.push(e);
      if (seen.has(e)) dups.push(e);
      seen.add(e);
    }
    setInvalids(invalid);
    setDuplicates(dups);
    return invalid.length === 0 && dups.length === 0 && parsed.length > 0;
  }

  async function handleInvite() {
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      if (!validateEmails(emails)) throw new Error("Please fix invalid or duplicate emails.");
      const res = await fetch("/api/teams/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId, emails, invitedBy: userId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send invites");
      setSuccess(true);
      onNext();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleEmailsChange(val: string) {
    setEmails(val);
    validateEmails(val);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Invite Team Members</h2>
      <textarea
        className="textarea textarea-bordered w-full"
        placeholder="Enter emails separated by commas or new lines"
        value={emails}
        onChange={e => handleEmailsChange(e.target.value)}
      />
      {invalids.length > 0 && <div className="text-red-500 text-sm">Invalid: {invalids.join(", ")}</div>}
      {duplicates.length > 0 && <div className="text-red-500 text-sm">Duplicates: {duplicates.join(", ")}</div>}
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">Invites sent!</div>}
      <button
        className="btn btn-primary"
        onClick={handleInvite}
        disabled={loading || !emails.trim() || invalids.length > 0 || duplicates.length > 0}
      >
        {loading ? "Sending..." : "Send Invites & Continue"}
      </button>
    </div>
  );
}
