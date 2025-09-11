"use client";

import React from "react";
import { Star } from "lucide-react";

export type ProfileUser = {
  id?: string | number;
  fullName?: string;
  username?: string;
  organization?: string;
};

type ProfileCardProps = {
  user: ProfileUser;
  balance?: string;   // e.g. "₦200,000.00"
  bankInfo?: string;  // e.g. "08123456789 / Providus Bank"
  tier?: number;      // 0..3 (how many stars are filled)
};

export default function ProfileCard({
  user,
  balance = "₦0.00",
  bankInfo = "-",
  tier = 2,
}: ProfileCardProps) {
  const initials = React.useMemo(() => {
    if (user?.fullName) {
      return user.fullName
        .trim()
        .split(/\s+/)
        .map((s) => s[0] || "")
        .slice(0, 2)
        .join("")
        .toUpperCase();
    }
    const fallback = (user?.username ?? "U").toString();
    return fallback.slice(0, 2).toUpperCase();
  }, [user]);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-start gap-4">
        <div
          className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-xl"
          aria-hidden
        >
          {initials}
        </div>

        <div className="min-w-0">
          <div className="text-sm text-slate-500">
            {user?.organization ?? "Organization"}
          </div>

          <div className="flex items-center gap-2">
            <div className="text-lg font-semibold text-slate-800 truncate">
              {user?.fullName ?? user?.username ?? "Unknown User"}
            </div>

            <div className="text-xs text-slate-500">Tier</div>

            <div className="flex items-center gap-0.5 ml-2" aria-hidden>
              {Array.from({ length: 3 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < (tier ?? 0) ? "text-amber-400" : "text-amber-200"}`}
                  fill="currentColor"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-none">
        <div className="bg-slate-50 border rounded-lg px-4 py-3 text-right min-w-[220px]">
          <div className="text-xs text-slate-500">Balance</div>
          <div className="mt-1 text-lg font-semibold text-slate-800">{balance}</div>
          <div className="mt-1 text-xs text-slate-500">{bankInfo}</div>
        </div>
      </div>
    </div>
  );
}
