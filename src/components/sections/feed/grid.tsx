"use client";

import React from "react";
import Navigation from "@/components/sections/navigation";
import BottomBox from "../bottom-box";
import SecondaryTitle from "@/components/typography/secondary";
import RightSide from "../right-side";
import InfiniteFeed from "./infinite-feed";
import type { FeedItemData } from "@/lib/feed";

interface GridProps {
  initialItems: FeedItemData[];
}

export default function Grid({ initialItems }: GridProps) {
  return (
    <div className="default-grid scrollbar-hide max-lg:flex max-lg:flex-col">
      <Navigation />
      <BottomBox>
        <SecondaryTitle>Interactions, thoughts, and ideas.</SecondaryTitle>
      </BottomBox>
      <RightSide>
        <InfiniteFeed initialItems={initialItems} />
      </RightSide>
    </div>
  );
}
