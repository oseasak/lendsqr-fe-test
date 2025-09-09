"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Users, Shield, CreditCard, Cpu, PiggyBank, Package, Receipt, Activity, Hammer, FileText, Settings, LogOut, Menu } from "lucide-react";
import Image from "next/image";

type Item = {
  id: string;
  href: string;
  label: string;
  icon: React.ReactNode;
};

const ITEMS: Item[] = [
  { id: "dashboard", href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { id: "users", href: "/dashboard/users", label: "Users", icon: <Users className="h-5 w-5" /> },
  { id: "guarantors", href: "/dashboard/guarantors", label: "Guarantors", icon: <Shield className="h-5 w-5" /> },
  { id: "loans", href: "/dashboard/loans", label: "Loans", icon: <CreditCard className="h-5 w-5" /> },
  { id: "decision-models", href: "/dashboard/decision-models", label: "Decision Models", icon: <Cpu className="h-5 w-5" /> },
  { id: "savings", href: "/dashboard/savings", label: "Savings", icon: <PiggyBank className="h-5 w-5" /> },
  { id: "loan-products", href: "/dashboard/loan-products", label: "Loan Products", icon: <Package className="h-5 w-5" /> },
  { id: "fees-charges", href: "/dashboard/fees-charges", label: "Fees and Charges", icon: <Receipt className="h-5 w-5" /> },
  { id: "transactions", href: "/dashboard/transactions", label: "Transactions", icon: <Activity className="h-5 w-5" /> },
  { id: "services", href: "/dashboard/services", label: "Services", icon: <Hammer className="h-5 w-5" /> },
  { id: "audit-logs", href: "/dashboard/audit-logs", label: "Audit Logs", icon: <FileText className="h-5 w-5" /> },
  { id: "settings", href: "/dashboard/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
];

export default function Sidebar() {
  // collapsed = small width; open = expanded
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // persist collapsed state (optional)
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

  // keyboard shortcut: press "m" to toggle (optional)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "m" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setCollapsed((c) => !c);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r h-screen transition-width duration-200 ease-in-out
          ${collapsed ? "w-18" : "w-60"} shrink-0`}
        aria-label="Sidebar"
      >
        {/* logo & collapse toggle */}
        <div className="flex items-center justify-between gap-2 px-4 py-4">
          <button
            className="p-2 rounded-md hover:bg-slate-100"
            onClick={() => setCollapsed((c) => !c)}
            aria-pressed={collapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <Menu className="h-5 w-5 text-slate-600" />
          </button>
        </div>
        <nav className="flex-1 px-1 py-2 overflow-y-auto">
          <ul className="space-y-1">
            {ITEMS.map((it) => (
              <li key={it.id}>
                <Link
                  href={it.href}
                  className={`flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors`}
                >
                  <span className="flex items-center justify-center">{it.icon}</span>
                  {/* hide label when collapsed */}
                  <span className={`${collapsed ? "hidden" : "block"} truncate`}>
                    {it.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-3 py-4">
          <button className="flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
            <LogOut className="h-5 w-5" />
            <span className={`${collapsed ? "hidden" : "block"}`}>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile: overlay drawer */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-3 py-2 bg-white border-b">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="p-2 rounded-md hover:bg-slate-100"
            >
              <Menu className="h-5 w-5 text-slate-700" />
            </button>
          </div>
        </div>
        {/* drawer */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-50 flex"
            role="dialog"
            aria-modal="true"
            onKeyDown={(e) => {
              if (e.key === "Escape") setMobileOpen(false);
            }}
          >
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
                <ul className="space-y-2">
                  {ITEMS.map((it) => (
                    <li key={it.id}>
                      <Link
                        href={it.href}
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span>{it.icon}</span>
                        <span>{it.label}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
                      onClick={() => setMobileOpen(false)}
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Sign Out</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}