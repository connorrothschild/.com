"use client";

import React, { useState } from "react";
import { Project } from "@/data/projects";

function generateSubtitle(project: Project) {
  const parts: string[] = [];

  if (project.client && project.client !== project.title) {
    parts.push(`for ${project.client}`);
  }

  if (project.year) {
    parts.push(`(${project.year})`);
  }

  if (parts.length === 0) {
    return null;
  }

  return (
    <span className="text-[16px] leading-none tracking-[-0.01em] text-text/50">
      {" "}
      {parts.join(" ")}
    </span>
  );
}

interface InlineProjectsListProps {
  projects: Project[];
}

export default function InlineProjectsList({
  projects,
}: InlineProjectsListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="dark:text-text/90 text-[18px] leading-[1.5] tracking-[-0.02em] text-justify"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {projects
        .slice()
        .reverse()
        .map((project, index) => (
          <React.Fragment key={index}>
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity inline"
                style={{
                  opacity:
                    hoveredIndex === null || hoveredIndex === index ? 1 : 0.25,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {project.title}
                {generateSubtitle(project)}
              </a>
            ) : (
              <span
                className="transition-opacity inline"
                style={{
                  opacity:
                    hoveredIndex === null || hoveredIndex === index ? 1 : 0.25,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {project.title}
                {generateSubtitle(project)}
              </span>
            )}
            {index < projects.length - 1 && (
              <span className="opacity-50">, </span>
            )}
          </React.Fragment>
        ))}
    </div>
  );
}
