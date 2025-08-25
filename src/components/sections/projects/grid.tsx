"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { projects } from "@/data/projects";
import { easeInOutQuint } from "@/config/eases";
import Navigation from "@/components/sections/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  year: number | string;
  type: string;
  image?: string;
  url: string;
  filterCategory?: string;
  featured: boolean;
  titleWidth?: number;
  description?: string;
  archived?: boolean;
  audience?: string;
  blurDataURL?: string;
}

function ProjectItem({
  project,
  className,
  index,
}: {
  project: Project;
  className?: string;
  index: number;
}) {
  // const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.6,
          delay: 0.2 + index * 0.1,
          ease: easeInOutQuint,
        },
      }}
      exit={{
        opacity: 0,
      }}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "block group relative col-span-1 h-full overflow-hidden border border-neutral-700",
        index === 0 && "border-l-transparent",
        className
      )}
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={`/images/mobile-screens/${project.image}.webp`}
        alt={project.title}
        width={1000}
        height={1000}
        placeholder="blur"
        blurDataURL={project.blurDataURL}
        className="w-full h-full object-cover transition-all object-top opacity-75 group-hover:opacity-100 group-active:opacity-100"
        style={{
          transition: `opacity 300ms cubic-bezier(${easeInOutQuint.join(",")})`,
        }}
      />
      {/* Gradient scrim */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
      <div
        className="absolute inset-0 p-[16px] lg:p-[24px] z-[1] flex flex-col gap-2 justify-end translate-y-[22px] group-hover:translate-y-0 group-active:translate-y-0"
        style={{
          transition: `all 300ms cubic-bezier(${easeInOutQuint.join(",")})`,
        }}
      >
        <div className="text-[20px] lg:text-[24px] leading-none tracking-[-0.02em] font-light opacity-70 text-wrap-balance">
          {project.title}
        </div>

        <div
          className="text-[14px] leading-none tracking-[-0.02em] font-light opacity-0 group-hover:opacity-70 group-active:opacity-70"
          style={{
            transition: `opacity 300ms cubic-bezier(${easeInOutQuint.join(
              ","
            )})`,
          }}
        >
          {project.year}, {project.type}
        </div>
      </div>
    </motion.a>
  );
}

export default function Grid() {
  const featuredProjects = projects
    .filter((project) => project.featured === true)
    .reverse() as Project[];

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = gridRef.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      element.scrollLeft += e.deltaY;
    };

    element.addEventListener("wheel", handleWheel);

    // Cleanup function to remove the event listener
    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  return (
    <div ref={gridRef} className="default-grid scrollbar-hide">
      <Navigation />
      {featuredProjects.map((project, index) => (
        <ProjectItem key={index} project={project} index={index} />
      ))}
    </div>
  );
}
