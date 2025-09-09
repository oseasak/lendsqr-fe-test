"use client";

import Image from "next/image";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";

export function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between bg-white shadow-sm px-6 py-3">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Image
          src="/images/logo.png" // replace with your logo path
          alt="Lendsqr Logo"
          width={144.8}
          height={30}
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Docs link */}
        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
          Docs
        </a>

        {/* Notification Bell */}
        <button className="relative text-gray-600 hover:text-gray-900">
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
              d="M15 17h5l-1.405-1.405C18.21 14.79 18 13.918 18 13V9a6 6 0 00-9.33-4.98M9 17h6m-6 0a3 3 0 006 0m-6 0H5l1.405-1.405C6.79 14.79 7 13.918 7 13V9c0-1.657 1.343-3 3-3"
            />
          </svg>
        </button>

        {/* User Menu */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center space-x-2">
                <Image
                  src="/images/Avatar.png" // replace with user avatar path
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
                    <a href="#" className="text-gray-700 hover:text-gray-900 text-sm">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:text-gray-900 text-sm">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-red-600 hover:text-red-800 text-sm">
                      Logout
                    </a>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}