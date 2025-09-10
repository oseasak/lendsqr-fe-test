// src/app/dashboard/users/[id]/page.tsx
"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function UserDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const userData = localStorage.getItem(`user-${id}`);
  const user = userData ? JSON.parse(userData) : null;

  const statusBadge = (status: string) => {
    if (status === "active")
      return "px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800";
    if (status === "inactive")
      return "px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800";
    if (status === "pending")
      return "px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800";
    return "px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800";
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-red-500">
        User not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <button
        onClick={() => router.push("/dashboard/users")}
        className="flex items-center text-sm text-slate-600 hover:text-teal-500 mb-4"
      >
        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Users
      </button>

      <article className="bg-white p-6 rounded-lg border shadow-sm">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
            User Details
          </h2>
           <button className="px-4 py-2 bg-teal-500 text-white rounded-md text-sm font-medium hover:bg-teal-600">
            BLACKLIST USER
          </button>
          <button className="px-4 py-2 bg-teal-500 text-white rounded-md text-sm font-medium hover:bg-teal-600">
            ACTIVATE USER
          </button>
        </div>

        {/* User Info Section */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-slate-800">{user.username}</h3>
            <p className="text-xs text-slate-500">User ID: {user.id}</p>
          </div>
          <div className={statusBadge(user.status)}>
            {user.status}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600">
          <div>
            <div className="text-xs text-slate-500 mb-1">Organization</div>
            <div className="text-sm font-medium text-slate-800">{user.organization || "N/A"}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Email</div>
            <div className="text-sm font-medium text-slate-800 truncate">{user.email}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Phone</div>
            <div className="text-sm font-medium text-slate-800 whitespace-nowrap">{user.phone}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Date Joined</div>
            <div className="text-sm font-medium text-slate-800">{user.date_joined}</div>
          </div>
        </div>
      </article>
    </div>
  );
}