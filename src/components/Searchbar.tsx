// src/components/SearchBar.tsx
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function SearchBar(): React.JSX.Element {
  const [q, setQ] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with real search routing/handler
    console.log("Search submitted:", q);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex max-w-2xl">
      {/* Input with left icon */}
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

      {/* Submit button: icon on xs, label on sm+ */}
      <Button
        type="submit"
        className="h-12 rounded-r-full rounded-l-none bg-teal-500 hover:bg-teal-600 focus-visible:ring-2 focus-visible:ring-teal-500 px-4 flex items-center justify-center gap-2"
      >
        <span className="hidden sm:inline text-sm font-semibold text-white">Search</span>
        <Search className="sm:hidden h-5 w-5 text-white" />
      </Button>
    </form>
  );
}
