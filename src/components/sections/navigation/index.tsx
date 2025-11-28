"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import PrimaryTitle from "@/components/typography/primary";
import { easeInOutQuint } from "@/config/eases";
import { ArrowRightIcon } from "lucide-react";

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
      className="bg-white z-50 fixed top-0 left-0 p-[16px] lg:p-[24px] flex justify-between items-center w-full"
      // transition={{
      //   duration: 0.75,
      //   ease: easeInOutQuint,
      // }}
    >
      <Link
        href="/"
        className="text-[16px] leading-none tracking-[-0.02em] text-black"
      >
        <span className="hidden sm:block">Connor Rothschild</span>
        <span className="block sm:hidden">CR</span>
      </Link>
      <div className="flex gap-1">
        {navItems.map((item, index) => (
          <Link
            key={`nav-${index}`}
            className={cn(
              "text-[16px] leading-none tracking-[-0.02em] cursor-pointer text-black",
              getRootPathname(item.href) === rootPathname
                ? "opacity-100"
                : "opacity-50 hover:opacity-100 active:opacity-100",
              "transition-opacity duration-150"
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
