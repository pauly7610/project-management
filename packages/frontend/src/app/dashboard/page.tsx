// Dashboard page
// (This is the canonical dashboard page. The duplicate in (dashboard)/dashboard/page.tsx is disabled.)

"use client";

import { useAuth } from "../../hooks/useAuth";

// Add your dashboard page implementation here.

export default function DashboardPage() {
  const { loading, authenticated } = useAuth();

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!authenticated) return null;

  return (
    <div>Dashboard</div>
  );
}
