"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVertical, ChevronLeft, ChevronRight, Loader2, Funnel } from "lucide-react";

type ApiUser = {
  organization: string;
  username: string;
  email: string;
  phone: string;
  date_joined: string;
  status: "active" | "inactive" | "pending";
};

type UserRow = ApiUser & { id: number };

export default function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // filters + pagination state
  const [orgFilter, setOrgFilter] = useState("");
  const [usernameFilter, setUsernameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);

  // fetch users
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
        if (!cancelled) setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchUsers();
    return () => {
      cancelled = true;
    };
  }, []);

  // stats (top cards)
  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.status === "active").length;
    const withLoans = Math.round(total * 0.12);
    const withSavings = Math.round(total * 0.42);
    return { total, active, withLoans, withSavings };
  }, [users]);

  // filtering
  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (statusFilter !== "all" && u.status !== statusFilter) return false;
      if (orgFilter && !u.organization.toLowerCase().includes(orgFilter.toLowerCase())) return false;
      if (usernameFilter && !u.username.toLowerCase().includes(usernameFilter.toLowerCase())) return false;
      if (emailFilter && !u.email.toLowerCase().includes(emailFilter.toLowerCase())) return false;
      if (phoneFilter && !u.phone.toLowerCase().includes(phoneFilter.toLowerCase())) return false;
      return true;
    });
  }, [users, orgFilter, usernameFilter, emailFilter, phoneFilter, statusFilter]);

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
    } catch {}
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
      <div className="flex items-center justify-center min-h-[60vh] text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* Page title */}
      <div className="mb-4">
        <h2 className="text-lg text-slate-700 font-medium">Users</h2>
      </div>
      {/* Top stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="text-xs text-slate-500">USERS</div>
          <div className="mt-2 text-2xl font-semibold text-slate-800">{stats.total.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="text-xs text-slate-500">ACTIVE USERS</div>
          <div className="mt-2 text-2xl font-semibold text-slate-800">{stats.active.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="text-xs text-slate-500">USERS WITH LOANS</div>
          <div className="mt-2 text-2xl font-semibold text-slate-800">{stats.withLoans.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="text-xs text-slate-500">USERS WITH SAVINGS</div>
          <div className="mt-2 text-2xl font-semibold text-slate-800">{stats.withSavings.toLocaleString()}</div>
        </div>
      </div>
      {/* table (scrollable horizontally on small screens) */}
      <div className="overflow-x-auto">
        <div className="min-w-[920px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-left text-xs font-semibold text-slate-600 py-2 px-4">
                  <div className="flex items-center">
                    <span>ORGANIZATION</span>
                    <Funnel
                      className="w-4 h-4 ml-1 cursor-pointer text-gray-500 hover:text-gray-700"
                      aria-label="Filter Organization"
                    />
                  </div>
                </TableHead>
                <TableHead className="text-left text-xs font-semibold text-slate-600 py-2 px-4">
                  <div className="flex items-center">
                    <span>USERNAME</span>
                    <Funnel
                      className="w-4 h-4 ml-1 cursor-pointer text-gray-500 hover:text-gray-700"
                      aria-label="Filter Username"
                    />
                  </div>
                </TableHead>
                <TableHead className="text-left text-xs font-semibold text-slate-600 py-2 px-4">
                  <div className="flex items-center">
                    <span>EMAIL</span>
                    <Funnel
                      className="w-4 h-4 ml-1 cursor-pointer text-gray-500 hover:text-gray-700"
                      aria-label="Filter Email"
                    />
                  </div>
                </TableHead>
                <TableHead className="text-left text-xs font-semibold text-slate-600 py-2 px-4">
                  <div className="flex items-center">
                    <span>PHONE NUMBER</span>
                    <Funnel
                      className="w-4 h-4 ml-1 cursor-pointer text-gray-500 hover:text-gray-700"
                      aria-label="Filter Phone Number"
                    />
                  </div>
                </TableHead>
                <TableHead className="text-left text-xs font-semibold text-slate-600 py-2 px-4">
                  <div className="flex items-center">
                    <span>DATE JOINED</span>
                    <Funnel
                      className="w-4 h-4 ml-1 cursor-pointer text-gray-500 hover:text-gray-700"
                      aria-label="Filter Date Joined"
                    />
                  </div>
                </TableHead>
                <TableHead className="text-left text-xs font-semibold text-slate-600 py-2 px-4">
                  <div className="flex items-center">
                    <span>STATUS</span>
                    <Funnel
                      className="w-4 h-4 ml-1 cursor-pointer text-gray-500 hover:text-gray-700"
                      aria-label="Filter Status"
                    />
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
                      onClick={() => handleSaveAndNavigate(user)}
                      className="text-sky-600 hover:underline text-sm font-medium"
                    >
                      {user.username}
                    </Link>
                  </TableCell>
                  <TableCell className="py-3 px-4 text-sm text-slate-600">{user.email}</TableCell>
                  <TableCell className="py-3 px-4 text-sm text-slate-600 whitespace-nowrap">{user.phone}</TableCell>
                  <TableCell className="py-3 px-4 text-sm text-slate-600">{user.date_joined}</TableCell>
                  <TableCell className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : user.status === "inactive"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <button
                      aria-label="Actions"
                      className="p-2 rounded hover:bg-slate-50"
                      title="More actions"
                      onClick={() => {
                        alert(`Actions for ${user.username}`);
                      }}
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
      {/* footer / pagination */}
      <div className="px-5 py-3 border-t">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-sm text-slate-600">
            Showing <span className="font-medium">{start}</span> to <span className="font-medium">{end}</span> of{" "}
            <span className="font-medium">{total}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
              <div>Rows per page</div>
              <select
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setPage(1);
                }}
                className="p-1 border rounded text-sm"
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
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}