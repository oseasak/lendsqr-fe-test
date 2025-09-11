"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  User,
  Shield,
  CreditCard,
  Cpu,
  PiggyBank,
  Package,
  Receipt,
  Activity,
  Hammer,
  FileText,
  Settings,
  LogOut,
  Menu,
  Building2,
  ClipboardList,
} from "lucide-react";
import Image from "next/image";
import styles from "../styles/Sidebar.module.scss";

type Item = {
  id: string;
  href: string;
  label: string;
  Icon: React.ComponentType<any>;
};

type Section = {
  id: string;
  title?: string;
  items: Item[];
};

const SECTIONS: Section[] = [
  {
    id: "general",
    items: [
      { id: "dashboard", href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
    ],
  },
  {
    id: "customers",
    title: "CUSTOMERS",
    items: [
      { id: "users", href: "/dashboard/users", label: "Users", Icon: Users },
      { id: "guarantors", href: "/dashboard/guarantors", label: "Guarantors", Icon: User },
      { id: "loans", href: "/dashboard/loans", label: "Loans", Icon: CreditCard },
      { id: "decision-models", href: "/dashboard/decision-models", label: "Decision Models", Icon: Cpu },
      { id: "savings", href: "/dashboard/savings", label: "Savings", Icon: PiggyBank },
      { id: "loan-requests", href: "/dashboard/loan-requests", label: "Loan Requests", Icon: ClipboardList },
      { id: "whitelist", href: "/dashboard/whitelist", label: "Whitelist", Icon: Shield },
      { id: "karma", href: "/dashboard/karma", label: "Karma", Icon: Shield },
    ],
  },
  {
    id: "businesses",
    title: "BUSINESSES",
    items: [
      { id: "organization", href: "/dashboard/organization", label: "Organization", Icon: Building2 },
      { id: "loan-products", href: "/dashboard/loan-products", label: "Loan Products", Icon: Package },
      { id: "savings-products", href: "/dashboard/savings-products", label: "Savings Products", Icon: PiggyBank },
      { id: "fees-charges", href: "/dashboard/fees-charges", label: "Fees and Charges", Icon: Receipt },
      { id: "transactions", href: "/dashboard/transactions", label: "Transactions", Icon: Activity },
      { id: "services", href: "/dashboard/services", label: "Services", Icon: Hammer },
      { id: "service-account", href: "/dashboard/service-account", label: "Service Account", Icon: User },
      { id: "settlements", href: "/dashboard/settlements", label: "Settlements", Icon: CreditCard },
      { id: "reports", href: "/dashboard/reports", label: "Reports", Icon: FileText },
    ],
  },
  {
    id: "settings",
    title: "SETTINGS",
    items: [
      { id: "preferences", href: "/dashboard/preferences", label: "Preferences", Icon: Settings },
      { id: "fees-pricing", href: "/dashboard/fees-pricing", label: "Fees and Pricing", Icon: Receipt },
      { id: "audit-logs", href: "/dashboard/audit-logs", label: "Audit Logs", Icon: FileText },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Persist collapsed state
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sidebar-collapsed");
      if (saved !== null) setCollapsed(saved === "true");
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("sidebar-collapsed", String(collapsed));
    } catch {
      /* noop */
    }
  }, [collapsed]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`${styles.sidebar} ${collapsed ? styles.collapsed : styles.expanded} ${styles.desktop}`}
        aria-label="Sidebar"
      >
        <div className={styles.header}>
          <button
            className={styles.toggle}
            onClick={() => setCollapsed((c) => !c)}
            aria-pressed={collapsed}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <Menu className={styles.icon} aria-hidden />
          </button>
        </div>

        <nav className={styles.nav} aria-label="Main navigation">
          {SECTIONS.map((section) => (
            <div key={section.id} className={styles.section}>
              {section.title && (
                <div className={`${styles.sectionTitle} ${collapsed ? styles.hiddenLabel : ""}`}>
                  {section.title}
                </div>
              )}

              <ul className={styles.list}>
                {section.items.map((it) => (
                  <li key={it.id}>
                    <Link href={it.href} className={styles.link}>
                      <span className={styles.iconWrap}>
                        <it.Icon className={styles.icon} aria-hidden />
                      </span>
                      <span className={`${styles.label} ${collapsed ? styles.hiddenLabel : ""}`}>
                        {it.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className={styles.footer}>
          <button className={styles.signOut}>
            <LogOut className={styles.icon} aria-hidden />
            <span className={`${styles.label} ${collapsed ? styles.hiddenLabel : ""}`}>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile header + drawer */}
      <div className={styles.mobile}>
        <div className={styles.mobileBar}>
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className={styles.mobileToggle}
          >
            <Menu className={styles.icon} aria-hidden />
          </button>
        </div>

        {mobileOpen && (
          <div className={styles.drawerOverlay} role="dialog" aria-modal="true">
            <div className={styles.backdrop} onClick={() => setMobileOpen(false)} />

            <aside className={styles.drawer}>
              <div className={styles.drawerHeader}>
                <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                  <Image src="/images/logo.png" alt="logo" width={140} height={28} />
                </Link>
                <button onClick={() => setMobileOpen(false)} className={styles.closeBtn} aria-label="Close menu">
                  ✕
                </button>
              </div>

              <nav className={styles.drawerNav}>
                {SECTIONS.map((section) => (
                  <div key={section.id} className={styles.section}>
                    {section.title && <div className={styles.sectionTitle}>{section.title}</div>}
                    <ul className={styles.list}>
                      {section.items.map((it) => (
                        <li key={it.id}>
                          <Link href={it.href} className={styles.drawerLink} onClick={() => setMobileOpen(false)}>
                            <it.Icon className={styles.icon} aria-hidden />
                            <span>{it.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <button className={styles.drawerSignOut} onClick={() => setMobileOpen(false)}>
                  <LogOut className={styles.icon} aria-hidden />
                  <span>Sign Out</span>
                </button>
              </nav>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
