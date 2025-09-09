import "@/styles/tailwind.css";   // must contain only @tailwind directives
import "@/app/globals.css";       // your variables / @layer base etc
import "@/styles/globals.scss";   // optional SCSS overrides
import { Navbar } from "@/components/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-800">
        {children}
      </main>
    </div>
  );
}
