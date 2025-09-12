// src/__tests__/Navbar.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/Navbar";

// --- Mock Next.js components ---
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} data-testid={props.alt} />
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>
}));

// --- Mock SearchBar ---
jest.mock("@/components/Searchbar", () => () => <div data-testid="searchbar">Mock SearchBar</div>);

// --- Mock lucide-react icons ---
jest.mock("lucide-react", () => ({
  Menu: (props: any) => <svg data-testid="menu-icon" {...props} />
}));

// --- Mock NavigationMenu components ---
jest.mock("@/components/ui/navigation-menu", () => ({
  NavigationMenu: ({ children }: any) => <div>{children}</div>,
  NavigationMenuList: ({ children }: any) => <ul>{children}</ul>,
  NavigationMenuItem: ({ children }: any) => <li>{children}</li>,
  NavigationMenuTrigger: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  NavigationMenuContent: ({ children }: any) => <div>{children}</div>,
}));

describe("Navbar component", () => {
  test("renders logo, search bars, docs link, and notifications", () => {
    render(<Navbar />);

    // Logo (Dashboard link)
    expect(screen.getByAltText("Lendsqr Logo")).toBeInTheDocument();

    // SearchBars (desktop and mobile)
    const searchBars = screen.getAllByTestId("searchbar");
    expect(searchBars.length).toBe(2);

    // Docs link
    expect(screen.getByText("Docs")).toBeInTheDocument();

    // Notifications button (SVG)
    expect(screen.getByRole("button", { name: /notifications/i })).toBeInTheDocument();
  });

  test("calls onToggleSidebar when hamburger clicked", () => {
    const toggleSidebar = jest.fn();
    render(<Navbar onToggleSidebar={toggleSidebar} />);

    const hamburger = screen.getByTestId("menu-icon");
    fireEvent.click(hamburger);

    expect(toggleSidebar).toHaveBeenCalledTimes(1);
  });

  test("mobile avatar toggles mobile profile menu", () => {
    render(<Navbar />);

    const mobileAvatarBtn = screen.getByRole("button", { name: /open profile menu/i });
    fireEvent.click(mobileAvatarBtn);

    // Mobile profile dropdown should appear
    expect(screen.getByRole("menu")).toBeInTheDocument();

    // Click again should close menu
    fireEvent.click(mobileAvatarBtn);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  test("clicking Docs link works", () => {
    render(<Navbar />);
    const docsLink = screen.getByText("Docs");
    expect(docsLink.closest("a")).toHaveAttribute("href", "#");
  });
});
