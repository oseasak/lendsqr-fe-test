// src/components/Navbar.tsx
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
import { Menu as MenuIcon } from "lucide-react";
import styles from "../styles/Navbar.module.scss";

type NavbarProps = {
  onToggleSidebar?: () => void; // mobile hamburger -> open/close sidebar
  onToggleCollapse?: () => void; // desktop collapse toggle
  collapsed?: boolean; // collapsed state for aria/title
};

export default function Navbar({
  onToggleSidebar,
  onToggleCollapse,
  collapsed,
}: NavbarProps) {
  const profileDropdownRef = useRef<HTMLDivElement | null>(null);
  const avatarBtnRef = useRef<HTMLButtonElement | null>(null);

  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);

  const userName = "Adedeji";

  // close profile dropdown on outside click (mobile)
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        mobileProfileOpen &&
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(e.target as Node) &&
        !avatarBtnRef.current?.contains(e.target as Node)
      ) {
        setMobileProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileProfileOpen]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.inner}>
          {/* Left: Hamburger (mobile only) + Logo */}
          <div className={styles.left}>
            <button
              type="button"
              className={styles.hamburgerBtn}
              aria-label="Open sidebar"
              onClick={() => onToggleSidebar?.()}
            >
              <MenuIcon className={styles.iconSmall} />
            </button>

            <Link href="/dashboard" className={styles.logoLink}>
              <Image src="/images/logo.png" alt="Lendsqr Logo" width={145} height={30} priority />
            </Link>
          </div>

          {/* Center: Search (hidden on small screens via CSS) */}
          <div className={styles.center}>
            <div className={styles.searchWrap}>
              <SearchBar />
            </div>
          </div>

          {/* Right (desktop): docs, collapse toggle, notifications, profile menu */}
          <div className={styles.desktopRight}>
            <a className={styles.docsLink} href="#">
              Docs
            </a>

            {/* Desktop collapse toggle */}
            <button
              aria-label="Toggle sidebar collapse"
              className={styles.notifButton}
              onClick={() => onToggleCollapse?.()}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {/* Reuse menu icon as compact toggle */}
              <MenuIcon className={styles.iconSmall} />
            </button>

            {/* Notifications */}
            <button aria-label="Notifications" className={styles.notifButton} title="Notifications">
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconSmall} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405C18.21 14.79 18 13.918 18 13V9a6 6 0 00-9.33-4.98M9 17h6m-6 0a3 3 0 006 0" />
              </svg>
            </button>

            {/* Desktop profile menu (NavigationMenu from your UI components) */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={styles.navMenuTrigger}>
                    <Image src="/images/Avatar.png" alt="User Avatar" width={44} height={44} className={styles.avatar} />
                    <span className={styles.userName}>{userName}</span>
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className={styles.navMenuContent}>
                    <ul className={styles.menuList}>
                      <li>
                        <Link href="/profile" className={styles.menuLink}>Profile</Link>
                      </li>
                      <li>
                        <Link href="/settings" className={styles.menuLink}>Settings</Link>
                      </li>
                      <li>
                        <button className={styles.menuLogout} onClick={() => alert("Sign out")}>Logout</button>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile: avatar-only button and small dropdown (separate from sidebar) */}
          <div className={styles.mobileWrap}>
            <button
              ref={avatarBtnRef}
              type="button"
              aria-label="Open profile menu"
              className={styles.mobileAvatarBtn}
              onClick={() => setMobileProfileOpen((p) => !p)}
            >
              <Image src="/images/Avatar.png" alt="User Avatar" width={44} height={44} className={styles.avatar} />
            </button>

            {mobileProfileOpen && (
              <div ref={profileDropdownRef} className={styles.mobileProfileDropdown} role="menu">
                <ul>
                  <li><Link href="/profile" className={styles.menuLink}>Profile</Link></li>
                  <li><Link href="/settings" className={styles.menuLink}>Settings</Link></li>
                  <li><button className={styles.menuLogout}>Logout</button></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
