// src/components/ProfileCard.tsx
"use client";

import React from "react";
import { Star, User as UserIcon } from "lucide-react";

export type ProfileUser = {
  id?: string | number;
  fullName?: string;
  username?: string;
  organization?: string;
};

type ProfileCardProps = {
  user: ProfileUser;
  balance?: string; // e.g. "₦200,000.00"
  bankInfo?: string; // e.g. "08123456789 / Providus Bank"
  tier?: number; // 0..3 (how many stars are filled)
};

export default function ProfileCard({
  user,
  balance = "₦0.00",
  bankInfo = "-",
  tier = 2,
}: ProfileCardProps) {
  // values used in the card
  const displayName = user?.fullName ?? user?.username ?? "Unknown User";
  // short username string shown under the name (matches screenshot: small, muted)
  const smallUsername =
    typeof user?.username === "string" && user.username.length > 0
      ? user.username
      : "LSQFf587g90";

  return (
    <section
      aria-label="User profile summary"
      className="bg-white border border-gray-100 rounded-lg shadow-sm p-4 md:p-6"
    >
      {/* layout: stacked on mobile, row on md+ */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* LEFT: Avatar + Name + small username */}
        <div className="flex items-center gap-4 min-w-0">
          <div
            aria-hidden
            className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0"
          >
            <UserIcon className="w-6 h-6" />
          </div>

          <div className="min-w-0">
            <div className="text-lg font-semibold text-sky-700 truncate">
              {displayName}
            </div>
            <div className="mt-1 text-sm text-slate-400 truncate">
              {smallUsername}
            </div>
          </div>
        </div>

        {/* MIDDLE: Tier (visible on md+, separated by vertical borders) */}
        <div className="hidden md:flex items-center justify-center px-6 border-l border-r border-gray-100">
          <div className="text-center">
            <div className="text-xs text-slate-500 mb-1">User&apos;s Tier</div>
            <div className="flex items-center gap-1 justify-center" aria-hidden>
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

        {/* RIGHT: Balance block - right-aligned with fixed minimum width */}
        <div className="flex-none">
          <div className="bg-slate-50 border rounded-lg px-4 py-3 text-right min-w-[220px]">
            <div className="text-xs text-slate-500">₦200,000.00</div>
            <div className="mt-1 text-lg font-semibold text-slate-800">{balance}</div>
            <div className="mt-1 text-xs text-slate-500">{bankInfo}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
