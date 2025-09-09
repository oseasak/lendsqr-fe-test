"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard, Users, User, Shield, CreditCard, Cpu, PiggyBank, Package,
  Receipt, Activity, Hammer, FileText, Settings, LogOut, Menu, Building2, ClipboardList
} from "lucide-react";
import Image from "next/image";

type Item = {
  id: string;
  href: string;
  label: string;
  icon: React.ReactNode;
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
      { id: "dashboard", href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    ],
  },
  {
    id: "customers",
    title: "CUSTOMERS",
    items: [
      { id: "users", href: "/dashboard/users", label: "Users", icon: <Users className="h-5 w-5" /> },
      { id: "guarantors", href: "/dashboard/guarantors", label: "Guarantors", icon: <User className="h-5 w-5" /> },
      { id: "loans", href: "/dashboard/loans", label: "Loans", icon: <CreditCard className="h-5 w-5" /> },
      { id: "decision-models", href: "/dashboard/decision-models", label: "Decision Models", icon: <Cpu className="h-5 w-5" /> },
      { id: "savings", href: "/dashboard/savings", label: "Savings", icon: <PiggyBank className="h-5 w-5" /> },
      { id: "loan-requests", href: "/dashboard/loan-requests", label: "Loan Requests", icon: <ClipboardList className="h-5 w-5" /> },
      { id: "whitelist", href: "/dashboard/whitelist", label: "Whitelist", icon: <Shield className="h-5 w-5" /> },
      { id: "karma", href: "/dashboard/karma", label: "Karma", icon: <Shield className="h-5 w-5" /> },
    ],
  },
  {
    id: "businesses",
    title: "BUSINESSES",
    items: [
      { id: "organization", href: "/dashboard/organization", label: "Organization", icon: <Building2 className="h-5 w-5" /> },
      { id: "loan-products", href: "/dashboard/loan-products", label: "Loan Products", icon: <Package className="h-5 w-5" /> },
      { id: "savings-products", href: "/dashboard/savings-products", label: "Savings Products", icon: <PiggyBank className="h-5 w-5" /> },
      { id: "fees-charges", href: "/dashboard/fees-charges", label: "Fees and Charges", icon: <Receipt className="h-5 w-5" /> },
      { id: "transactions", href: "/dashboard/transactions", label: "Transactions", icon: <Activity className="h-5 w-5" /> },
      { id: "services", href: "/dashboard/services", label: "Services", icon: <Hammer className="h-5 w-5" /> },
      { id: "service-account", href: "/dashboard/service-account", label: "Service Account", icon: <User className="h-5 w-5" /> },
      { id: "settlements", href: "/dashboard/settlements", label: "Settlements", icon: <CreditCard className="h-5 w-5" /> },
      { id: "reports", href: "/dashboard/reports", label: "Reports", icon: <FileText className="h-5 w-5" /> },
    ],
  },
  {
    id: "settings",
    title: "SETTINGS",
    items: [
      { id: "preferences", href: "/dashboard/preferences", label: "Preferences", icon: <Settings className="h-5 w-5" /> },
      { id: "fees-pricing", href: "/dashboard/fees-pricing", label: "Fees and Pricing", icon: <Receipt className="h-5 w-5" /> },
      { id: "audit-logs", href: "/dashboard/audit-logs", label: "Audit Logs", icon: <FileText className="h-5 w-5" /> },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sidebar-collapsed");
      if (saved !== null) setCollapsed(saved === "true");
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("sidebar-collapsed", String(collapsed));
    } catch {}
  }, [collapsed]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r min-h-screen transition-all duration-200 ease-in-out
          ${collapsed ? "w-18" : "w-60"} shrink-0`}
        aria-label="Sidebar"
      >
        {/* collapse toggle */}
        <div className="flex items-center justify-between px-4 py-4">
          <button
            className="p-2 rounded-md hover:bg-slate-100"
            onClick={() => setCollapsed((c) => !c)}
            aria-pressed={collapsed}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <Menu className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        {/* Navigation (non-scrollable) */}
        <nav className="px-2 py-2">
          {SECTIONS.map((section) => (
            <div key={section.id} className="mb-4">
              {section.title && (
                <div className={`px-3 py-1 text-xs font-semibold text-slate-400 ${collapsed ? "hidden" : "block"}`}>
                  {section.title}
                </div>
              )}
              <ul className="space-y-1">
                {section.items.map((it) => (
                  <li key={it.id}>
                    <Link
                      href={it.href}
                      className="flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    >
                      {it.icon}
                      <span className={`${collapsed ? "hidden" : "block"} truncate`}>{it.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Sign Out */}
        <div className="px-3 py-4">
          <button className="flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
            <LogOut className="h-5 w-5" />
            <span className={`${collapsed ? "hidden" : "block"}`}>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-3 py-2 bg-white border-b">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="p-2 rounded-md hover:bg-slate-100"
          >
            <Menu className="h-5 w-5 text-slate-700" />
          </button>
        </div>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
            <aside className="relative z-50 w-72 bg-white shadow-xl">
              <div className="px-4 py-4 flex items-center justify-between">
                <Link href="/dashboard">
                  <Image src="/images/logo.png" alt="logo" width={140} height={28} />
                </Link>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-md hover:bg-slate-100">
                  ✕
                </button>
              </div>
              <nav className="px-2 py-4">
                {SECTIONS.map((section) => (
                  <div key={section.id} className="mb-4">
                    {section.title && (
                      <div className="px-3 py-1 text-xs font-semibold text-slate-400">{section.title}</div>
                    )}
                    <ul className="space-y-1">
                      {section.items.map((it) => (
                        <li key={it.id}>
                          <Link
                            href={it.href}
                            className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
                            onClick={() => setMobileOpen(false)}
                          >
                            {it.icon}
                            <span>{it.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <button
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
                  onClick={() => setMobileOpen(false)}
                >
                  <LogOut className="h-5 w-5" />
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
