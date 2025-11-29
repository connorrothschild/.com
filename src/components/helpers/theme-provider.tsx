"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log("🎨 ThemeProvider: Initializing...");
    setMounted(true);
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    console.log("🎨 ThemeProvider: Saved theme from localStorage:", savedTheme);
    // Check system preference if no saved theme
    const systemTheme =
      !savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    const initialTheme = savedTheme || systemTheme;
    console.log("🎨 ThemeProvider: System theme:", systemTheme);
    console.log("🎨 ThemeProvider: Initial theme:", initialTheme);
    setTheme(initialTheme);
    updateTheme(initialTheme);
  }, []);

  const updateTheme = (newTheme: Theme) => {
    console.log("🎨 ThemeProvider: updateTheme called with:", newTheme);
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      const hasDark = html.classList.contains("dark");
      console.log("🎨 ThemeProvider: HTML element before update - has 'dark' class:", hasDark);
      
      if (newTheme === "dark") {
        html.classList.add("dark");
        console.log("🎨 ThemeProvider: Added 'dark' class to HTML");
      } else {
        html.classList.remove("dark");
        console.log("🎨 ThemeProvider: Removed 'dark' class from HTML");
      }
      
      const hasDarkAfter = html.classList.contains("dark");
      console.log("🎨 ThemeProvider: HTML element after update - has 'dark' class:", hasDarkAfter);
      console.log("🎨 ThemeProvider: HTML classes:", html.className);
      console.log("🎨 ThemeProvider: CSS variable --background:", getComputedStyle(html).getPropertyValue("--background"));
    }
  };

  const toggleTheme = () => {
    console.log("🎨 ThemeProvider: toggleTheme called");
    setTheme((currentTheme) => {
      console.log("🎨 ThemeProvider: Current theme state:", currentTheme);
      const newTheme = currentTheme === "light" ? "dark" : "light";
      console.log("🎨 ThemeProvider: New theme will be:", newTheme);
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme);
        console.log("🎨 ThemeProvider: Saved to localStorage:", newTheme);
      }
      updateTheme(newTheme);
      return newTheme;
    });
  };

  // Always provide context, even before mounting
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

