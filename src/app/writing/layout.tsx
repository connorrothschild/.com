import React from "react";
import ArticleSelector from "@/components/sections/writing/article-selector"; // Adjusted path
import { getAllPosts, PostData } from "@/lib/posts";

export default async function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch posts for the selector
  const posts: PostData[] = await getAllPosts();
  const articleLinks = posts
    // Note: Omitting technical posts for now
    // .filter((post) => post.category === "personal")
    .map((post) => ({
      id: post.id,
      title: post.title,
      category: post.category as "technical" | "personal",
    }));

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="px-[16px] lg:px-[24px] pt-[48px] lg:pt-[64px] pb-[64px] lg:pb-[96px]">
        <div className="mx-auto" style={{ maxWidth: "var(--inner-content-width)" }}>
          <div className="mb-[64px] lg:mb-[96px]">
            <ArticleSelector
              articles={[
                ...articleLinks,
                // ...additionalArticleLinks
              ]}
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
