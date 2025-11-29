import React from "react";
import Grid from "../components/sections/projects/grid";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Connor Rothschild",
  description:
    "Interaction designer and engineer based in Texas. View my projects and work.",
});

export default function HomePage() {
  return (
    <div
      className="min-h-screen text-text"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--background-invert)",
      }}
    >
      <div className="px-[16px] lg:px-[24px] pt-[200px] pb-[64px] lg:pb-[120px]">
        <div className="space-y-6 text-left flex flex-col items-start max-w-[var(--outer-content-width)] mx-auto">
          <h1 className="text-[24px] leading-[1.25] tracking-[-0.02em]">
            Hello, I'm Connor <span className="rotate-180">👋</span>
          </h1>
          <p className="max-w-[400px] text-[18px] leading-[1.25] tracking-[-0.02em] text-text/50">
            I lead technology at Asimov Collective,{" "}
            <br className="hidden [@media(min-width:335px)]:block" />
            an agency in New York.
          </p>
          <p className="text-[18px] leading-[1.25] tracking-[-0.02em] text-text/50">
            Some websites I have worked on can be found below.
          </p>
        </div>
        <div className="mt-[64px] lg:mt-[144px]">
          <Grid />
        </div>
      </div>
    </div>
  );
}
