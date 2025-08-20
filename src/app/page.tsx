import React from "react";
import Grid from "../components/sections/projects/grid";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Connor Rothschild",
  description: "Interaction designer and engineer based in Texas. View my projects and work.",
});

export default function projects() {
  return (
    <>
      <Grid />
    </>
  );
}
