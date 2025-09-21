import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "The History of Vibe Coding",
  description:
    "A comprehensive look at the evolution of vibe coding from GitHub Copilot's launch in 2021 to its current status as a mainstream development practice in 2025.",
});

export default function VibeCodingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
