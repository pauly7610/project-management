export default function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Welcome to Motion Magic!</h1>
      <p className="text-gray-600">Let’s get your team set up and ready to collaborate.</p>
      <button className="btn btn-primary" onClick={onNext}>Get Started</button>
    </div>
  );
}
