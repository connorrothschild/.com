// "use client";

import { cn } from "@/lib/utils";
// import { motion } from "motion/react";
import type React from "react";

export default function BottomBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "z-50 relative p-[16px] lg:p-[24px] border border-neutral-700 w-full lg:h-full flex flex-col justify-end",
        "border-r-transparent border-l-transparent lg:border-b-transparent"
      )}
      style={{
        gridColumn: "1 / span 2",
        gridRow: "2 / span 1",
        // FIXME: Can we make border instant...
        opacity: 0,
        animation: "fadeIn 0.5s ease-in-out 0.25s forwards",
      }}
    >
      {children}
    </div>
  );
}
