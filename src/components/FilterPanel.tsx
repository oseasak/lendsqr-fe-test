// src/components/FilterPanel.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVertical, Funnel } from "lucide-react";

export type Filters = {
  organization: string;
  username: string;
  email: string;
  date: string; // YYYY-MM-DD
  phone: string;
  status: string;
};

type PanelProps = {
  open: boolean;
  anchorRect: DOMRect | null;
  initial?: Partial<Filters>;
  organizations?: string[];
  focusField?: keyof Filters | null;
  onApply: (filters: Filters) => void;
  onReset?: () => void;
  onClose: () => void;
};

/**
 * FilterPanel: popover dialog (portal) — can auto-focus a given field via focusField prop.
 */
export default function FilterPanel({
  open,
  anchorRect,
  initial = {},
  organizations = [],
  focusField = null,
  onApply,
  onReset,
  onClose,
}: PanelProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [filters, setFilters] = useState<Filters>({
    organization: initial.organization ?? "",
    username: initial.username ?? "",
    email: initial.email ?? "",
    date: initial.date ?? "",
    phone: initial.phone ?? "",
    status: initial.status ?? "",
  });

  useEffect(() => {
    setFilters({
      organization: initial.organization ?? "",
      username: initial.username ?? "",
      email: initial.email ?? "",
      date: initial.date ?? "",
      phone: initial.phone ?? "",
      status: initial.status ?? "",
    });
  }, [initial, open]);

  // close on escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // click outside to close
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const el = panelRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) onClose();
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open, onClose]);

  // compute panel position using anchorRect, keep inside viewport
  const style = useMemo(() => {
    const width = 256; // w-64
    const gap = 8;
    if (!anchorRect) {
      return { left: "8px", top: "8px" } as React.CSSProperties;
    }
    const scrollX = window.scrollX ?? 0;
    const scrollY = window.scrollY ?? 0;
    // Prefer to align near the anchor's right side but clamp to viewport
    let left = anchorRect.right + scrollX - width + anchorRect.width / 2;
    const minLeft = 8 + scrollX;
    const maxLeft = (window.innerWidth ?? 1024) - width - 8 + scrollX;
    if (left < minLeft) left = minLeft;
    if (left > maxLeft) left = maxLeft;

    const top = anchorRect.bottom + gap + scrollY;
    const panelHeightEstimate = 360;
    let finalTop = top;
    if (finalTop + panelHeightEstimate > (window.innerHeight + scrollY)) {
      finalTop = Math.max(anchorRect.top - panelHeightEstimate - gap + scrollY, 8 + scrollY);
    }

    return {
      position: "absolute",
      left: `${Math.round(left)}px`,
      top: `${Math.round(finalTop)}px`,
      width: `${width}px`,
    } as React.CSSProperties;
  }, [anchorRect, open]);

  // auto-focus requested field when opened
  useEffect(() => {
    if (!open) return;
    if (!focusField) return;
    const t = setTimeout(() => {
      try {
        const el = panelRef.current?.querySelector(`[data-field="${focusField}"]`) as
          | HTMLInputElement
          | HTMLSelectElement
          | null;
        el?.focus();
        // move cursor to end for text inputs
        if (el instanceof HTMLInputElement && typeof el.selectionStart === "number") {
          const len = el.value?.length ?? 0;
          el.setSelectionRange(len, len);
        }
      } catch {
        // noop
      }
    }, 80);
    return () => clearTimeout(t);
  }, [open, focusField]);

  if (!open) return null;

  return createPortal(
    <div aria-hidden={false} role="dialog" aria-modal="true" className="z-50 pointer-events-auto">
      <div
        ref={panelRef}
        style={style}
        className="bg-white border rounded-lg shadow-lg p-4 overflow-auto"
      >
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Filter users</h3>

        <div className="space-y-3">
          {/* Organization */}
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Organization</label>
            <select
              data-field="organization"
              value={filters.organization}
              onChange={(e) => setFilters((s) => ({ ...s, organization: e.target.value }))}
              className="w-full h-10 rounded-md border px-3 text-sm"
            >
              <option value="">Select</option>
              {organizations.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          {/* Username */}
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Username</label>
            <input
              data-field="username"
              value={filters.username}
              onChange={(e) => setFilters((s) => ({ ...s, username: e.target.value }))}
              placeholder="User"
              className="w-full h-10 rounded-md border px-3 text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Email</label>
            <input
              data-field="email"
              value={filters.email}
              onChange={(e) => setFilters((s) => ({ ...s, email: e.target.value }))}
              placeholder="Email"
              className="w-full h-10 rounded-md border px-3 text-sm"
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Date</label>
            <input
              data-field="date"
              type="date"
              value={filters.date}
              onChange={(e) => setFilters((s) => ({ ...s, date: e.target.value }))}
              className="w-full h-10 rounded-md border px-3 text-sm"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Phone Number</label>
            <input
              data-field="phone"
              value={filters.phone}
              onChange={(e) => setFilters((s) => ({ ...s, phone: e.target.value }))}
              placeholder="Phone Number"
              className="w-full h-10 rounded-md border px-3 text-sm"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Status</label>
            <select
              data-field="status"
              value={filters.status}
              onChange={(e) => setFilters((s) => ({ ...s, status: e.target.value }))}
              className="w-full h-10 rounded-md border px-3 text-sm"
            >
              <option value="">Select</option>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
              <option value="pending">pending</option>
            </select>
          </div>
        </div>

        {/* actions */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => {
              setFilters({
                organization: "",
                username: "",
                email: "",
                date: "",
                phone: "",
                status: "",
              });
              onReset?.();
            }}
            className="px-3 py-2 rounded border text-sm"
          >
            Reset
          </button>

          <div className="ml-auto">
            <button
              type="button"
              onClick={() => {
                onApply(filters);
                onClose();
              }}
              className="px-4 py-2 rounded bg-teal-500 text-white text-sm font-medium hover:bg-teal-600"
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export type UserRow = {
  id: number;
  organization: string;
  username: string;
  email: string;
  phone: string;
  date_joined: string;
  status: "active" | "inactive" | "pending";
};

type FilterableUsersTableProps = {
  visible: UserRow[]; // visible rows after filtering/pagination
  statusBadge: (status: UserRow["status"]) => string;
  onSaveAndNavigate: (user: UserRow) => void;
  onFunnelClick: (e: React.MouseEvent<HTMLElement>, field?: keyof Filters | null) => void;
};

export function FilterableUsersTable({
  visible,
  statusBadge,
  onSaveAndNavigate,
  onFunnelClick,
}: FilterableUsersTableProps) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <div className="min-w-[720px] md:min-w-[920px]">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-left text-xs font-semibold text-slate-600 py-2 px-4">
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap">ORGANIZATION</span>
                  <button
                    type="button"
                    onClick={(e) => onFunnelClick(e, "organization")}
                    aria-label="Filter Organization"
                    className="ml-1 p-1 rounded hover:bg-slate-100"
                  >
                    <Funnel className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </TableHead>

              <TableHead className="text-left text-xs font-semibold text-slate-600 py-2 px-4">
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap">USERNAME</span>
                  <button
                    type="button"
                    onClick={(e) => onFunnelClick(e, "username")}
                    aria-label="Filter Username"
                    className="ml-1 p-1 rounded hover:bg-slate-100"
                  >
                    <Funnel className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </TableHead>

              <TableHead className="text-left text-xs font-semibold text-slate-600 py-2 px-4">
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap">EMAIL</span>
                  <button
                    type="button"
                    onClick={(e) => onFunnelClick(e, "email")}
                    aria-label="Filter Email"
                    className="ml-1 p-1 rounded hover:bg-slate-100"
                  >
                    <Funnel className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </TableHead>

              <TableHead className="text-left text-xs font-semibold text-slate-600 py-2 px-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">PHONE NUMBER</span>
                  <button
                    type="button"
                    onClick={(e) => onFunnelClick(e, "phone")}
                    aria-label="Filter Phone Number"
                    className="ml-1 p-1 rounded hover:bg-slate-100"
                  >
                    <Funnel className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                </div>
              </TableHead>

              <TableHead className="text-left text-xs font-semibold text-slate-600 py-2 px-4">
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap">DATE JOINED</span>
                  <button
                    type="button"
                    onClick={(e) => onFunnelClick(e, "date")}
                    aria-label="Filter Date Joined"
                    className="ml-1 p-1 rounded hover:bg-slate-100"
                  >
                    <Funnel className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </TableHead>

              <TableHead className="text-left text-xs font-semibold text-slate-600 py-2 px-4">
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap">STATUS</span>
                  <button
                    type="button"
                    onClick={(e) => onFunnelClick(e, "status")}
                    aria-label="Filter Status"
                    className="ml-1 p-1 rounded hover:bg-slate-100"
                  >
                    <Funnel className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </TableHead>

              <TableHead className="text-left text-xs font-semibold text-slate-600 py-2 px-4">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {visible.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-50 transition-colors">
                <TableCell className="py-3 px-4 text-sm text-slate-700">{user.organization}</TableCell>
                <TableCell className="py-3 px-4">
                  <Link
                    href={`/dashboard/users/${user.id}`}
                    onClick={() => onSaveAndNavigate(user)}
                    className="text-sky-600 hover:underline text-sm font-medium"
                  >
                    {user.username}
                  </Link>
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-slate-600">{user.email}</TableCell>
                <TableCell className="py-3 px-4 text-sm text-slate-600 whitespace-nowrap">{user.phone}</TableCell>
                <TableCell className="py-3 px-4 text-sm text-slate-600">{user.date_joined}</TableCell>
                <TableCell className="py-3 px-4">
                  <span className={statusBadge(user.status)}>{user.status}</span>
                </TableCell>
                <TableCell className="py-3 px-4">
                  <button
                    aria-label={`Actions for ${user.username}`}
                    className="p-2 rounded hover:bg-slate-50"
                    title="More actions"
                    onClick={() => alert(`Actions for ${user.username}`)}
                  >
                    <MoreVertical className="h-4 w-4 text-slate-500" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
