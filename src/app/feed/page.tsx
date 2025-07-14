import React from "react";
import Feed from "@/components/sections/feed/grid";
import { getAllFeedItems, FeedItemData } from "@/lib/feed";

export default async function FeedPage() {
  const initialFeedItems: FeedItemData[] = await getAllFeedItems();

  return (
    <>
      <Feed initialItems={initialFeedItems} />
    </>
  );
}
