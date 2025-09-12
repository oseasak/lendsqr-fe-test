"use client";

import React, { useState } from "react";
import styles from "../styles/SearchBar.module.scss";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchBar(): React.JSX.Element {
  const [q, setQ] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search submitted:", q);
  };

  return (
    <>
      {/* Desktop / tablet: full search bar (md+) */}
      <form
        onSubmit={handleSubmit}
        className={styles.desktopForm}
        role="search"
        aria-label="Site search"
      >
        <div className={styles.inputWrap}>
          <div className={styles.icon} aria-hidden>
            <Search />
          </div>
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="search"
            placeholder="Search for anything"
            aria-label="Search"
            className={styles.input}
          />
        </div>

        <Button type="submit" className={styles.submitBtn}>
          <span className={styles.submitText}>Search</span>
          <Search className={styles.submitIcon} />
        </Button>
      </form>

      {/* Mobile: only search icon next to avatar */}
      <div className={styles.mobileIconWrap}>
        <button
          type="button"
          aria-label="Open search"
          className={styles.iconButton}
        >
          <Search className={styles.mobileSearchIcon} />
        </button>
      </div>
    </>
  );
}
