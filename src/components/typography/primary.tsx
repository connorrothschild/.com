import { cn } from "@/lib/utils";
import type React from "react";

export default function PrimaryTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "text-[min(9vw,48px)] lg:text-[72px] leading-[.9] tracking-[-0.02em] font-light",
        className
      )}
    >
      {children}
    </h1>
  );
}
