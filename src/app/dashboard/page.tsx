// app/dashboard/page.tsx
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 900, textAlign: 'center' }}>
        <h1>Dashboard</h1>
        <p>Welcome — you have been routed here after login.</p>

        <div style={{ marginTop: 28 }}>
          <Link href="/" style={{ color: '#2ac7bf', fontWeight: 700 }}>
            ← Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}