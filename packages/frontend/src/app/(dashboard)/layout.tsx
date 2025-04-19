"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Toaster } from "sonner";
import { QuickTaskModal } from "@/components/quick-task-modal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-background">
          <div className="p-4">{children}</div>
        </main>
      </div>
      <Toaster position="top-right" />
      <QuickTaskModal />
    </div>
  );
} 