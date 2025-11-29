"use client";

import React from "react";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "cursor-pointer",
        "relative w-10 h-5 rounded-full",
        isDark ? "bg-text/50" : "bg-text/20"
      )}
      aria-label="Toggle dark mode"
      role="switch"
      aria-checked={isDark}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-bg",
          isDark && "translate-x-5"
        )}
        style={{
          transition:
            "all var(--theme-transition-duration) cubic-bezier(0.74, 0.05, 0.43, 1)",
        }}
      />
    </button>
  );
}
