"use client";

import React from "react";

type Stats = {
  total: number;
  active: number;
  withLoans: number;
  withSavings: number;
};

interface StatsGridProps {
  stats: Stats;
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const items = [
    { label: "USERS", value: stats.total },
    { label: "ACTIVE USERS", value: stats.active },
    { label: "USERS WITH LOANS", value: stats.withLoans },
    { label: "USERS WITH SAVINGS", value: stats.withSavings },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {items.map((item) => (
        <div key={item.label} className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="text-xs text-slate-500">{item.label}</div>
          <div className="mt-2 text-xl sm:text-2xl font-semibold text-slate-800">
            {item.value.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
