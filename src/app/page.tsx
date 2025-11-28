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
    <div className="min-h-screen bg-white text-black">
      <div className="px-[16px] lg:px-[24px] pt-[200px] pb-[64px] lg:pb-[96px]">
        <div className="space-y-6 text-center mx-auto flex flex-col items-center">
          <h1 className="text-[18px] leading-[1.25] tracking-[-0.02em]">
            Hello, I'm Connor <span className="rotate-180">👋</span>
          </h1>
          <p className="max-w-[400px] text-[18px] leading-[1.25] tracking-[-0.02em] opacity-50">
            I am the Director of Technology at
            <br /> Asimov Collective, an agency in New York.
          </p>
          <p className="text-[18px] leading-[1.25] tracking-[-0.02em] opacity-50">
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
