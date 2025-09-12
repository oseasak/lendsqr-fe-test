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
import { Star, Menu as MenuIcon } from "lucide-react";
import styles from "../styles/Navbar.module.scss";

type NavbarProps = {
  onToggleSidebar?: () => void;
  onToggleCollapse?: () => void;
  collapsed?: boolean;
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
  const tier = 2;

  // close dropdown on outside click
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

  // … renderStars stays same …

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.inner}>
          {/* Left: Hamburger + logo */}
          <div className={styles.left}>
            <button
              type="button"
              className={styles.hamburgerBtn}
              aria-label="Open sidebar"
              aria-controls="mobile-sidebar"
              onClick={() => {
                if (typeof window !== "undefined" && window.innerWidth < 768) {
                  onToggleSidebar?.();
                }
              }}
            >
              <MenuIcon className={styles.iconSmall} />
            </button>

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

          {/* Center search */}
          <div className={styles.center}>
            <div className={styles.searchWrap}>
              <SearchBar />
            </div>
          </div>

          {/* Right (desktop) */}
          <div className={styles.desktopRight}>
            {/* ... docs link, collapse button, notifications ... */}

            {/* Profile menu (desktop only) */}
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
                        <button className={styles.menuLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile avatar button + dropdown */}
          <div className={styles.mobileWrap}>
            <button
              ref={avatarBtnRef}
              type="button"
              aria-label="Open profile menu"
              className={styles.mobileAvatarBtn}
              onClick={() => setMobileProfileOpen((p) => !p)}
            >
              <Image
                src="/images/Avatar.png"
                alt="User Avatar"
                width={44}
                height={44}
                className={styles.avatar}
              />
            </button>

            {mobileProfileOpen && (
              <div
                ref={profileDropdownRef}
                className={styles.mobileDropdown}
                role="menu"
              >
                <ul>
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
                    <button className={styles.menuLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
