import React from "react";
import { projects } from "@/data/projects";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import Link from "next/link";
import InlineProjectsList from "@/components/sections/projects/inline-list";

export const metadata: Metadata = generatePageMetadata({
  title: "Projects",
  description: "A comprehensive list of all my projects and work.",
});

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="px-[16px] lg:px-[24px] pt-[200px] pb-[64px] lg:pb-[96px]">
        <div className="w-full max-w-[var(--inner-content-width)] mx-auto">
          <h1 className="text-[18px] leading-normal tracking-[-0.02em] mb-1">
            All Projects
          </h1>
          <p className="text-[18px] leading-normal tracking-[-0.02em] opacity-50">
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
            <InlineProjectsList projects={projects} />
          </div>
        </div>
      </div>
    </div>
  );
}
