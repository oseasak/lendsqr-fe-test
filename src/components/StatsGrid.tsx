"use client";
import React from "react";
import { Users, UserCheck, CreditCard, PiggyBank } from "lucide-react";
import styles from "../styles/StatsGrid.module.scss";

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
      Icon: Users,
      colorKey: "purple",
    },
    {
      label: "ACTIVE USERS",
      value: stats.active,
      Icon: UserCheck,
      colorKey: "blue",
    },
    {
      label: "USERS WITH LOANS",
      value: stats.withLoans,
      Icon: CreditCard,
      colorKey: "red",
    },
    {
      label: "USERS WITH SAVINGS",
      value: stats.withSavings,
      Icon: PiggyBank,
      colorKey: "pink",
    },
  ];

  return (
    <div className={styles.statsGrid} role="region" aria-label="Top statistics">
      {items.map((item, idx) => {
        const Icon = item.Icon;
        const iconWrapperClass = `${styles.iconWrapper} ${styles[`iconWrapper--${item.colorKey}`]}`;
        return (
          <div key={idx} className={styles.card}>
            <div className={iconWrapperClass} aria-hidden>
              <Icon className={styles.icon} />
            </div>

            <div className={styles.label}>{item.label}</div>

            <div className={styles.value}>{item.value.toLocaleString()}</div>
          </div>
        );
      })}
    </div>
  );
}
