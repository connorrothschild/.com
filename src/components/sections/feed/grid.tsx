"use client";

import React from "react";
import InfiniteFeed from "./infinite-feed";
import type { FeedItemData } from "@/lib/feed";

interface GridProps {
  initialItems: FeedItemData[];
}

export default function Grid({ initialItems }: GridProps) {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="px-[16px] lg:px-[24px] pt-[48px] lg:pt-[64px] pb-[64px] lg:pb-[96px]">
        <div
          className="mx-auto"
          style={{ maxWidth: "var(--inner-content-width)" }}
        >
          <h1 className="text-[20px] leading-normal tracking-[-0.02em] mb-4">
            Feed
          </h1>
          <p className="text-[20px] leading-normal tracking-[-0.02em]  opacity-50 mb-2">
            Interactions, thoughts, and ideas.
          </p>
          <div className="mt-[64px] lg:mt-[96px]">
            <InfiniteFeed initialItems={initialItems} />
          </div>
        </div>
      </div>
    </div>
  );
}
