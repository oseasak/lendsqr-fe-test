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
import { Star } from "lucide-react";
import styles from "../styles/Navbar.module.scss";

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const userName = "Adedeji";
  const tier = 2;

  // Close mobile panel on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Click outside to close mobile panel
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

  const renderStars = () => (
    <div className={styles.stars} aria-hidden>
      {Array.from({ length: 3 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < tier ? "text-amber-400" : "text-amber-200"}`}
          fill="currentColor"
        />
      ))}
    </div>
  );

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.inner}>
          {/* Left: Logo */}
          <div className={styles.left}>
            <Link href="/dashboard" className={styles.logoLink}>
              <Image
                src="/images/logo.png"
                alt="Lendsqr Logo"
                width={145}
                height={30}
                priority
              />
            </Link>
          </div>

          {/* Center: Search */}
          <div className={styles.center}>
            <div className={styles.searchWrap}>
              <SearchBar />
            </div>
          </div>

          {/* Desktop Right */}
          <div className={styles.desktopRight}>
            <a className={styles.docsLink} href="#">
              Docs
            </a>

            <button
              aria-label="Notifications"
              className={styles.notifButton}
              title="Notifications"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.iconSmall}
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
                  <NavigationMenuTrigger className={styles.navMenuTrigger}>
                    <Image
                      src="/images/Avatar.png"
                      alt="User Avatar"
                      width={44}
                      height={44}
                      className={styles.avatar}
                    />
                    <span className={styles.userName}>{userName}</span>
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className={styles.navMenuContent}>
                    <ul className={styles.menuList}>
                      <li>
                        <Link href="/profile" className={styles.menuLink}>
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link href="/settings" className={styles.menuLink}>
                          Settings
                        </Link>
                      </li>
                      <li>
                        <button
                          className={styles.menuLogout}
                          onClick={() => alert("Sign out")}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Right: avatar opens slide-over */}
          <div className={styles.mobileWrap}>
            <button
              type="button"
              aria-label="Open profile menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className={styles.mobileAvatarBtn}
            >
              <Image
                src="/images/Avatar.png"
                alt="User Avatar"
                width={44}
                height={44}
                className={styles.avatar}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile slide-over */}
      {mobileOpen && (
        <div className={styles.mobileOverlay}>
          <div className={styles.backdrop} onClick={() => setMobileOpen(false)} />

          <aside
            ref={panelRef}
            className={styles.slidePanel}
            aria-label="Mobile menu"
            role="dialog"
          >
            <div className={styles.panelHeader}>
              <Link
                href="/dashboard"
                className={styles.logoLink}
                onClick={() => setMobileOpen(false)}
              >
                <Image src="/images/logo.png" alt="Lendsqr" width={120} height={28} />
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className={styles.panelCloseBtn}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.iconSmall}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Avatar + Name + Tier */}
            <div className={styles.mobileUser}>
              <Image
                src="/images/Avatar.png"
                alt="User Avatar"
                width={50}
                height={50}
                className={styles.avatar}
              />
              <div className={styles.mobileUserInfo}>
                <span className={styles.userName}>{userName}</span>
                {renderStars()}
              </div>
            </div>

            <nav className={styles.panelNav}>
              <ul className={styles.panelList}>
                <li>
                  <Link
                    href="/docs"
                    className={styles.panelLink}
                    onClick={() => setMobileOpen(false)}
                  >
                    Docs
                  </Link>
                </li>

                <li>
                  <button
                    className={styles.panelButton}
                    onClick={() => {
                      setMobileOpen(false);
                      alert("View notifications");
                    }}
                  >
                    Notifications
                  </button>
                </li>

                <li>
                  <Link
                    href="/profile"
                    className={styles.panelLink}
                    onClick={() => setMobileOpen(false)}
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <Link
                    href="/settings"
                    className={styles.panelLink}
                    onClick={() => setMobileOpen(false)}
                  >
                    Settings
                  </Link>
                </li>

                <li>
                  <button
                    className={styles.panelLogout}
                    onClick={() => {
                      setMobileOpen(false);
                      alert("Sign out");
                    }}
                  >
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
};

export default Navbar;
