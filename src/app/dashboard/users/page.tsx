"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import FilterPanel, { FilterableUsersTable, Filters as FilterValues } from "@/components/FilterPanel";
import StatsGrid from "@/components/StatsGrid"; // 👈 import new component

type ApiUser = {
  organization: string;
  username: string;
  email: string;
  phone: string;
  date_joined: string;
  status: "active" | "inactive" | "pending";
};

type UserRow = ApiUser & { id: number };

const statusBadge = (status: UserRow["status"]) => {
  if (status === "active")
    return "px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800";
  if (status === "inactive")
    return "px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800";
  return "px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800";
};

export default function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [orgFilter, setOrgFilter] = useState("");
  const [usernameFilter, setUsernameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);

  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [filterAnchorRect, setFilterAnchorRect] = useState<DOMRect | null>(null);
  const [filterFocus, setFilterFocus] = useState<keyof FilterValues | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data: ApiUser[] = await res.json();
        const mapped: UserRow[] = data.map((u, i) => ({ id: i + 1, ...u }));
        if (!cancelled) setUsers(mapped);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchUsers();
    return () => {
      cancelled = true;
    };
  }, []);

  const uniqueOrgs = useMemo(() => {
    const set = new Set(users.map((u) => u.organization).filter(Boolean));
    return Array.from(set).sort();
  }, [users]);

  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.status === "active").length;
    const withLoans = Math.round(total * 0.12);
    const withSavings = Math.round(total * 0.42);
    return { total, active, withLoans, withSavings };
  }, [users]);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (statusFilter !== "all" && u.status !== statusFilter) return false;
      if (orgFilter && !u.organization.toLowerCase().includes(orgFilter.toLowerCase()))
        return false;
      if (usernameFilter && !u.username.toLowerCase().includes(usernameFilter.toLowerCase()))
        return false;
      if (emailFilter && !u.email.toLowerCase().includes(emailFilter.toLowerCase()))
        return false;
      if (phoneFilter && !u.phone.toLowerCase().includes(phoneFilter.toLowerCase()))
        return false;
      if (dateFilter && u.date_joined !== dateFilter) return false;
      return true;
    });
  }, [users, orgFilter, usernameFilter, emailFilter, phoneFilter, statusFilter, dateFilter]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = total === 0 ? 0 : (page - 1) * perPage + 1;
  const end = Math.min(total, page * perPage);
  const visible = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages]);

  const handleSaveAndNavigate = (user: UserRow) => {
    try {
      localStorage.setItem(`user-${user.id}`, JSON.stringify(user));
    } catch {
      // noop
    }
  };

  const handleFunnelClick = (e: React.MouseEvent<HTMLElement>, field?: keyof FilterValues | null) => {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    if (filterPanelOpen && filterFocus === field) {
      setFilterPanelOpen(false);
      setFilterFocus(null);
      return;
    }

    setFilterAnchorRect(rect);
    setFilterFocus(field ?? null);
    setFilterPanelOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
        <span className="ml-2 text-slate-700">Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-red-500">Error: {error}</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-4">
        <h2 className="text-base sm:text-lg text-slate-700 font-medium">Users</h2>
      </div>

      {/* ✅ Replace inline grid with component */}
      <StatsGrid stats={stats} />

      <FilterableUsersTable
        visible={visible}
        statusBadge={statusBadge}
        onSaveAndNavigate={handleSaveAndNavigate}
        onFunnelClick={handleFunnelClick}
      />

      <div className="md:hidden space-y-3">
        {visible.map((user) => (
          <article key={user.id} className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs text-slate-500">ORGANIZATION</div>
                <div className="text-sm font-medium text-slate-800 truncate">{user.organization}</div>
              </div>
              <div>
                <button
                  aria-label={`Actions for ${user.username}`}
                  className="p-1 rounded hover:bg-slate-50"
                  onClick={() => alert(`Actions for ${user.username}`)}
                >
                  <MoreVertical className="h-4 w-4 text-slate-500" />
                </button>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-600">
              <div>
                <div className="text-xs text-slate-500">USERNAME</div>
                <Link
                  href={`/dashboard/users/${user.id}`}
                  onClick={() => handleSaveAndNavigate(user)}
                  className="text-sky-600 hover:underline text-sm font-medium truncate"
                >
                  {user.username}
                </Link>
              </div>

              <div>
                <div className="text-xs text-slate-500">PHONE</div>
                <div className="text-sm text-slate-600 whitespace-nowrap truncate">{user.phone}</div>
              </div>

              <div className="col-span-2">
                <div className="text-xs text-slate-500">EMAIL</div>
                <div className="text-sm text-slate-600 truncate">{user.email}</div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className={statusBadge(user.status)}>{user.status}</div>
              <div className="text-xs text-slate-500">{user.date_joined}</div>
            </div>
          </article>
        ))}
      </div>

      <div className="px-2 sm:px-5 py-3 border-t mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-sm text-slate-600">
            Showing <span className="font-medium">{start}</span> to <span className="font-medium">{end}</span> of {" "}
            <span className="font-medium">{total}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <div className="hidden sm:block">Rows per page</div>
              <select
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setPage(1);
                }}
                className="p-1 border rounded text-sm w-20"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded disabled:opacity-50"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 7) }).map((_, idx) => {
                  const num = idx + 1;
                  return (
                    <button
                      key={num}
                      onClick={() => setPage(num)}
                      className={`px-2 py-1 text-sm rounded ${num === page ? "bg-teal-500 text-white" : "bg-white border"}`}
                    >
                      {num}
                    </button>
                  );
                })}
                {totalPages > 7 && <span className="px-2 text-sm text-slate-400">…</span>}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded disabled:opacity-50"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <FilterPanel
        open={filterPanelOpen}
        anchorRect={filterAnchorRect}
        focusField={filterFocus}
        initial={{
          organization: orgFilter || "",
          username: usernameFilter || "",
          email: emailFilter || "",
          date: dateFilter || "",
          phone: phoneFilter || "",
          status: statusFilter !== "all" ? statusFilter : "",
        }}
        organizations={uniqueOrgs}
        onApply={(f: FilterValues) => {
          setOrgFilter(f.organization);
          setUsernameFilter(f.username);
          setEmailFilter(f.email);
          setPhoneFilter(f.phone);
          setDateFilter(f.date);
          setStatusFilter(f.status || "all");
          setPage(1);
          setFilterPanelOpen(false);
        }}
        onReset={() => {
          setOrgFilter("");
          setUsernameFilter("");
          setEmailFilter("");
          setPhoneFilter("");
          setDateFilter("");
          setStatusFilter("all");
          setPage(1);
          setFilterPanelOpen(false);
        }}
        onClose={() => setFilterPanelOpen(false)}
      />
    </div>
  );
}
