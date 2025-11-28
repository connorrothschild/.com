"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useEffect } from "react"; // Import useRef and useEffect
import Link from "next/link";
import { useParams } from "next/navigation"; // Import useParams

interface ArticleLink {
  id: string;
  title: string;
  slug?: string; // Only for manually added
  isExternal?: boolean;
  category: "technical" | "personal";
}

// New component for rendering individual article links
interface ArticleLinkItemProps {
  article: ArticleLink;
  currentSlug: string | null;
}

const ArticleLinkItem: React.FC<ArticleLinkItemProps> = ({
  article,
  currentSlug,
}) => {
  return (
    <Link
      key={article.id}
      href={article.slug || `/writing/${article.id}`}
      target={article.isExternal ? "_blank" : undefined}
      rel={article.isExternal ? "noopener noreferrer" : undefined}
      data-article-id={article.id}
      className={cn(
        "max-lg:snap-center shrink-0 whitespace-nowrap text-[16px] leading-[1.1] tracking-[-0.02em] cursor-pointer transition-opacity duration-150 ease-in-out", // Base styles + added transition
        // Apply conditional styling
        article.id === currentSlug
          ? "opacity-100" // Active style
          : "opacity-50 hover:opacity-100 active:opacity-100" // Inactive style
      )}
    >
      {article.title}
    </Link>
  );
};

export default function ArticleSelector({
  articles,
}: {
  articles: ArticleLink[];
}) {
  const params = useParams(); // Get route parameters
  const currentSlug = params?.id as string; // Extract the 'id' parameter (slug)
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref for the scrollable container

  useEffect(() => {
    if (scrollContainerRef.current && currentSlug) {
      // Find the active link element using a data attribute
      const activeLink = scrollContainerRef.current.querySelector(
        `[data-article-id="${currentSlug}"]`
      );

      if (activeLink) {
        // Check if the screen is mobile (using window.innerWidth as a proxy)
        // We only want to scroll horizontally on mobile
        if (window.innerWidth < 1024) {
          // Tailwind's 'lg' breakpoint is 1024px
          activeLink.scrollIntoView({
            behavior: "smooth", // Optional: smooth scrolling
            block: "nearest", // Align vertically to the nearest edge
            inline: "center", // Align horizontally to the start edge
          });
        } else {
          // Optional: On larger screens, you might want different behavior,
          // like scrolling vertically if the list is long.
          // For now, we only handle mobile horizontal scroll.
          // Consider adding vertical scrolling logic here if needed.
        }
      }
    }
  }, [currentSlug]); // Rerun effect when the slug changes

  // Group articles by category
  const techArticles = articles.filter(
    (article) => article.category === "technical"
  );
  const personalArticles = articles.filter(
    (article) => article.category === "personal"
  );

  return (
    <div
      ref={scrollContainerRef} // Attach the ref to the container
      className={cn(
        "flex flex-row flex-nowrap gap-x-4 gap-y-2 items-start scrollbar-hide",
        "max-lg:w-[calc(100%+48px)] -translate-x-[24px] px-[24px] max-lg:overflow-x-auto max-lg:snap-x",
        "lg:flex-col"
      )}
    >
      {/* Render Personal Articles */}
      {personalArticles.map((article) => (
        <ArticleLinkItem
          key={article.id}
          article={article}
          currentSlug={currentSlug}
        />
      ))}

      {/* Add a divider if both groups have articles */}
      {techArticles.length > 0 && personalArticles.length > 0 && (
        <div className="shrink-0 w-[2px] h-full lg:w-full lg:h-px bg-black/10 max-lg:mx-2 lg:my-2" />
      )}

      {/* Render Tech Articles */}
      {techArticles.map((article) => (
        <ArticleLinkItem
          key={article.id}
          article={article}
          currentSlug={currentSlug}
        />
      ))}
    </div>
  );
}
