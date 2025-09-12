"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  Home,
  Users,
  Shield,
  PiggyBank,
  Eye,
  Coins,
  ClipboardList,
  UserCheck,
  UserX,
  Building2,
  HandCoins,
  Receipt,
  Settings,
  UserCog,
  ArrowRightLeft,
  BarChart3,
  Sliders,
  BadgePercent,
  ClipboardCheck,
  ChevronDown,
  LogOut,
} from "lucide-react";
import styles from "../styles/Sidebar.module.scss";

type Item = {
  id: string;
  href: string;
  label: string;
  Icon: any;
  dropdown?: boolean;
  active?: boolean;
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
      { id: "switch-organization", href: "#", label: "Switch Organization", Icon: Briefcase, dropdown: true },
      { id: "dashboard", href: "/dashboard", label: "Dashboard", Icon: Home },
    ],
  },
  {
    id: "customers",
    title: "CUSTOMERS",
    items: [
      { id: "users", href: "/dashboard/users", label: "Users", Icon: Users, active: true },
      { id: "guarantors", href: "/dashboard/guarantors", label: "Guarantors", Icon: Shield },
      { id: "loans", href: "/dashboard/loans", label: "Loans", Icon: PiggyBank },
      { id: "decision-models", href: "/dashboard/decision-models", label: "Decision Models", Icon: Eye },
      { id: "savings", href: "/dashboard/savings", label: "Savings", Icon: Coins },
      { id: "loan-requests", href: "/dashboard/loan-requests", label: "Loan Requests", Icon: ClipboardList },
      { id: "whitelist", href: "/dashboard/whitelist", label: "Whitelist", Icon: UserCheck },
      { id: "karma", href: "/dashboard/karma", label: "Karma", Icon: UserX },
    ],
  },
  {
    id: "businesses",
    title: "BUSINESSES",
    items: [
      { id: "organization", href: "/dashboard/organization", label: "Organization", Icon: Building2 },
      { id: "loan-products", href: "/dashboard/loan-products", label: "Loan Products", Icon: HandCoins },
      { id: "savings-products", href: "/dashboard/savings-products", label: "Savings Products", Icon: PiggyBank },
      { id: "fees-charges", href: "/dashboard/fees-charges", label: "Fees and Charges", Icon: Coins },
      { id: "transactions", href: "/dashboard/transactions", label: "Transactions", Icon: Receipt },
      { id: "services", href: "/dashboard/services", label: "Services", Icon: Settings },
      { id: "service-account", href: "/dashboard/service-account", label: "Service Account", Icon: UserCog },
      { id: "settlements", href: "/dashboard/settlements", label: "Settlements", Icon: ArrowRightLeft },
      { id: "reports", href: "/dashboard/reports", label: "Reports", Icon: BarChart3 },
    ],
  },
  {
    id: "settings",
    title: "SETTINGS",
    items: [
      { id: "preferences", href: "/dashboard/preferences", label: "Preferences", Icon: Sliders },
      { id: "fees-pricing", href: "/dashboard/fees-pricing", label: "Fees and Pricing", Icon: BadgePercent },
      { id: "audit-logs", href: "/dashboard/audit-logs", label: "Audit Logs", Icon: ClipboardCheck },
    ],
  },
];

type SidebarProps = {
  // desktop collapsed state (controlled externally if you want)
  collapsed?: boolean;
  // mobile drawer open
  open?: boolean;
  // close handler for mobile drawer
  onClose?: () => void;
};

export default function Sidebar({ collapsed = false, open = false, onClose }: SidebarProps) {
  const containerClass = `${styles.sidebar} ${collapsed ? styles.collapsed : styles.expanded} ${styles.desktop}`;

  return (
    <>
      {/* Desktop sidebar — controlled by collapsed prop */}
      <aside className={containerClass} aria-label="Sidebar">

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
                    <Link href={it.href} className={`${styles.link} ${it.active ? styles.active : ""}`}>
                      <span className={styles.iconWrap}>
                        <it.Icon className={styles.icon} aria-hidden />
                      </span>
                      <span className={`${styles.label} ${collapsed ? styles.hiddenLabel : ""}`}>
                        {it.label}
                      </span>
                      {it.dropdown && <ChevronDown className={styles.icon} aria-hidden />}
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

      {/* Mobile drawer — this is controlled exclusively by the parent via `open` prop */}
      {open && (
        <div id="mobile-sidebar" className={styles.drawerOverlay} role="dialog" aria-modal="true">
          <div className={styles.backdrop} onClick={() => onClose?.()} />

          <aside className={styles.drawer} aria-label="Mobile sidebar">
            <div className={styles.drawerHeader}>
              <Link href="/dashboard" onClick={() => onClose?.()}>
                <Image src="/images/logo.png" alt="logo" width={140} height={28} />
              </Link>

              <button onClick={() => onClose?.()} className={styles.closeBtn} aria-label="Close menu">
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
                        <Link
                          href={it.href}
                          className={`${styles.drawerLink} ${it.active ? styles.active : ""}`}
                          onClick={() => onClose?.()}
                        >
                          <it.Icon className={styles.icon} aria-hidden />
                          <span>{it.label}</span>
                          {it.dropdown && <ChevronDown className={styles.icon} aria-hidden />}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <button className={styles.drawerSignOut} onClick={() => onClose?.()}>
                <LogOut className={styles.icon} aria-hidden />
                <span>Sign Out</span>
              </button>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
