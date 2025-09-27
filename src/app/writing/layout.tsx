import React from "react";
import Navigation from "@/components/sections/navigation";
import BottomBox from "@/components/sections/bottom-box"; // Adjusted path
import RightSide from "@/components/sections/right-side"; // Adjusted path
import ArticleSelector from "@/components/sections/writing/article-selector"; // Adjusted path
import { getAllPosts, PostData } from "@/lib/posts";

const additionalArticleLinks = [
  {
    id: "vibe-coding",
    title: "A History of Vibe Coding",
    slug: "/vibe-coding/history",
    category: "technical" as const,
    isExternal: true,
  },
];

export default async function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch posts for the selector
  const posts: PostData[] = await getAllPosts();
  const articleLinks = posts
    // Note: Omitting technical posts for now
    .filter((post) => post.category === "personal")
    .map((post) => ({
      id: post.id,
      title: post.title,
      category: post.category as "technical" | "personal",
    }));

  return (
    <div className="default-grid scrollbar-hide max-lg:flex max-lg:flex-col">
      <Navigation />

      <BottomBox>
        {/* We need to pass the current slug here for active state, will handle next */}
        <ArticleSelector
          articles={[...articleLinks, ...additionalArticleLinks]}
        />
      </BottomBox>

      <RightSide>
        {/* Render the specific page content */}
        {children}
      </RightSide>
    </div>
  );
}
