import React from "react";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = generatePageMetadata({
  title: "About",
  description:
    "Connor Rothschild is an interaction designer and engineer based in Texas.",
});

export default function AboutPage() {
  return (
    <div
      className="min-h-screen text-text"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--background-invert)",
      }}
    >
      <div className="px-[16px] lg:px-[24px] pt-[200px] pb-[64px] lg:pb-[120px]">
        <div className="w-full max-w-[var(--inner-content-width)] mx-auto">
          <Image
            src="/images/me/headshot-2025.jpg"
            alt="Connor Rothschild"
            width={500}
            height={500}
            className="w-full mb-8 rounded-xl border border-text/10"
          />
          {/* Introduction */}
          <p className="text-[18px] leading-[1.5] tracking-[-0.01em] mb-6 text-balance text-text/80">
            I'm an engineer based in Texas. I help lead technology at{" "}
            <a
              href="https://asimovcollective.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text/50 dark:text-text/60 hover:!text-text underline underline-offset-4 decoration-[0.5px] transition-colors"
            >
              Asimov Collective
            </a>
            .
          </p>

          <p className="text-[18px] leading-[1.5] tracking-[-0.01em] mb-8  text-text/80">
            I have 6 years of experience in design and development. To date,
            I've worked on 68 projects (featured ones{" "}
            <Link
              href="/"
              className="text-text/50 dark:text-text/60 hover:!text-text underline underline-offset-4 decoration-[0.5px] transition-colors"
            >
              here
            </Link>
            ), spanning web applications, data visualization, and user
            interfaces.
          </p>

          {/* Background */}
          <h2 className="text-[36px] leading-[1.2] tracking-[-0.03em] text-text mb-4 mt-12 first:mt-0 ">
            Personal
          </h2>

          <p className="text-[18px] leading-[1.5] tracking-[-0.01em] mb-6 text-balance text-text/80">
            I live in Houston, Texas with my wife Chloe. I graduated from Rice
            University in 2021. Outside of work, I enjoy lifting weights.
          </p>

          {/* Contact */}
          <h2 className="text-[36px] leading-[1.2] tracking-[-0.03em] text-text mb-4 mt-12 ">
            Contact
          </h2>

          <p className="text-[18px] leading-[1.5] tracking-[-0.01em] mb-6 text-balance text-text/80">
            Although I'm content in my current role, I'd be happy to mentor
            those starting out, or learn from those with more experience. I'm
            also happy to provide technical advice and guidance free of charge.
          </p>

          <div className="mt-2 lg:mt-8 space-y-2">
            <p className="text-[18px] leading-[1.5] tracking-[-0.01em]  text-text/80">
              <a
                href="mailto:connor@connorrothschild.com"
                className="text-text/50 dark:text-text/60 hover:!text-text underline underline-offset-4 decoration-[0.5px] transition-colors"
              >
                connor@connorrothschild.com
              </a>
            </p>
            <p className="text-[18px] leading-[1.5] tracking-[-0.01em]  text-text/80">
              <a
                href="https://x.com/CL_Rothschild"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text/50 dark:text-text/60 hover:!text-text underline underline-offset-4 decoration-[0.5px] transition-colors"
              >
                @CL_Rothschild
              </a>
            </p>
          </div>
          <hr className="mt-24 mb-8 border-text/10" />
          <div className="text-[18px] leading-[1.5] tracking-[-0.01em]  text-text/80">
            <h2 className="text-[36px] leading-[1.2] tracking-[-0.03em] text-text mb-4 mt-12 ">
              Past Versions of This Site
            </h2>

            <p className="text-[18px] leading-[1.5] tracking-[-0.01em] mb-4  text-text/80">
              You can take a look at how this site has evolved over the years:
            </p>
            <div className="mt-6 flex flex-row flex-wrap gap-2">
              {["v1", "v2", "v3", "v4", "v5", "v6"].map((version) => (
                <a
                  href={`https://${version}.connorrothschild.com`}
                  key={version}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-text/5 border border-text/10 dark:border-text/20 hover:bg-text/10 transition-colors text-text/75 rounded-sm px-4 py-2 text-[12px] leading-none tracking-[-0.01em]"
                >
                  {version.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
