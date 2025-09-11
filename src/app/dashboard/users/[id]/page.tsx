// src/app/dashboard/users/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Star } from "lucide-react";

type StoredUser = {
  id?: number | string;
  organization?: string;
  username?: string;
  email?: string;
  phone?: string;
  date_joined?: string;
  status?: "active" | "inactive" | "pending" | string;
  fullName?: string;
  bvn?: string;
  gender?: string;
  maritalStatus?: string;
  children?: string;
  residenceType?: string;
  educationLevel?: string;
  employmentStatus?: string;
  sector?: string;
  durationOfEmployment?: string;
  officeEmail?: string;
  monthlyIncome?: string;
  loanRepayment?: string;
  socials?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  guarantors?: Array<{
    fullName?: string;
    phone?: string;
    email?: string;
    relationship?: string;
  }>;
};

export default function UserDetails() {
  const params = useParams();
  const router = useRouter();
  const id = (params as any)?.id?.toString?.() ?? "unknown";

  const [user, setUser] = useState<StoredUser | null>(null);
  const [activeTab, setActiveTab] = useState<string>("general");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem(`user-${id}`) : null;
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser({
          id: parsed.id ?? id,
          organization: parsed.organization ?? "Lendsqr",
          username: parsed.username ?? parsed.fullName ?? "Grace Effiom",
          email: parsed.email ?? "grace@example.com",
          phone: parsed.phone ?? "07060780922",
          date_joined: parsed.date_joined ?? "2019-08-12",
          status: parsed.status ?? "active",
          fullName: parsed.fullName ?? parsed.username ?? "Grace Effiom",
          bvn: parsed.bvn ?? "07060780922",
          gender: parsed.gender ?? "Female",
          maritalStatus: parsed.maritalStatus ?? "Single",
          children: parsed.children ?? "None",
          residenceType: parsed.residenceType ?? "Parent's Apartment",
          educationLevel: parsed.educationLevel ?? "B.Sc",
          employmentStatus: parsed.employmentStatus ?? "Employed",
          sector: parsed.sector ?? "FinTech",
          durationOfEmployment: parsed.durationOfEmployment ?? "2 years",
          officeEmail: parsed.officeEmail ?? "grace@lendsqr.com",
          monthlyIncome: parsed.monthlyIncome ?? "₦200,000 - ₦400,000",
          loanRepayment: parsed.loanRepayment ?? "40,000",
          socials: parsed.socials ?? { twitter: "@grace_effiom", facebook: "Grace Effiom", instagram: "@grace_effiom" },
          guarantors: parsed.guarantors ?? [
            { fullName: "Debby Ogana", phone: "07060780922", email: "debby@gmail.com", relationship: "Sister" },
            { fullName: "Debby Ogana", phone: "07060780922", email: "debby@gmail.com", relationship: "Sister" },
          ],
        } as StoredUser);
      } else {
        setUser({
          id,
          organization: "Lendsqr",
          username: "Grace Effiom",
          fullName: "Grace Effiom",
          email: "grace@lendsqr.com",
          phone: "07060780922",
          date_joined: "2019-05-14",
          status: "active",
          bvn: "07060780922",
          gender: "Female",
          maritalStatus: "Single",
          children: "None",
          residenceType: "Parent's Apartment",
          educationLevel: "B.Sc",
          employmentStatus: "Employed",
          sector: "FinTech",
          durationOfEmployment: "2 years",
          officeEmail: "grace@lendsqr.com",
          monthlyIncome: "₦200,000 - ₦400,000",
          loanRepayment: "40,000",
          socials: { twitter: "@grace_effiom", facebook: "Grace Effiom", instagram: "@grace_effiom" },
          guarantors: [
            { fullName: "Debby Ogana", phone: "07060780922", email: "debby@gmail.com", relationship: "Sister" },
            { fullName: "Debby Ogana", phone: "07060780922", email: "debby@gmail.com", relationship: "Sister" },
          ],
        });
      }
    } catch (err) {
      console.error(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const statusBadge = (status?: string) => {
    if (status === "active") return "px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800";
    if (status === "inactive") return "px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800";
    if (status === "pending") return "px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800";
    return "px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700";
  };

  const handleBlacklist = () => {
    if (!user) return;
    const next = { ...user, status: "inactive" };
    setUser(next);
    try { localStorage.setItem(`user-${id}`, JSON.stringify(next)); } catch { }
  };

  const handleActivate = () => {
    if (!user) return;
    const next = { ...user, status: "active" };
    setUser(next);
    try { localStorage.setItem(`user-${id}`, JSON.stringify(next)); } catch { }
  };

  // ---- NEW: smarter back handler that doesn't reload users page ----
  const handleBack = () => {
    // prefer going back in history (preserves previous page state & scroll)
    if (typeof window !== "undefined") {
      const sameOriginRef = document.referrer && document.referrer.startsWith(window.location.origin);
      // history.length > 1 and same-origin referrer -> safe to go back
      if (window.history.length > 1 && sameOriginRef) {
        router.back();
        return;
      }
    }
    // fallback: client-side navigation to users list (replace so no extra entry)
    router.replace("/dashboard/users");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <svg className="animate-spin h-8 w-8 text-teal-500" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.15" strokeWidth="4" />
          <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-red-500">
        User not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Back link uses handleBack (no reload; tries history.back first) */}
      <button
        onClick={handleBack}
        className="flex items-center text-sm text-slate-600 hover:text-teal-500 mb-4"
        aria-label="Back to previous page"
      >
        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Users
      </button>

      {/* Page header + actions */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <h1 className="text-lg sm:text-xl font-semibold text-slate-800">User Details</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={handleBlacklist}
            className="rounded-md px-3 py-1.5 text-sm font-medium border border-rose-300 text-rose-600 hover:bg-rose-50"
            title="Blacklist user"
          >
            BLACKLIST USER
          </button>

          <button
            onClick={handleActivate}
            className="rounded-md px-3 py-1.5 text-sm font-medium border border-teal-300 text-teal-600 hover:bg-teal-50"
            title="Activate user"
          >
            ACTIVATE USER
          </button>
        </div>
      </div>

      {/* Profile card (rest of layout unchanged) */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="px-6 py-6">
          <ProfileCard
            user={user}
            balance="₦200,000.00"
            bankInfo="08123456789 / Providus Bank"
            tier={2}
          />
          <div className="mt-6 border-b">
            <nav className="flex gap-6 -mb-px">
              <Tab label="General Details" id="general" active={activeTab === "general"} onClick={() => setActiveTab("general")} />
              <Tab label="Documents" id="documents" active={activeTab === "documents"} onClick={() => setActiveTab("documents")} />
              <Tab label="Bank Details" id="bank" active={activeTab === "bank"} onClick={() => setActiveTab("bank")} />
              <Tab label="Loans" id="loans" active={activeTab === "loans"} onClick={() => setActiveTab("loans")} />
              <Tab label="Savings" id="savings" active={activeTab === "savings"} onClick={() => setActiveTab("savings")} />
              <Tab label="App and System" id="app" active={activeTab === "app"} onClick={() => setActiveTab("app")} />
            </nav>
          </div>
        </div>

        <div className="px-6 py-6">
          {activeTab === "general" ? (
            <section className="space-y-6">
              <div className="bg-white rounded border">
                <div className="px-6 py-4 border-b">
                  <h3 className="text-sm font-medium text-slate-800">Personal Information</h3>
                </div>
                <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-sm text-slate-600">
                  <Field label="FULL NAME" value={user.fullName ?? user.username} />
                  <Field label="PHONE NUMBER" value={user.phone} />
                  <Field label="EMAIL ADDRESS" value={user.email} />
                  <Field label="BVN" value={user.bvn} />
                  <Field label="GENDER" value={user.gender} />
                  <Field label="MARITAL STATUS" value={user.maritalStatus} />
                  <Field label="CHILDREN" value={user.children} />
                  <Field label="TYPE OF RESIDENCE" value={user.residenceType} />
                </div>
              </div>

              <div className="bg-white rounded border">
                <div className="px-6 py-4 border-b">
                  <h3 className="text-sm font-medium text-slate-800">Education and Employment</h3>
                </div>
                <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-sm text-slate-600">
                  <Field label="LEVEL OF EDUCATION" value={user.educationLevel} />
                  <Field label="EMPLOYMENT STATUS" value={user.employmentStatus} />
                  <Field label="SECTOR OF EMPLOYMENT" value={user.sector} />
                  <Field label="DURATION OF EMPLOYMENT" value={user.durationOfEmployment} />
                  <Field label="OFFICE EMAIL" value={user.officeEmail} />
                  <Field label="MONTHLY INCOME" value={user.monthlyIncome} />
                  <Field label="LOAN REPAYMENT" value={user.loanRepayment} />
                </div>
              </div>

              <div className="bg-white rounded border">
                <div className="px-6 py-4 border-b">
                  <h3 className="text-sm font-medium text-slate-800">Socials</h3>
                </div>
                <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 text-sm text-slate-600">
                  <Field label="TWITTER" value={user.socials?.twitter} />
                  <Field label="FACEBOOK" value={user.socials?.facebook} />
                  <Field label="INSTAGRAM" value={user.socials?.instagram} />
                </div>
              </div>

              <div className="bg-white rounded border">
                <div className="px-6 py-4 border-b">
                  <h3 className="text-sm font-medium text-slate-800">Guarantor</h3>
                </div>
                <div className="px-6 py-5 space-y-4">
                  {user.guarantors?.map((g, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-slate-600">
                      <Field label="FULL NAME" value={g.fullName} />
                      <Field label="PHONE NUMBER" value={g.phone} />
                      <Field label="EMAIL ADDRESS" value={g.email} />
                      <Field label="RELATIONSHIP" value={g.relationship} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <div className="py-12 text-center text-slate-500">Content for "{activeTab}" is not implemented in this demo.</div>
          )}
        </div>
      </div>
    </div>
  );
}

/* helper components */

function Tab({ label, id, active, onClick }: { label: string; id: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`py-3 text-sm ${active ? "border-b-2 border-teal-500 text-slate-800" : "text-slate-500 hover:text-slate-700"}`}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </button>
  );
}

function Field({ label, value }: { label: string; value?: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs text-slate-400 mb-1">{label}</div>
      <div className="text-sm text-slate-800 font-medium">{value ?? "—"}</div>
    </div>
  );
}
