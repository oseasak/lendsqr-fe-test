// File: src/__tests__/Searchbar.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "@/components/Searchbar";

// --- Mocks ---

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  __esModule: true,
  Search: (props: any) => (
    <svg
      {...props}
      data-testid={props["data-testid"] || "search-icon"}
      aria-label={props["aria-label"] || "search"}
      role={props.role || "img"}
    />
  ),
  X: (props: any) => (
    <svg
      {...props}
      data-testid={props["data-testid"] || "close-icon"}
      aria-label={props["aria-label"] || "close"}
      role={props.role || "img"}
    />
  ),
}));

// Mock UI Input component (named export)
jest.mock("@/components/ui/input", () => ({
  __esModule: true,
  Input: (props: any) => <input {...props} data-testid="search-input" />,
}));

// Mock UI Button component (named export)
jest.mock("@/components/ui/button", () => ({
  __esModule: true,
  Button: ({ children, ...props }: any) => (
    <button {...props} data-testid="search-button">
      {children}
    </button>
  ),
}));

// --- Tests ---
describe("SearchBar component", () => {
  test("renders desktop form and input", () => {
    render(<SearchBar />);
    const form = screen.getByRole("search");
    expect(form).toBeInTheDocument();

    const input = screen.getByTestId("search-input");
    expect(input).toBeInTheDocument();

    const searchIcons = screen.getAllByTestId("search-icon");
    expect(searchIcons.length).toBeGreaterThan(0);
  });

  test("updates input value on change", () => {
    render(<SearchBar />);
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "test query" } });
    expect((input as HTMLInputElement).value).toBe("test query");
  });

  test("submits the form and calls console.log with query", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    render(<SearchBar />);
    const form = screen.getByRole("search");
    const input = screen.getByTestId("search-input");

    fireEvent.change(input, { target: { value: "search me" } });
    fireEvent.submit(form);

    expect(consoleSpy).toHaveBeenCalledWith("Search submitted:", "search me");
    consoleSpy.mockRestore();
  });

  test("clicking search button submits form", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    render(<SearchBar />);
    const input = screen.getByTestId("search-input");
    const button = screen.getByTestId("search-button");

    fireEvent.change(input, { target: { value: "button search" } });
    fireEvent.click(button);

    expect(consoleSpy).toHaveBeenCalledWith("Search submitted:", "button search");
    consoleSpy.mockRestore();
  });

  test("renders mobile search icon", () => {
    render(<SearchBar />);
    const searchIcons = screen.getAllByTestId("search-icon");
    expect(searchIcons.length).toBeGreaterThan(0);
  });

  test("negative scenario: empty input submit (no crash)", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

    render(<SearchBar />);
    const form = screen.getByRole("search");

    expect(() => fireEvent.submit(form)).not.toThrow();
    expect(consoleSpy).toHaveBeenCalledWith("Search submitted:", "");

    consoleSpy.mockRestore();
    consoleError.mockRestore();
  });
});
