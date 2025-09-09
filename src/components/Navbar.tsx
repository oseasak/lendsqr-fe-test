// src/components/layout/Navbar.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "@/components/Searchbar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Click outside to close
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!mobileOpen) return;
      if (!panelRef.current) return;
      if (panelRef.current.contains(e.target as Node)) return;
      setMobileOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [mobileOpen]);

  return (
    <nav className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-3">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="inline-flex items-center">
              <Image
                src="/images/logo.png"
                alt="Lendsqr Logo"
                width={144.8}
                height={30}
                priority
              />
            </Link>
          </div>
          
              <div className="flex items-center space-x-4">
                <SearchBar /> {/* Add SearchBar here */}
                {/* <ThemeToggle /> */}
              </div>

          {/* Right (desktop): Docs · Bell · Avatar + Name */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Docs
            </a>

            <button
              aria-label="Notifications"
              className="relative text-gray-600 hover:text-gray-900 p-1 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405C18.21 14.79 18 13.918 18 13V9a6 6 0 00-9.33-4.98M9 17h6m-6 0a3 3 0 006 0"
                />
              </svg>
            </button>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="flex items-center space-x-2">
                    <Image
                      src="/images/Avatar.png"
                      alt="User Avatar"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-700">Adedeji</span>
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="bg-white shadow-md rounded-md p-4 min-w-[150px]">
                    <ul className="flex flex-col space-y-2">
                      <li>
                        <Link href="/profile" className="text-gray-700 hover:text-gray-900 text-sm">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link href="/settings" className="text-gray-700 hover:text-gray-900 text-sm">
                          Settings
                        </Link>
                      </li>
                      <li>
                        <button className="text-red-600 hover:text-red-800 text-sm" onClick={() => alert("Sign out")}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile / small screens: avatar (name hidden) + hamburger */}
          <div className="flex items-center md:hidden gap-3">
            <Image
              src="/images/Avatar.png"
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            {/* Hamburger */}
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-slate-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile slide-over panel */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* backdrop */}
          <div className="fixed inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />

          {/* panel */}
          <aside
            ref={panelRef}
            className="relative ml-auto w-[84%] max-w-sm bg-white p-4 shadow-xl"
            aria-label="Mobile menu"
          >
            <div className="flex items-center justify-between">
              <Link href="/dashboard" className="inline-flex items-center">
                <Image src="/images/logo.png" alt="Lendsqr" width={120} height={28} />
              </Link>
              <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="rounded-md p-2 hover:bg-slate-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="mt-6">
              <ul className="space-y-4">
                <li>
                  <Link href="/docs" className="block text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>
                    Docs
                  </Link>
                </li>
                <li>
                  <button
                    className="flex items-center gap-3 w-full text-left text-gray-700"
                    onClick={() => {
                      setMobileOpen(false);
                      alert("View notifications");
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405C18.21 14.79 18 13.918 18 13V9a6 6 0 00-9.33-4.98" />
                    </svg>
                    Notifications
                  </button>
                </li>

                <li>
                  <Link href="/profile" className="block text-gray-700" onClick={() => setMobileOpen(false)}>Profile</Link>
                </li>

                <li>
                  <Link href="/settings" className="block text-gray-700" onClick={() => setMobileOpen(false)}>Settings</Link>
                </li>

                <li>
                  <button className="block text-red-600" onClick={() => { setMobileOpen(false); alert("Sign out"); }}>
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
      )}
    </nav>
  );
}
