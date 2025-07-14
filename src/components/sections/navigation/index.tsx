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
    href: "/",
  },
  {
    label: "Writing",
    href: "/writing/audacity-goes-the-furthest", // For now just navigate to the first article
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
      layoutId="navigation"
      layout="position"
      className={cn(
        "z-50 bg-black relative p-[24px] flex flex-col justify-between lg:h-full gap-[48px]",
        isHome
          ? "border-b max-lg:border-transparent lg:border-neutral-700"
          : "lg:border-r-transparent lg:border-l-transparent lg:border-b-transparent",
        isHome ? "lg:row-start-2" : "row-start-1",
        "max-lg:min-h-[157.98px] max-lg:h-[157.98px]",
        "col-start-1 col-span-2"
      )}
      transition={{
        duration: 0.75,
        ease: easeInOutQuint,
      }}
    >
      <PrimaryTitle className="lg:w-min">Connor Rothschild</PrimaryTitle>
      <div className="flex gap-[24px] lg:gap-[50px]">
        {navItems.map((item, index) => (
          <Link
            key={`nav-${index}`}
            className={cn(
              "text-[20px] lg:text-[24px] leading-none tracking-[-0.02em] font-light cursor-pointer",
              getRootPathname(item.href) === rootPathname
                ? "text-white"
                : "text-neutral-600 hover:text-neutral-300 active:text-neutral-300",
              "transition-colors duration-150"
            )}
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
      </div>
      {/* On homepage, on mobile, show arrow right */}
      {isHome && (
        <div className="block lg:hidden absolute bottom-[24px] right-[24px]">
          <ArrowRightIcon className="size-6 stroke-1" />
        </div>
      )}
    </motion.div>
  );
}
