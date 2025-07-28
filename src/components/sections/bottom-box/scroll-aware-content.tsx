"use client";

import React from "react";
import Image from "next/image";
import { useHasScrolled } from "@/hooks/useHasScrolled";
import { cn } from "@/lib/utils";

export default function ScrollAwareContent() {
  const hasScrolled = useHasScrolled("#scrollable-content");

  return (
    <div
      className={cn(
        "flex items-center justify-start lg:justify-center h-full overflow-hidden transition-all duration-300",
        "lg:!opacity-100", // Always visible on desktop
        hasScrolled ? "opacity-0" : "opacity-100"
      )}
    >
      <Image
        src="/images/me/headshot-2025.jpg"
        alt="Connor Rothschild"
        width={1000}
        height={1000}
        className={cn(
          "object-contain rounded overflow-hidden transition-all duration-300",
          hasScrolled ? "lg:size-72 size-0" : "size-24 md:size-48 lg:size-72"
        )}
      />
    </div>
  );
}
