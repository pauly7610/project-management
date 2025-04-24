"use client";
import { useState, useEffect } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import WelcomeStep from "./steps/WelcomeStep";
import TeamSetupStep from "./steps/TeamSetupStep";
import InviteStep from "./steps/InviteStep";
import IntegrationsStep from "./steps/IntegrationsStep";
import PersonalizationStep from "./steps/PersonalizationStep";
import SummaryStep from "./steps/SummaryStep";
import { trackEvent } from "../../lib/analytics";

const STEP_LABELS = [
  "Welcome",
  "Team Setup",
  "Invite Members",
  "Integrations",
  "Personalization",
  "Summary"
];

export default function OnboardingWizard() {
  const { user, loading } = useCurrentUser();
  const [step, setStep] = useState(0);
  const [teamId, setTeamId] = useState<string | null>(null);

  // Track step changes in analytics
  useEffect(() => {
    trackEvent("onboarding_step_view", { step: STEP_LABELS[step], stepIndex: step });
    // Optionally: track onboarding completion
    if (step === STEP_LABELS.length - 1) {
      trackEvent("onboarding_completed", { userId: user?.id, teamId });
    }
  }, [step, user?.id, teamId]);

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!user) return <div className="text-center py-12 text-red-500">You must be signed in to onboard.</div>;

  const steps = [
    (props: any) => <WelcomeStep {...props} onNext={() => setStep(1)} />,
    (props: any) => (
      <TeamSetupStep
        {...props}
        userId={user.id}
        onNext={(createdTeamId: string) => {
          setTeamId(createdTeamId);
          setStep(2);
        }}
      />
    ),
    (props: any) => (
      <InviteStep
        {...props}
        teamId={teamId || ""}
        userId={user.id}
        onNext={() => setStep(3)}
      />
    ),
    (props: any) => (
      <IntegrationsStep
        {...props}
        userId={user.id}
        onNext={() => setStep(4)}
      />
    ),
    (props: any) => <PersonalizationStep {...props} onNext={() => setStep(5)} />,
    (props: any) => <SummaryStep {...props} />,
  ];

  const StepComponent = steps[step];

  return (
    <div className="max-w-2xl mx-auto p-8">
      {/* Stepper/Progress Bar */}
      <div className="flex items-center mb-8">
        {STEP_LABELS.map((label, idx) => (
          <div key={label} className="flex items-center w-full">
            <div
              className={`rounded-full w-8 h-8 flex items-center justify-center font-bold text-white ${
                idx < step
                  ? "bg-green-500"
                  : idx === step
                  ? "bg-blue-600"
                  : "bg-gray-300"
              }`}
            >
              {idx + 1}
            </div>
            {idx < STEP_LABELS.length - 1 && (
              <div
                className={`flex-1 h-1 mx-1 ${idx < step ? "bg-green-500" : "bg-gray-300"}`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mb-6 flex justify-between items-center">
        <div className="text-lg font-semibold">Onboarding ({step + 1} / {steps.length})</div>
        <div>
          {step > 0 && <button onClick={() => setStep(step - 1)} className="mr-2">Back</button>}
          {step < steps.length - 1 && <button onClick={() => setStep(step + 1)}>Next</button>}
        </div>
      </div>
      <StepComponent />
    </div>
  );
}
