import { Metadata } from "next";

export interface PageMetadataOptions {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

export interface BaseMetadataConfig {
  siteName: string;
  siteUrl: string;
  defaultDescription: string;
  defaultImage: string;
  twitterHandle?: string;
}

const defaultConfig: BaseMetadataConfig = {
  siteName: "Connor Rothschild",
  siteUrl: process.env.VERCEL_PROJECT_PRODUCTION_URL 
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://connorrothschild.com",
  defaultDescription: "Connor Rothschild is an interaction designer and engineer based in Texas.",
  defaultImage: "/social.png",
  twitterHandle: "connorrothschild",
};

export function generatePageMetadata(
  options: PageMetadataOptions,
  config: Partial<BaseMetadataConfig> = {}
): Metadata {
  const finalConfig = { ...defaultConfig, ...config };
  const {
    title,
    description = finalConfig.defaultDescription,
    image = finalConfig.defaultImage,
    url,
    type = "website",
    publishedTime,
    modifiedTime,
    authors,
    tags,
  } = options;

  const fullTitle = title.includes(finalConfig.siteName) 
    ? title 
    : `${title} | ${finalConfig.siteName}`;

  const fullUrl = url ? `${finalConfig.siteUrl}${url}` : finalConfig.siteUrl;
  const fullImageUrl = image.startsWith("http") ? image : `${finalConfig.siteUrl}${image}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: finalConfig.siteName,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "en_US",
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && authors.length > 0 && { authors }),
      ...(tags && tags.length > 0 && { tags }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [fullImageUrl],
      ...(finalConfig.twitterHandle && { creator: `@${finalConfig.twitterHandle}` }),
    },
  };

  return metadata;
}

// Convenience function for article/blog post metadata
export function generateArticleMetadata(
  title: string,
  description?: string,
  image?: string,
  url?: string,
  publishedTime?: string,
  modifiedTime?: string,
  authors?: string[],
  tags?: string[]
): Metadata {
  return generatePageMetadata({
    title,
    description,
    image,
    url,
    type: "article",
    publishedTime,
    modifiedTime,
    authors,
    tags,
  });
}

// Convenience function for basic page metadata (no OpenGraph/Twitter)
export function generateBasicMetadata(
  title: string,
  description?: string
): Metadata {
  const siteName = "Connor Rothschild";
  const fullTitle = title.includes(siteName) 
    ? title 
    : `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description: description || "Connor Rothschild is an interaction designer and engineer based in Texas.",
  };
}
