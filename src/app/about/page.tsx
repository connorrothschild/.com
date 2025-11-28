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
    <div className="min-h-screen bg-white text-black">
      <div className="px-[16px] lg:px-[24px] pt-[48px] lg:pt-[64px] pb-[64px] lg:pb-[96px]">
        <div
          className="mx-auto"
          style={{ maxWidth: "var(--inner-content-width)" }}
        >
          <Image
            src="/images/me/headshot-2025.jpg"
            alt="Connor Rothschild"
            width={500}
            height={500}
            className="w-full max-w-[300px] mb-8 rounded-xl border border-black/10"
          />
          {/* Introduction */}
          <p className="text-[18px] leading-[1.5] tracking-[-0.01em] mb-6  text-black/80">
            I'm an engineer based in Texas. I help lead technology at{" "}
            <a
              href="https://asimovcollective.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black opacity-50 hover:opacity-100 underline underline-offset-4 decoration-[0.5px]  transition-opacity"
            >
              Asimov Collective
            </a>
            .
          </p>

          <p className="text-[18px] leading-[1.5] tracking-[-0.01em] mb-8  text-black/80">
            I have 6 years of experience in design and development. To date,
            I've worked on 68 projects (featured ones{" "}
            <Link
              href="/"
              className="text-black opacity-50 hover:opacity-100 underline underline-offset-4 decoration-[0.5px]  transition-opacity"
            >
              here
            </Link>
            ), spanning web applications, data visualization, and user
            interfaces.
          </p>

          {/* Background */}
          <h2 className="text-[36px] leading-[1.2] tracking-[-0.03em] text-black mb-4 mt-12 first:mt-0 ">
            Personal
          </h2>

          <p className="text-[18px] leading-[1.5] tracking-[-0.01em] mb-6  text-black/80">
            I live in Houston, Texas with my wife Chloe. I graduated from Rice
            University in 2021. Outside of work, I enjoy lifting weights.
          </p>

          {/* Contact */}
          <h2 className="text-[36px] leading-[1.2] tracking-[-0.03em] text-black mb-4 mt-12 ">
            Contact
          </h2>

          <p className="text-[18px] leading-[1.5] tracking-[-0.01em] mb-6  text-black/80">
            Although I'm content in my current role, I'd be happy to mentor
            those starting out, or learn from those with more experience. I'm
            also happy to provide technical advice and guidance free of charge.
          </p>

          <div className="mt-2 lg:mt-8 space-y-2">
            <p className="text-[18px] leading-[1.5] tracking-[-0.01em]  text-black/80">
              <a
                href="mailto:connor@connorrothschild.com"
                className="text-black opacity-50 hover:opacity-100 underline underline-offset-4 decoration-[0.5px]  transition-opacity"
              >
                connor@connorrothschild.com
              </a>
            </p>
            <p className="text-[18px] leading-[1.5] tracking-[-0.01em]  text-black/80">
              <a
                href="https://twitter.com/CL_Rothschild"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black opacity-50 hover:opacity-100 underline underline-offset-4 decoration-[0.5px]  transition-opacity"
              >
                @CL_Rothschild
              </a>
            </p>
          </div>
          <hr className="mt-24 mb-8 border-black/10" />
          <div className="text-[18px] leading-[1.5] tracking-[-0.01em]  text-black/80">
            <h2 className="text-[36px] leading-[1.2] tracking-[-0.03em] text-black mb-4 mt-12 ">
              Past Versions of This Site
            </h2>

            <p className="text-[18px] leading-[1.5] tracking-[-0.01em] mb-4  text-black/80">
              You can take a look at how this site has evolved over the years:
            </p>
            <div className="mt-4 flex flex-col gap-2">
              {["v1", "v2", "v3", "v4", "v5", "v6"].map((version) => (
                <a
                  href={`https://${version}.connorrothschild.com`}
                  key={version}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-black opacity-50 hover:opacity-100 underline underline-offset-4 decoration-[0.5px]  transition-opacity"
                >
                  &bull; {version.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
