"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import PrimaryTitle from "@/components/typography/primary";
import { easeInOutQuint } from "@/config/eases";
import { ArrowRightIcon } from "lucide-react";
import { ThemeToggle } from "@/components/helpers/theme-toggle";

const navItems = [
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Writing",
    href: "/writing/ai-is-the-pulley", // For now just navigate to the first article
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Feed",
    href: "/feed",
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const getRootPathname = (pathname: string) => {
    const pathnameParts = pathname.split("/");
    return `/${pathnameParts[1]}`;
  };
  const rootPathname = getRootPathname(pathname);
  const isHome = rootPathname === "/";

  return (
    <motion.div
      // layoutId="navigation"
      // layout="position"
      className="z-50 fixed top-0 left-1/2 -translate-x-1/2 p-[16px] lg:p-[24px] flex justify-between items-center w-full max-w-[calc(var(--outer-content-width)_+_48px)] mx-auto"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--background-invert)",
        transition:
          "background-color var(--theme-transition-duration) cubic-bezier(0.74, 0.05, 0.43, 1)",
      }}
      // transition={{
      //   duration: 0.75,
      //   ease: easeInOutQuint,
      // }}
    >
      <Link
        href="/"
        className="md:flex-1 text-left text-[16px] leading-none tracking-[-0.02em] text-text"
      >
        <span className="hidden sm:block">Connor Rothschild</span>
        <span className="block sm:hidden">CR</span>
      </Link>

      <div className="flex-1 flex justify-center items-center">
        <ThemeToggle />
      </div>

      <div className="flex-1 text-right justify-end flex gap-1 items-center">
        {navItems.map((item, index) => (
          <Link
            key={`nav-${index}`}
            className={cn(
              "text-[16px] leading-none tracking-[-0.02em] cursor-pointer text-text",
              getRootPathname(item.href) === rootPathname
                ? "text-text"
                : "text-text/50 hover:text-text active:text-text",
              "transition-colors"
            )}
            href={item.href}
          >
            {item.label}
            {index !== navItems.length - 1 && ", "}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
