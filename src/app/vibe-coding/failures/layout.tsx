import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Vibe Coding Failures",
  description:
    "A collection of documented failures, security issues, and unintended consequences that have emerged as AI coding tools have become more widely adopted.",
});

export default function VibeCodingFailuresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
