import React from "react";
import { Project, projects } from "@/data/projects";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata: Metadata = generatePageMetadata({
  title: "Projects",
  description: "A comprehensive list of all my projects and work.",
});

function generateSubtitle(project: Project) {
  const parts: string[] = [];

  if (project.client && project.client !== project.title) {
    parts.push(`for ${project.client}`);
  }

  // if (project.with) {
  //   if (project.client && project.client !== project.title) {
  //     parts.push(`with ${project.with}`);
  //   } else {
  //     parts.push(`With ${project.with}`);
  //   }
  // }

  if (parts.length === 0) {
    return null;
  }

  return (
    <span className="text-[16px] leading-none tracking-[-0.02em] opacity-50">
      {" "}
      {parts.join(" ")}
    </span>
  );
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="px-[16px] lg:px-[24px] pt-[48px] lg:pt-[64px] pb-[64px] lg:pb-[96px]">
        <div
          className="mx-auto"
          style={{ maxWidth: "var(--inner-content-width)" }}
        >
          <h1 className="text-[20px] leading-normal tracking-[-0.02em] mb-4">
            All Projects
          </h1>
          <p className="text-[20px] leading-normal tracking-[-0.02em]  opacity-50 mb-2">
            See featured projects{" "}
            <Link
              href="/"
              className="underline underline-offset-4 decoration-[1px]"
            >
              here
            </Link>
            .
          </p>
          <div className="mt-[64px] lg:mt-[96px]">
            <div className="space-y-4">
              {projects
                .slice()
                .reverse()
                .map((project, index) => (
                  <div key={index} className="">
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-balance block text-[18px] leading-[1.25] tracking-[-0.02em] hover:opacity-50 transition-opacity"
                      >
                        {project.title} {generateSubtitle(project)}
                      </a>
                    ) : (
                      <div className="text-[18px] leading-[1.25] tracking-[-0.02em]">
                        {project.title} {generateSubtitle(project)}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
