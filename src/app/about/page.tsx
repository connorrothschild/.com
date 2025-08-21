import React from "react";
import Navigation from "@/components/sections/navigation";
import BottomBox from "@/components/sections/bottom-box";
import RightSide from "@/components/sections/right-side";
import ScrollAwareContent from "@/components/sections/bottom-box/scroll-aware-content";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata: Metadata = generatePageMetadata({
  title: "About",
  description:
    "Connor Rothschild is an interaction designer and engineer based in Texas.",
});

export default function AboutPage() {
  return (
    <div className="default-grid scrollbar-hide max-lg:flex max-lg:flex-col">
      <Navigation />

      <BottomBox>
        <ScrollAwareContent />
      </BottomBox>

      <RightSide>
        {/* Scrims */}
        <div className="absolute top-0 h-[50px] lg:h-[100px] w-full bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-[50px] lg:h-[100px] bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

        {/* Main Content */}
        <div
          id="scrollable-content"
          className="absolute inset-0 h-full w-full overflow-y-scroll scrollbar-hide py-[50px] lg:py-[100px] lg:pt-[37svh] text-wrap-pretty"
          style={{
            opacity: 0,
            animation: "fadeIn 0.5s ease-in-out 0.25s forwards",
          }}
        >
          <div className="text-white flex flex-col pb-[50px] lg:pb-[100px] w-full max-lg:max-w-none lg:max-w-[480px] lg:mx-auto max-lg:px-[24px] font-sans">
            {/* Title */}
            <h1 className="text-[36px] lg:text-[48px] mb-8 font-light leading-none tracking-[-0.02em] text-wrap-balance">
              About
            </h1>

            {/* Introduction */}
            <p className="text-neutral-400 font-light text-[20px] leading-[1.5] tracking-[-0.003em] mb-6 max-sm:text-[18px]">
              I'm an engineer based in Texas. I help lead technology at{" "}
              <a
                href="https://asimovcollective.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-200 underline-offset-4 decoration-neutral-200 decoration-[0.5px] font-light hover:text-white transition-colors"
              >
                Asimov Collective
              </a>
              .
            </p>

            <p className="text-neutral-400 font-light text-[20px] leading-[1.5] tracking-[-0.003em] mb-8 max-sm:text-[18px]">
              I have 6 years of experience in design and development. To date,
              I've worked on 67 projects (featured ones{" "}
              <Link
                href="/"
                className="text-neutral-200 underline-offset-4 decoration-neutral-200 decoration-[0.5px] font-light hover:text-white transition-colors"
              >
                here
              </Link>
              ), spanning web applications, data visualization, and user
              interfaces.
            </p>

            {/* Background */}
            <h2 className="text-white font-light tracking-[-0.02em] text-[36px] leading-[1.2] mb-4 mt-8">
              Personal
            </h2>

            <p className="text-neutral-400 font-light text-[20px] leading-[1.5] tracking-[-0.003em] mb-6 max-sm:text-[18px]">
              I live in Houston, Texas with my wife Chloe. I graduated from Rice
              University in 2021. Outside of work, I enjoy lifting weights.
            </p>

            {/* Contact */}
            <h2 className="text-white font-light tracking-[-0.02em] text-[36px] leading-[1.2] mb-4 mt-8">
              Contact
            </h2>

            <p className="text-neutral-400 font-light text-[20px] leading-[1.5] tracking-[-0.003em] mb-6 max-sm:text-[18px]">
              Although I'm content in my current role, I'd be happy to mentor
              those starting out, or learn from those with more experience. I'm
              also happy to provide technical advice and guidance free of
              charge.
            </p>

            <div className="mt-8 space-y-2">
              <p className="text-neutral-400 font-light text-[20px] leading-[1.5] tracking-[-0.003em] max-sm:text-[18px]">
                <a
                  href="mailto:connor@connorrothschild.com"
                  className="text-neutral-200 underline-offset-4 decoration-neutral-200 decoration-[0.5px] font-light hover:text-white transition-colors"
                >
                  connor@connorrothschild.com
                </a>
              </p>
              <p className="text-neutral-400 font-light text-[20px] leading-[1.5] tracking-[-0.003em] max-sm:text-[18px]">
                <a
                  href="https://twitter.com/connorrothschild"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-200 underline-offset-4 decoration-neutral-200 decoration-[0.5px] font-light hover:text-white transition-colors"
                >
                  @connorrothschild
                </a>
              </p>
            </div>
            <hr className="mt-24 mb-8 opacity-25" />
            <div className="text-neutral-400 font-light text-[20px] leading-[1.5] tracking-[-0.003em] max-sm:text-[18px]">
              <h2 className="text-white font-light tracking-[-0.02em] text-[36px] leading-[1.2] mb-4 mt-8">
                Past Versions of This Site
              </h2>

              <p className="text-neutral-400 font-light text-[20px] leading-[1.5] tracking-[-0.003em] max-sm:text-[18px]">
                You can take a look at how this site has evolved over the years:
              </p>
              <div className="mt-4 flex flex-col gap-2">
                {["v1", "v2", "v3", "v4", "v5", "v6"].map((version) => (
                  <a
                    href={`https://${version}.connorrothschild.com`}
                    key={version}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-neutral-400 underline-offset-4 decoration-neutral-200 font-light hover:text-white transition-colors"
                  >
                    &bull; {version.toUpperCase()}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RightSide>
    </div>
  );
}
