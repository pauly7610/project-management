import { useAuth } from "../../hooks/useAuth";

export default function DashboardPage() {
  const { loading, authenticated } = useAuth();

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!authenticated) return null;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to your protected dashboard!</p>
    </div>
  );
}
