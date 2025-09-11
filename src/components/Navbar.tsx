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
import styles from "../styles/Navbar.module.scss";

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
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.inner}>
          {/* Left: Logo */}
          <div className={styles.left}>
            <Link href="/dashboard" className={styles.logoLink}>
              <Image src="/images/logo.png" alt="Lendsqr Logo" width={145} height={30} priority />
            </Link>
          </div>

          {/* Center: Search */}
          <div className={styles.center}>
            <div className={styles.searchWrap}>
              <SearchBar />
            </div>
          </div>

          {/* Right (desktop): Docs · Bell · Avatar + Name */}
          <div className={styles.desktopRight}>
            <a className={styles.docsLink} href="#">
              Docs
            </a>

            <button aria-label="Notifications" className={styles.notifButton} title="Notifications">
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconSmall} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405C18.21 14.79 18 13.918 18 13V9a6 6 0 00-9.33-4.98M9 17h6m-6 0a3 3 0 006 0" />
              </svg>
            </button>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={styles.navMenuTrigger}>
                    <Image src="/images/Avatar.png" alt="User Avatar" width={44} height={44} className={styles.avatar} />
                    <span className={styles.userName}>Adedeji</span>
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
                        <button className={styles.menuLogout} onClick={() => alert("Sign out")}>
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
          <div className={styles.mobileWrap}>
            <Image src="/images/Avatar.png" alt="User Avatar" width={40} height={40} className={styles.avatar} />

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className={styles.mobileToggle}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconHamburger} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile slide-over panel */}
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
              <Link href="/dashboard" className={styles.logoLink} onClick={() => setMobileOpen(false)}>
                <Image src="/images/logo.png" alt="Lendsqr" width={120} height={28} />
              </Link>
              <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className={styles.panelCloseBtn}>
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconSmall} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className={styles.panelNav}>
              <ul className={styles.panelList}>
                <li>
                  <Link href="/docs" className={styles.panelLink} onClick={() => setMobileOpen(false)}>
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
                    <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconSmall} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405C18.21 14.79 18 13.918 18 13V9a6 6 0 00-9.33-4.98" />
                    </svg>
                    Notifications
                  </button>
                </li>

                <li>
                  <Link href="/profile" className={styles.panelLink} onClick={() => setMobileOpen(false)}>Profile</Link>
                </li>

                <li>
                  <Link href="/settings" className={styles.panelLink} onClick={() => setMobileOpen(false)}>Settings</Link>
                </li>

                <li>
                  <button className={styles.panelLogout} onClick={() => { setMobileOpen(false); alert("Sign out"); }}>
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
