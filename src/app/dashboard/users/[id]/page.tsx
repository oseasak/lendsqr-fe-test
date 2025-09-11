"use client";

import React, { useEffect, useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
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

const TABS: { id: string; label: string }[] = [
  { id: "general", label: "General Details" },
  { id: "documents", label: "Documents" },
  { id: "bank", label: "Bank Details" },
  { id: "loans", label: "Loans" },
  { id: "savings", label: "Savings" },
  { id: "app", label: "App and System" },
];

export default function UserDetails() {
  const params = useParams() as { id?: string | string[] | undefined };
  const router = useRouter();

  const id = (() => {
    const raw = params?.id;
    if (!raw) return "unknown";
    return Array.isArray(raw) ? raw[0] : raw;
  })();

  const [user, setUser] = useState<StoredUser | null>(null);
  const [activeTab, setActiveTab] = useState<string>("general");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      const stored =
        typeof window !== "undefined" ? localStorage.getItem(`user-${id}`) : null;
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<StoredUser>;
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
        });
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
      console.warn("Failed to load stored user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const getStatusBadgeClass = (status?: StoredUser["status"]) => {
    if (status === "active") return styles.badgeActive;
    if (status === "inactive") return styles.badgeInactive;
    if (status === "pending") return styles.badgePending;
    return styles.badgeDefault;
  };

  const handleBlacklist = () => {
    if (!user) return;
    const next = { ...user, status: "inactive" as const };
    setUser(next);
    try {
      localStorage.setItem(`user-${id}`, JSON.stringify(next));
    } catch (err) {
      console.warn("Failed to persist user to localStorage:", err);
    }
  };

  const handleActivate = () => {
    if (!user) return;
    const next = { ...user, status: "active" as const };
    setUser(next);
    try {
      localStorage.setItem(`user-${id}`, JSON.stringify(next));
    } catch (err) {
      console.warn("Failed to persist user to localStorage:", err);
    }
  };

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
          <path
            d="M22 12a10 10 0 0 1-10 10"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  if (!user) {
    return <div className={styles.centerError}>User not found</div>;
  }

  return (
    <div className={styles.page}>
      <button
        onClick={handleBack}
        className={styles.backBtn}
        aria-label="Back to previous page"
      >
        {/* ✅ added fill="currentColor" */}
        <ChevronLeft className={styles.backIcon} fill="currentColor" /> Back to Users
      </button>

      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>User Details</h1>
          <span className={`${styles.status} ${getStatusBadgeClass(user.status)}`}>
            {String(user.status ?? "unknown").toUpperCase()}
          </span>
        </div>

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

      <div className={styles.panelShell}>
        <div className={styles.panelInner}>
          <ProfileCard
            user={user}
            balance="₦200,000.00"
            bankInfo="08123456789 / Providus Bank"
            tier={2}
          />

          <div className={styles.tabsWrap}>
            <label className={styles.tabSelectLabel} htmlFor="section-select" aria-hidden>
              Section
            </label>
            <select
              id="section-select"
              aria-label="Select section"
              className={styles.tabSelect}
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              {TABS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>

            <nav className={styles.tabNav} role="tablist" aria-label="User detail sections">
              {TABS.map((t) => (
                <Tab
                  key={t.id}
                  label={t.label}
                  id={t.id}
                  active={activeTab === t.id}
                  onClick={() => setActiveTab(t.id)}
                />
              ))}
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
              Content for &quot;{activeTab}&quot; is not implemented in this demo.
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
      type="button" // ✅ prevent accidental form submit
      onClick={onClick}
      className={`${styles.tab} ${active ? styles.tabActive : ""}`}
      aria-current={active ? "page" : undefined}
      role="tab"
      aria-selected={active ? "true" : "false"}
      id={`tab-${id}`}
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
