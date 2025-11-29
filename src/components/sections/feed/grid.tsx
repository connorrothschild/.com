"use client";

import React from "react";
import InfiniteFeed from "./infinite-feed";
import type { FeedItemData } from "@/lib/feed";

interface GridProps {
  initialItems: FeedItemData[];
}

export default function Grid({ initialItems }: GridProps) {
  return (
    <div className="min-h-screen">
      <div className="px-[16px] lg:px-[24px] pt-[200px] pb-[64px] lg:pb-[120px]">
        <div className="w-full max-w-[var(--inner-content-width)] mx-auto">
          <h1 className="text-[24px] leading-normal tracking-[-0.02em]">
            Feed
          </h1>
          <p className="text-[18px] leading-normal tracking-[-0.02em] text-text/50">
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
