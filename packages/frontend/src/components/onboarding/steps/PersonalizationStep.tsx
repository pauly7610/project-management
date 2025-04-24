import { useState } from "react";

export default function PersonalizationStep({ onNext }: { onNext: () => void }) {
  const [displayName, setDisplayName] = useState("");
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Personalize Your Profile</h2>
      <input
        className="input input-bordered w-full"
        placeholder="Display Name"
        value={displayName}
        onChange={e => setDisplayName(e.target.value)}
      />
      <button className="btn btn-primary" onClick={onNext}>Continue</button>
    </div>
  );
}
