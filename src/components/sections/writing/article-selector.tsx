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
        "text-[16px] leading-[1.1] tracking-[-0.02em] cursor-pointer transition-colors ease-in-out", // Base styles + added transition
        // Apply conditional styling
        article.id === currentSlug
          ? "text-text" // Active style
          : "text-text/50 hover:text-text active:text-text" // Inactive style
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
        // Scroll the active link into view
        activeLink.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
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
      className={cn("flex flex-col gap-y-2 items-start")}
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
        <div className="w-full h-px bg-text/10 dark:bg-text/20 my-2" />
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
