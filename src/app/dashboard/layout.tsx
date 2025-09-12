"use client";
import { useState } from "react";
import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* mobile hamburger -> toggles sidebarOpen */}
      <Navbar
        onToggleSidebar={() => setSidebarOpen((s) => !s)}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        collapsed={collapsed}
      />

      <div className="flex">
        {/* Sidebar controlled by parent */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} collapsed={collapsed} />

        {/* Main content area */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
