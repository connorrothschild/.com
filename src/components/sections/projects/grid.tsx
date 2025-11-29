"use client";

import React from "react";
import Image from "next/image";
import { projects } from "@/data/projects";
import { easeInOutQuint } from "@/config/eases";
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
  with?: string;
  client?: string;
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
  return (
    <motion.a
      // initial={{
      //   opacity: 0,
      // }}
      // animate={{
      //   opacity: 1,
      //   transition: {
      //     duration: 0.6,
      //     delay: 0.2 + index * 0.1,
      //     ease: easeInOutQuint,
      //   },
      // }}
      // exit={{
      //   opacity: 0,
      // }}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("block group relative overflow-hidden", className)}
    >
      <Image
        src={`/images/desktop-screens/${project.image}.webp`}
        alt={project.title}
        width={1000}
        height={1000}
        placeholder="blur"
        blurDataURL={project.blurDataURL}
        className="w-full h-auto object-cover object-bottom aspect-[3024/1898] border border-text/10 rounded"
      />
      <div className="mt-4 space-y-1.5">
        <div className="text-[16px] leading-none tracking-[-0.02em]">
          {project.title}
        </div>
        <div className="text-[16px] leading-none tracking-[-0.02em] mt-1 text-text/50 pb-1 text-balance">
          {project.client && `For ${project.client}`}
          {project.client && project.with && ` with ${project.with}`}
          {!project.client && project.with && `With ${project.with}`}
          {` in ${project.year}`}
        </div>
      </div>
    </motion.a>
  );
}

export default function Grid() {
  const featuredProjects = projects
    .filter((project) => project.featured === true)
    .reverse() as Project[];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-5 gap-y-12 w-full max-w-[var(--outer-content-width)] mx-auto">
      {featuredProjects.map((project, index) => (
        <ProjectItem key={index} project={project} index={index} />
      ))}
    </div>
  );
}
