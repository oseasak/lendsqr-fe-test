// app/dashboard/page.tsx
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-3 text-sm sm:text-base text-gray-600">
          Welcome — you have been routed here after login.
        </p>

        <div className="mt-6">
          <Link
            href="/"
            className="text-teal-600 font-semibold hover:text-teal-700 transition-colors"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}
