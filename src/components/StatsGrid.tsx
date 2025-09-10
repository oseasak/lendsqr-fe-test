"use client";
import React from "react";
import { Users, UserCheck, CreditCard, PiggyBank } from "lucide-react";

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
    { 
      label: "USERS", 
      value: stats.total, 
      icon: Users,
      color: "bg-purple-100 text-purple-600"
    },
    { 
      label: "ACTIVE USERS", 
      value: stats.active, 
      icon: UserCheck,
      color: "bg-blue-100 text-blue-600"
    },
    { 
      label: "USERS WITH LOANS", 
      value: stats.withLoans, 
      icon: CreditCard,
      color: "bg-red-100 text-red-600"
    },
    { 
      label: "USERS WITH SAVINGS", 
      value: stats.withSavings, 
      icon: PiggyBank,
      color: "bg-pink-100 text-pink-600"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div
            key={index}
            className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className={`inline-flex items-center justify-center p-3 rounded-full ${item.color} mb-4`}>
              <IconComponent className="h-5 w-5" />
            </div>
            <div className="text-xs uppercase tracking-wide text-gray-500 font-medium">
              {item.label}
            </div>
            <div className="text-2xl font-bold text-gray-900 mt-2">
              {item.value.toLocaleString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}