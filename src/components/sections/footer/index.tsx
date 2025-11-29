import React from "react";

export default function Footer() {
  return (
    <footer className="px-[16px] lg:px-[24px] py-[24px] border-t border-text/10">
      <div className="w-full max-w-[var(--outer-content-width)] mx-auto flex flex-row justify-between items-center text-[16px] leading-none tracking-[-0.02em] text-text/80">
        <p className="">Connor Rothschild © 2025</p>

        <a
          href="mailto:connor@connorrothschild.com"
          className="text-text/50 dark:text-text/60 hover:!text-text transition-colors"
        >
          Contact
        </a>
      </div>
    </footer>
  );
}
