"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ArticleSelector from "./article-selector";

interface ArticleLink {
  id: string;
  title: string;
  slug?: string;
  isExternal?: boolean;
  category: "technical" | "personal";
}

interface ArticleSidebarProps {
  articles: ArticleLink[];
}

interface ArticleMetadata {
  title: string;
  date: string;
}

export default function ArticleSidebar({ articles }: ArticleSidebarProps) {
  const params = useParams();
  const currentId = params?.id as string | undefined;
  const [articleMetadata, setArticleMetadata] =
    useState<ArticleMetadata | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentId) {
      setLoading(true);
      // Fetch article metadata
      fetch(`/api/writing/${currentId}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return null;
        })
        .then((data) => {
          if (data && data.title && data.date) {
            setArticleMetadata({ title: data.title, date: data.date });
          } else {
            setArticleMetadata(null);
          }
        })
        .catch(() => {
          setArticleMetadata(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setArticleMetadata(null);
      setLoading(false);
    }
  }, [currentId]);

  const formattedDate = articleMetadata
    ? new Date(articleMetadata.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    : null;

  return (
    <div className="flex flex-col">
      {/* {articleMetadata && !loading && (
        <div className="mb-8 lg:mb-12">
          <h2 className="text-[24px] lg:text-[48px] mb-2 lg:mb-4 leading-none tracking-[-0.04em] text-balance text-black">
            {articleMetadata.title}
          </h2>
          <p className="text-[18px] leading-none text-black/50 tracking-[-0.01em]">
            {formattedDate}
          </p>
        </div>
      )} */}
      <ArticleSelector articles={articles} />
    </div>
  );
}
