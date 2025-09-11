"use client";

import React, { useEffect, useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Star } from "lucide-react";
import styles from "./UserDetails.module.scss";

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
      const stored =
        typeof window !== "undefined" ? localStorage.getItem(`user-${id}`) : null;
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
          durationOfEmployment:
            parsed.durationOfEmployment ?? "2 years",
          officeEmail: parsed.officeEmail ?? "grace@lendsqr.com",
          monthlyIncome:
            parsed.monthlyIncome ?? "₦200,000 - ₦400,000",
          loanRepayment: parsed.loanRepayment ?? "40,000",
          socials:
            parsed.socials ?? {
              twitter: "@grace_effiom",
              facebook: "Grace Effiom",
              instagram: "@grace_effiom",
            },
          guarantors:
            parsed.guarantors ?? [
              {
                fullName: "Debby Ogana",
                phone: "07060780922",
                email: "debby@gmail.com",
                relationship: "Sister",
              },
              {
                fullName: "Debby Ogana",
                phone: "07060780922",
                email: "debby@gmail.com",
                relationship: "Sister",
              },
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
          socials: {
            twitter: "@grace_effiom",
            facebook: "Grace Effiom",
            instagram: "@grace_effiom",
          },
          guarantors: [
            {
              fullName: "Debby Ogana",
              phone: "07060780922",
              email: "debby@gmail.com",
              relationship: "Sister",
            },
            {
              fullName: "Debby Ogana",
              phone: "07060780922",
              email: "debby@gmail.com",
              relationship: "Sister",
            },
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
    if (status === "active")
      return styles.badgeActive;
    if (status === "inactive")
      return styles.badgeInactive;
    if (status === "pending")
      return styles.badgePending;
    return styles.badgeDefault;
  };

  const handleBlacklist = () => {
    if (!user) return;
    const next = { ...user, status: "inactive" };
    setUser(next);
    try {
      localStorage.setItem(`user-${id}`, JSON.stringify(next));
    } catch {}
  };

  const handleActivate = () => {
    if (!user) return;
    const next = { ...user, status: "active" };
    setUser(next);
    try {
      localStorage.setItem(`user-${id}`, JSON.stringify(next));
    } catch {}
  };

  // ---- NEW: smarter back handler that doesn't reload users page ----
  const handleBack = () => {
    if (typeof window !== "undefined") {
      const sameOriginRef =
        document.referrer && document.referrer.startsWith(window.location.origin);
      if (window.history.length > 1 && sameOriginRef) {
        router.back();
        return;
      }
    }
    router.replace("/dashboard/users");
  };

  if (loading) {
    return (
      <div className={styles.spinnerWrap}>
        <svg className={styles.spinner} viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeOpacity="0.15"
            strokeWidth="4"
          />
          <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.centerError}>User not found</div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Back link uses handleBack (no reload; tries history.back first) */}
      <button
        onClick={handleBack}
        className={styles.backBtn}
        aria-label="Back to previous page"
      >
        <ChevronLeft className={styles.backIcon} /> Back to Users
      </button>

      {/* Page header + actions */}
      <div className={styles.header}>
        <h1 className={styles.title}>User Details</h1>

        <div className={styles.actions}>
          <button
            onClick={handleBlacklist}
            className={`${styles.btn} ${styles.btnOutlineDanger}`}
            title="Blacklist user"
          >
            BLACKLIST USER
          </button>

          <button
            onClick={handleActivate}
            className={`${styles.btn} ${styles.btnOutlineTeal}`}
            title="Activate user"
          >
            ACTIVATE USER
          </button>
        </div>
      </div>

      {/* Profile card (rest of layout unchanged) */}
      <div className={styles.panelShell}>
        <div className={styles.panelInner}>
          <ProfileCard
            user={user}
            balance="₦200,000.00"
            bankInfo="08123456789 / Providus Bank"
            tier={2}
          />

          <div className={styles.tabsWrap}>
            <nav className={styles.tabNav}>
              <Tab label="General Details" id="general" active={activeTab === "general"} onClick={() => setActiveTab("general")} />
              <Tab label="Documents" id="documents" active={activeTab === "documents"} onClick={() => setActiveTab("documents")} />
              <Tab label="Bank Details" id="bank" active={activeTab === "bank"} onClick={() => setActiveTab("bank")} />
              <Tab label="Loans" id="loans" active={activeTab === "loans"} onClick={() => setActiveTab("loans")} />
              <Tab label="Savings" id="savings" active={activeTab === "savings"} onClick={() => setActiveTab("savings")} />
              <Tab label="App and System" id="app" active={activeTab === "app"} onClick={() => setActiveTab("app")} />
            </nav>
          </div>
        </div>

        <div className={styles.panelInner}>
          {activeTab === "general" ? (
            <section className={styles.sectionStack}>
              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <h3 className={styles.panelTitle}>Personal Information</h3>
                </div>
                <div className={styles.panelContent}>
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

              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <h3 className={styles.panelTitle}>Education and Employment</h3>
                </div>
                <div className={styles.panelContent}>
                  <Field label="LEVEL OF EDUCATION" value={user.educationLevel} />
                  <Field label="EMPLOYMENT STATUS" value={user.employmentStatus} />
                  <Field label="SECTOR OF EMPLOYMENT" value={user.sector} />
                  <Field label="DURATION OF EMPLOYMENT" value={user.durationOfEmployment} />
                  <Field label="OFFICE EMAIL" value={user.officeEmail} />
                  <Field label="MONTHLY INCOME" value={user.monthlyIncome} />
                  <Field label="LOAN REPAYMENT" value={user.loanRepayment} />
                </div>
              </div>

              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <h3 className={styles.panelTitle}>Socials</h3>
                </div>
                <div className={styles.panelContentThree}>
                  <Field label="TWITTER" value={user.socials?.twitter} />
                  <Field label="FACEBOOK" value={user.socials?.facebook} />
                  <Field label="INSTAGRAM" value={user.socials?.instagram} />
                </div>
              </div>

              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <h3 className={styles.panelTitle}>Guarantor</h3>
                </div>
                <div className={styles.panelBody}>
                  {user.guarantors?.map((g, i) => (
                    <div key={i} className={styles.guarantorGrid}>
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
            <div className={styles.notImplemented}>
              Content for "{activeTab}" is not implemented in this demo.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* helper components */

function Tab({
  label,
  id,
  active,
  onClick,
}: {
  label: string;
  id: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`${styles.tab} ${active ? styles.tabActive : ""}`}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </button>
  );
}

function Field({ label, value }: { label: string; value?: React.ReactNode }) {
  return (
    <div className={styles.field}>
      <div className={styles.fieldLabel}>{label}</div>
      <div className={styles.fieldValue}>{value ?? "—"}</div>
    </div>
  );
}
