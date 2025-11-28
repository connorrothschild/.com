"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import type { FeedItemData } from "@/lib/feed"; // Import the type
import {
  APPLY_FISHEYE,
  FISHEYE_AMOUNT,
  MIN_SCALE,
  IS_INFINITE,
  // ITEM_TOTAL_VH, // Removed
} from "./constants";
import FeedItem from "./feed-item";

// Use FeedItemData, adding a uniqueId for React keys during cloning
export interface FeedItemInternal extends FeedItemData {
  uniqueId: string;
  posterSrc?: string;
}

// Define props for InfiniteFeed
interface InfiniteFeedProps {
  initialItems: FeedItemData[];
}

const InfiniteFeed: React.FC<InfiniteFeedProps> = ({ initialItems }) => {
  // Filter out hidden items
  const filteredInitialItems = initialItems.filter((item) => !item.hidden);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<FeedItemInternal[]>(() => {
    // Initialize state with two copies of filteredInitialItems for buffer if IS_INFINITE,
    // otherwise just one copy.
    const initialDataWithIds = filteredInitialItems.map((item, index) => ({
      ...item,
      uniqueId: `${item.id}-initial-${index}`,
    }));

    if (IS_INFINITE) {
      return [
        ...initialDataWithIds.map((item) => ({
          ...item,
          uniqueId: `${item.uniqueId}-clone1-${Date.now()}-${Math.random()}`,
        })),
        ...initialDataWithIds.map((item) => ({
          ...item,
          uniqueId: `${item.uniqueId}-clone2-${Date.now()}-${Math.random()}`,
        })),
      ];
    } else {
      // If not infinite, just return the single set of items
      return initialDataWithIds;
    }
  });
  // const itemHeightRef = useRef<number>(0); // Store calculated height in pixels - REMOVED
  // const listHeightRef = useRef<number>(0); // Store height of one full list segment - REMOVED
  const isUpdatingScrollRef = useRef<boolean>(false); // Prevent recursive scroll handling

  const handleScroll = useCallback(() => {
    if (
      isUpdatingScrollRef.current ||
      !scrollContainerRef.current ||
      // itemHeightRef.current === 0 || // REMOVED check
      filteredInitialItems.length === 0 // Don't run if no initial items
    ) {
      return;
    }

    const container = scrollContainerRef.current;
    // const itemHeight = itemHeightRef.current; // REMOVED
    // const listHeight = listHeightRef.current; // Height of one original list segment - REMOVED
    // const scrollThreshold = itemHeight * 1.5; // REMOVED

    // Define a fallback threshold (e.g., viewport height)
    const scrollThreshold = container.clientHeight; // Example fallback

    const { scrollTop, scrollHeight, clientHeight } = container;

    // Base data to clone from
    const baseItemsToClone = filteredInitialItems;

    // --- Scrolling Down --- Check near bottom
    if (scrollTop + clientHeight >= scrollHeight - scrollThreshold) {
      console.log("Near bottom, appending...");
      isUpdatingScrollRef.current = true;

      const currentScrollTop = container.scrollTop;
      setItems((currentItems) => [
        ...currentItems,
        // Clone from base filteredInitialItems
        ...baseItemsToClone.map((item) => ({
          ...item,
          uniqueId: `${item.id}-cloneDown-${Date.now()}-${Math.random()}`,
        })),
      ]);

      setTimeout(() => {
        // Clean up logic uses baseItemsToClone.length
        if (container.children.length > baseItemsToClone.length * 3) {
          console.log("Cleaning up top items...");
          const itemsToRemove = baseItemsToClone.length;
          // container.scrollTop = currentScrollTop - listHeight; // REMOVED listHeight adjustment
          console.log(
            `Adjusted scrollTop from ${currentScrollTop} to ${container.scrollTop} after cleanup`
          );
          setItems((currentItems) => currentItems.slice(itemsToRemove));
        }
        isUpdatingScrollRef.current = false;
      }, 0);
    }
    // --- Scrolling Up --- Check near top
    else if (scrollTop <= scrollThreshold) {
      console.log("Near top, prepending...");
      isUpdatingScrollRef.current = true;

      // Clone from base filteredInitialItems
      const newItems = baseItemsToClone.map((item) => ({
        ...item,
        uniqueId: `${item.id}-cloneUp-${Date.now()}-${Math.random()}`,
      }));

      // const adjustedScrollTop = scrollTop + listHeight; // REMOVED listHeight adjustment
      // container.scrollTop = adjustedScrollTop; // REMOVED scroll adjustment
      console.log(
        `Adjusted scrollTop from ${scrollTop} to ${container.scrollTop} before prepend`
      );

      setItems((currentItems) => [...newItems, ...currentItems]);

      setTimeout(() => {
        // Clean up logic uses baseItemsToClone.length
        if (container.children.length > baseItemsToClone.length * 3) {
          console.log("Cleaning up bottom items...");
          const itemsToRemove = baseItemsToClone.length;
          setItems((currentItems) => currentItems.slice(0, -itemsToRemove));
        }
        isUpdatingScrollRef.current = false;
      }, 0);
    } else {
      // --- Normal Scrolling ---
    }
  }, [filteredInitialItems]); // REMOVED applyFisheyeEffect from dependencies, use filteredInitialItems

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container && IS_INFINITE) {
      // Use a variable to store the rAF ID
      let scrollRafId: number | null = null;

      const onScroll = () => {
        // Cancel previous rAF if it exists
        if (scrollRafId !== null) {
          cancelAnimationFrame(scrollRafId);
        }
        // Schedule handleScroll within rAF
        scrollRafId = requestAnimationFrame(() => {
          handleScroll();
          scrollRafId = null; // Reset ID after execution
        });
      };

      container.addEventListener("scroll", onScroll, { passive: true });

      // Cleanup function
      return () => {
        container.removeEventListener("scroll", onScroll);
        // Cancel any pending rAF on cleanup
        if (scrollRafId !== null) {
          cancelAnimationFrame(scrollRafId);
        }
      };
    }
  }, [handleScroll, IS_INFINITE]); // Added IS_INFINITE dependency

  return (
    <div ref={scrollContainerRef} className="overflow-y-auto scrollbar-hide">
      {/* Render Items */}
      {items.map((item) => {
        return <FeedItem key={item.uniqueId} item={item} />;
      })}

      {IS_INFINITE ? null : (
        <button
          onClick={() => {
            scrollContainerRef.current?.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className="block text-right w-max ml-auto cursor-pointer mt-[25px] lg:mt-[100px] text-black opacity-50 hover:opacity-100 transition-opacity"
        >
          Back to top
        </button>
      )}
    </div>
  );
};

export default InfiniteFeed;
