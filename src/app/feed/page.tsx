import React from "react";
import Feed from "@/components/sections/feed/grid";
import { getAllFeedItems, FeedItemData } from "@/lib/feed";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Feed",
  description: "Latest updates, thoughts, and work from Connor Rothschild.",
});

export default async function FeedPage() {
  const initialFeedItems: FeedItemData[] = await getAllFeedItems();

  return (
    <>
      <Feed initialItems={initialFeedItems} />
    </>
  );
}
