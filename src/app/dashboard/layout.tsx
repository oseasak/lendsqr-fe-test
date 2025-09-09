import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        {/* Sidebar (hidden on small screens; includes mobile header/drawer) */}
        <Sidebar />

        {/* Main content area; fill remaining space */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
