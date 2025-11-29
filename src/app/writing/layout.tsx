import React from "react";
import ArticleSidebar from "@/components/sections/writing/article-sidebar";
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
      <div className="px-[16px] lg:px-[24px] pt-[200px] pb-[64px] lg:pb-[96px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">
          {/* Left Sidebar */}
          <div className="max-lg:mb-12 lg:sticky lg:top-[96px] lg:self-start w-full max-w-[var(--inner-content-width)] mx-auto">
            <ArticleSidebar
              articles={[
                ...articleLinks,
                // ...additionalArticleLinks
              ]}
            />
          </div>
          {/* Right Content */}
          <div className="w-full">
            <div className="w-full max-w-[var(--inner-content-width)] mx-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
