import { useState } from "react";

function validateTeamName(name: string) {
  return name.trim().length >= 3;
}

export default function TeamSetupStep({ onNext }: { onNext: (teamId: string) => void }) {
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nameUnique, setNameUnique] = useState(true);
  const [checkingName, setCheckingName] = useState(false);

  async function checkTeamNameUnique(name: string) {
    if (!validateTeamName(name)) return;
    setCheckingName(true);
    try {
      const res = await fetch("/api/teams/check-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });
      const data = await res.json();
      setNameUnique(!data.exists);
    } catch {
      setNameUnique(true);
    } finally {
      setCheckingName(false);
    }
  }

  async function handleCreateTeam() {
    setLoading(true);
    setError("");
    try {
      if (!validateTeamName(teamName)) throw new Error("Team name must be at least 3 characters");
      if (!nameUnique) throw new Error("Team name is already taken");
      const res = await fetch("/api/teams/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: teamName, description })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create team");
      onNext(data.team._id);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleNameChange(val: string) {
    setTeamName(val);
    setError("");
    if (validateTeamName(val)) {
      checkTeamNameUnique(val);
    } else {
      setNameUnique(true);
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Team Setup</h2>
      <input
        className={`input input-bordered w-full ${!nameUnique ? 'border-red-500' : ''}`}
        placeholder="Team or Organization Name"
        value={teamName}
        onChange={e => handleNameChange(e.target.value)}
        onBlur={e => checkTeamNameUnique(e.target.value)}
      />
      {!nameUnique && <div className="text-red-500 text-sm">Team name is already taken</div>}
      <textarea
        className="textarea textarea-bordered w-full"
        placeholder="Short Description (optional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      {error && <div className="text-red-500">{error}</div>}
      <button
        className="btn btn-primary"
        onClick={handleCreateTeam}
        disabled={!validateTeamName(teamName) || !nameUnique || loading || checkingName}
      >
        {loading ? "Creating..." : checkingName ? "Checking name..." : "Continue"}
      </button>
    </div>
  );
}
