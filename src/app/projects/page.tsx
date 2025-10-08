import React from "react";
import Navigation from "@/components/sections/navigation";
import BottomBox from "@/components/sections/bottom-box";
import RightSide from "@/components/sections/right-side";
import { projects } from "@/data/projects";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata: Metadata = generatePageMetadata({
  title: "Projects",
  description: "A comprehensive list of all my projects and work.",
});

export default function ProjectsPage() {
  return (
    <div className="default-grid scrollbar-hide max-lg:flex max-lg:flex-col">
      <Navigation />

      <BottomBox>
        <div className="">
          <h1 className="text-2xl lg:text-3xl font-light">All Projects</h1>
          <p className="text-base lg:text-base text-neutral-400 mt-2">
            See featured projects{" "}
            <Link
              href="/"
              className="underline underline-offset-4 decoration-[1px]"
            >
              here
            </Link>
            .
          </p>
        </div>
      </BottomBox>

      <RightSide>
        {/* Scrims */}
        {/* FIXME ABSTRACT? */}
        <div className="absolute top-0 h-[50px] w-full bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-[50px] bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

        {/* Modify prose classes here for body text styling */}
        <div
          className="absolute inset-0 h-full w-full overflow-y-scroll scrollbar-hide py-[50px] lg:py-[100px] lg:pt-[37svh]"
          style={{
            // NOTE: Cannot use motion here because it breaks mdx-remote which is a server component.
            opacity: 0,
            animation: "fadeIn 0.5s ease-in-out 0.25s forwards",
          }}
        >
          <div className="space-y-1.5 max-lg:max-w-none lg:max-w-[480px] lg:mx-auto max-lg:px-[16px]">
            {projects
              .slice()
              .reverse()
              .map((project, index) => (
                <div key={index} className="relative flex items-end text-white">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate text-2xl font-light hover:opacity-75 transition-opacity"
                    >
                      {project.title}
                    </a>
                  ) : (
                    <span className="truncate text-2xl font-light">
                      {project.title}
                    </span>
                  )}
                  {project.featured && (
                    <span className="opacity-75 ml-0.5 mb-auto">*</span>
                  )}
                  <span className="text-base opacity-50 ml-1 mb-px">
                    ({project.year})
                  </span>
                </div>
              ))}
          </div>
        </div>
      </RightSide>
    </div>
  );
}
