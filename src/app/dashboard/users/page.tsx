"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Eye,
  UserX,
  UserCheck,
} from "lucide-react";
import FilterPanel, {
  FilterableUsersTable,
  Filters as FilterValues,
} from "@/components/FilterPanel";
import StatsGrid from "@/components/StatsGrid";
import styles from "./UsersPage.module.scss";

type ApiUser = {
  organization: string;
  username: string;
  email: string;
  phone: string;
  date_joined: string;
  status: "active" | "inactive" | "pending";
};

type UserRow = ApiUser & { id: number };

/**
 * Returns CSS module class names for status badges
 */
const statusBadge = (status: UserRow["status"], stylesObj: Record<string, string>) => {
  if (status === "active")
    return `${stylesObj.statusBadge} ${stylesObj["statusBadge--active"]}`;
  if (status === "inactive")
    return `${stylesObj.statusBadge} ${stylesObj["statusBadge--inactive"]}`;
  return `${stylesObj.statusBadge} ${stylesObj["statusBadge--pending"]}`;
};

export default function UsersPage() {
  const router = useRouter();
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
  const [actionsOpen, setActionsOpen] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fetch users
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

  // Close actions dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setActionsOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const uniqueOrgs = useMemo(() => {
    return Array.from(new Set(users.map((u) => u.organization).filter(Boolean))).sort();
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
  }, [
    users,
    orgFilter,
    usernameFilter,
    emailFilter,
    phoneFilter,
    statusFilter,
    dateFilter,
  ]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = total === 0 ? 0 : (page - 1) * perPage + 1;
  const end = Math.min(total, page * perPage);
  const visible = filtered.slice((page - 1) * perPage, page * perPage);

  // Adjust page if current page exceeds total pages
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const handleSaveAndNavigate = (user: UserRow) => {
    try {
      localStorage.setItem(`user-${user.id}`, JSON.stringify(user));
    } catch {
      // noop
    }
    router.push(`/dashboard/users/${user.id}`);
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
      <div className={styles.loadingWrap}>
        <Loader2 className={styles.spinner} />
        <span className={styles.loadingText}>Loading users...</span>
      </div>
    );
  }

  if (error) {
    return <div className={styles.centerError}>Error: {error}</div>;
  }

  return (
    <div className={styles.page} ref={wrapperRef}>
      <header className={styles.header}>
        <h1 className={styles.title}>Users</h1>
      </header>

      <section className={styles.statsSection}>
        <StatsGrid stats={stats} />
      </section>

      <section className={styles.tableSection}>
        <FilterableUsersTable
          visible={visible}
          statusBadge={(s) => statusBadge(s, styles)}
          onSaveAndNavigate={handleSaveAndNavigate}
          onFunnelClick={handleFunnelClick}
        />
      </section>

      <section className={styles.mobileCards}>
        {visible.map((user) => (
          <article key={user.id} className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.orgWrap}>
                <div className={styles.labelSmall}>ORGANIZATION</div>
                <div className={styles.orgValue}>{user.organization}</div>
              </div>

              <div className={styles.actionsWrap}>
                <button
                  aria-label={`Actions for ${user.username}`}
                  className={styles.actionBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActionsOpen(actionsOpen === user.id ? null : user.id);
                  }}
                >
                  <MoreVertical className={styles.iconSmall} />
                </button>

                {actionsOpen === user.id && (
                  <div className={styles.actionsDropdown} onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        handleSaveAndNavigate(user);
                        setActionsOpen(null);
                      }}
                      className={styles.actionsItem}
                    >
                      <Eye className={styles.iconSmall} /> <span>View Details</span>
                    </button>
                    <button
                      onClick={() => {
                        setActionsOpen(null);
                      }}
                      className={styles.actionsItem}
                    >
                      <UserX className={styles.iconSmall} /> <span>Blacklist User</span>
                    </button>
                    <button
                      onClick={() => {
                        setActionsOpen(null);
                      }}
                      className={styles.actionsItem}
                    >
                      <UserCheck className={styles.iconSmall} /> <span>Activate User</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.twoCol}>
                <div>
                  <div className={styles.labelSmall}>USERNAME</div>
                  <div className={styles.valueSmall}>{user.username}</div>
                </div>

                <div>
                  <div className={styles.labelSmall}>PHONE</div>
                  <div className={styles.valueSmall}>{user.phone}</div>
                </div>

                <div className={styles.colSpan2}>
                  <div className={styles.labelSmall}>EMAIL</div>
                  <div className={styles.valueSmall}>{user.email}</div>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <div className={statusBadge(user.status, styles)}>{user.status}</div>
                <div className={styles.dateSmall}>{user.date_joined}</div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.paginationWrap}>
        <div className={styles.paginationInner}>
          <div className={styles.paginationInfo}>
            Showing <span className={styles.bold}>{start}</span> to <span className={styles.bold}>{end}</span> of{" "}
            <span className={styles.bold}>{total}</span>
          </div>

          <div className={styles.paginationControls}>
            <div className={styles.rowsPerPage}>
              <div className={styles.rowsLabel}>Rows per page</div>
              <select
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setPage(1);
                }}
                className={styles.rowsSelect}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className={styles.pager}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className={`${styles.pagerBtn} ${page === 1 ? styles.disabled : ""}`}
                aria-label="Previous page"
              >
                <ChevronLeft className={styles.iconSmall} />
              </button>

              <div className={styles.pageList}>
                {Array.from({ length: Math.min(totalPages, 7) }).map((_, idx) => {
                  const num = idx + 1;
                  return (
                    <button
                      key={num}
                      onClick={() => setPage(num)}
                      className={`${styles.pageBtn} ${num === page ? styles.activePage : ""}`}
                    >
                      {num}
                    </button>
                  );
                })}
                {totalPages > 7 && <span className={styles.ellipsis}>…</span>}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className={`${styles.pagerBtn} ${page === totalPages ? styles.disabled : ""}`}
                aria-label="Next page"
              >
                <ChevronRight className={styles.iconSmall} />
              </button>
            </div>
          </div>
        </div>
      </section>

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
