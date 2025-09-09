// src/components/SearchBar.tsx
"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

export function SearchBar(): React.JSX.Element {
  const [q, setQ] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with real search routing/handler
    console.log("Search submitted:", q);
    // close overlay on submit (mobile)
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop / tablet: full search bar (md+) */}
      <form
        onSubmit={handleSubmit}
        className="hidden md:flex w-full max-w-2xl items-center"
        role="search"
        aria-label="Site search"
      >
        <div className="relative flex-1">
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="h-5 w-5" />
          </div>
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="search"
            placeholder="Search for anything"
            aria-label="Search"
            className="w-full h-12 rounded-l-full rounded-r-none pl-12 pr-3 text-sm placeholder:text-slate-400 border border-slate-200 bg-white focus-visible:ring-1 focus-visible:ring-teal-500"
          />
        </div>
        <Button
          type="submit"
          className="h-12 rounded-r-full rounded-l-none bg-teal-500 hover:bg-teal-600 focus-visible:ring-2 focus-visible:ring-teal-500 px-4 flex items-center justify-center gap-2"
        >
          <span className="hidden sm:inline text-sm font-semibold text-white">Search</span>
          <Search className="sm:hidden h-5 w-5 text-white" />
        </Button>
      </form>
      {/* Mobile: icon-only button (md hidden). Make this inline so it sits next to avatar. */}
      <div className="md:hidden inline-flex items-center">
        <button
          type="button"
          aria-label="Open search"
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-full hover:bg-slate-100 inline-flex items-center justify-center"
        >
          <Search className="h-5 w-5 text-slate-700" />
        </button>
      </div>
      {/* Mobile overlay: small centered panel for typing (appears when icon clicked) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:hidden">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          {/* panel */}
          <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg border z-10 overflow-hidden">
            <div className="p-3">
              <form onSubmit={handleSubmit} className="flex items-center gap-2" role="search">
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Search className="h-5 w-5" />
                  </div>
                  <Input
                    autoFocus
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    type="search"
                    placeholder="Search for anything"
                    aria-label="Search"
                    className="w-full h-10 pl-10 pr-3 text-sm placeholder:text-slate-400 border border-slate-200"
                  />
                </div>
                <button
                  type="button"
                  aria-label="Close search"
                  className="p-2 rounded hover:bg-slate-100"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-5 w-5 text-slate-600" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}