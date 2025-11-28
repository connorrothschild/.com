import type React from "react";

export default function SecondaryTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="text-[20px] lg:text-[36px] leading-[.9] tracking-[-0.02em] text-wrap-balance">
      {children}
    </h2>
  );
}
