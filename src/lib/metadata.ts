import { Metadata } from "next";

// Constants to avoid repetition
const SITE_CONSTANTS = {
  NAME: "Connor Rothschild",
  DESCRIPTION:
    "Connor Rothschild is an interaction designer and engineer based in Texas.",
  DEFAULT_IMAGE: "/social-2025.png",
  TWITTER_HANDLE: "connorrothschild",
  HEADSHOT_IMAGE: "/images/me/headshot-2025.jpg",
  ABOUT_PATH: "/about",
  SOCIAL_LINKS: {
    TWITTER: "https://twitter.com/connorrothschild",
    LINKEDIN: "https://linkedin.com/in/connorrothschild",
    GITHUB: "https://github.com/connorrothschild",
  },
  WORK_INFO: {
    COMPANY: "Asimov Collective",
    COMPANY_URL: "https://asimovcollective.com",
    JOB_TITLE: "Lead Technology at Asimov Collective",
  },
} as const;

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
  jsonLd?: JsonLdData[];
}

export interface JsonLdData {
  "@context": string;
  "@type": string;
  [key: string]: any;
}

export interface ArticleJsonLdData extends JsonLdData {
  "@type": "Article";
  headline: string;
  description: string;
  image: string;
  author: {
    "@type": "Person";
    name: string;
    url?: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo?: {
      "@type": "ImageObject";
      url: string;
    };
  };
  datePublished: string;
  dateModified?: string;
  mainEntityOfPage?: {
    "@type": "WebPage";
    "@id": string;
  };
  keywords?: string[];
}

export interface PersonJsonLdData extends JsonLdData {
  "@type": "Person";
  name: string;
  description: string;
  url: string;
  image?: string;
  sameAs?: string[];
  jobTitle?: string;
  worksFor?: {
    "@type": "Organization";
    name: string;
    url?: string;
  };
}

export interface OrganizationJsonLdData extends JsonLdData {
  "@type": "Organization";
  name: string;
  description?: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}

export interface WebsiteJsonLdData extends JsonLdData {
  "@type": "WebSite";
  name: string;
  description: string;
  url: string;
  potentialAction?: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
}

export interface BaseMetadataConfig {
  siteName: string;
  siteUrl: string;
  defaultDescription: string;
  defaultImage: string;
  twitterHandle?: string;
}

// Helper function to get site URL consistently
function getSiteUrl(): string {
  return process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://connorrothschild.com";
}

// Helper function to build full URLs
function buildFullUrl(path?: string): string {
  const siteUrl = getSiteUrl();
  return path ? `${siteUrl}${path}` : siteUrl;
}

// Helper function to build full image URLs
function buildFullImageUrl(image: string): string {
  const siteUrl = getSiteUrl();
  return image.startsWith("http") ? image : `${siteUrl}${image}`;
}

// Helper function to build full logo URLs
function buildFullLogoUrl(logo?: string): string | undefined {
  if (!logo) return undefined;
  const siteUrl = getSiteUrl();
  return logo.startsWith("http") ? logo : `${siteUrl}${logo}`;
}

const defaultConfig: BaseMetadataConfig = {
  siteName: SITE_CONSTANTS.NAME,
  siteUrl: getSiteUrl(),
  defaultDescription: SITE_CONSTANTS.DESCRIPTION,
  defaultImage: SITE_CONSTANTS.DEFAULT_IMAGE,
  twitterHandle: SITE_CONSTANTS.TWITTER_HANDLE,
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
    jsonLd,
  } = options;

  const fullTitle = title.includes(finalConfig.siteName)
    ? title
    : `${title} | ${finalConfig.siteName}`;

  const fullUrl = buildFullUrl(url);
  const fullImageUrl = buildFullImageUrl(image);

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
      ...(finalConfig.twitterHandle && {
        creator: `@${finalConfig.twitterHandle}`,
      }),
    },
    ...(jsonLd &&
      jsonLd.length > 0 && {
        other: {
          "application/ld+json": JSON.stringify(jsonLd),
        },
      }),
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
  const jsonLd = publishedTime
    ? [
        generateArticleJsonLd(
          title,
          description || SITE_CONSTANTS.DESCRIPTION,
          image || SITE_CONSTANTS.DEFAULT_IMAGE,
          SITE_CONSTANTS.NAME,
          publishedTime,
          modifiedTime,
          url,
          tags
        ),
      ]
    : undefined;

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
    jsonLd,
  });
}

// Convenience function for basic page metadata (no OpenGraph/Twitter)
export function generateBasicMetadata(
  title: string,
  description?: string
): Metadata {
  const fullTitle = title.includes(SITE_CONSTANTS.NAME)
    ? title
    : `${title} | ${SITE_CONSTANTS.NAME}`;

  return {
    title: fullTitle,
    description: description || SITE_CONSTANTS.DESCRIPTION,
  };
}

// JSON-LD Generation Functions

export function generateArticleJsonLd(
  title: string,
  description: string,
  image: string,
  authorName: string,
  publishedTime: string,
  modifiedTime?: string,
  url?: string,
  keywords?: string[]
): ArticleJsonLdData {
  const siteUrl = getSiteUrl();

  const fullImageUrl = buildFullImageUrl(image);
  const fullUrl = buildFullUrl(url);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: fullImageUrl,
    author: {
      "@type": "Person",
      name: authorName,
      url: `${siteUrl}${SITE_CONSTANTS.ABOUT_PATH}`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONSTANTS.NAME,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}${SITE_CONSTANTS.DEFAULT_IMAGE}`,
      },
    },
    datePublished: publishedTime,
    ...(modifiedTime && { dateModified: modifiedTime }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
    ...(keywords && keywords.length > 0 && { keywords }),
  };
}

export function generatePersonJsonLd(
  name: string,
  description: string,
  jobTitle?: string,
  worksFor?: { name: string; url?: string },
  sameAs?: string[]
): PersonJsonLdData {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    description,
    url: siteUrl,
    image: `${siteUrl}${SITE_CONSTANTS.HEADSHOT_IMAGE}`,
    ...(jobTitle && { jobTitle }),
    ...(worksFor && {
      worksFor: {
        "@type": "Organization",
        name: worksFor.name,
        ...(worksFor.url && { url: worksFor.url }),
      },
    }),
    ...(sameAs && sameAs.length > 0 && { sameAs }),
  };
}

export function generateWebsiteJsonLd(
  name: string,
  description: string,
  searchUrl?: string
): WebsiteJsonLdData {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    description,
    url: siteUrl,
    ...(searchUrl && {
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: searchUrl,
        },
        "query-input": "required name=q",
      },
    }),
  };
}

export function generateOrganizationJsonLd(
  name: string,
  description: string,
  logo?: string,
  sameAs?: string[]
): OrganizationJsonLdData {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    description,
    url: siteUrl,
    ...(logo && { logo: buildFullLogoUrl(logo) }),
    ...(sameAs && sameAs.length > 0 && { sameAs }),
  };
}

// Helper function to generate default JSON-LD for the site
export function generateDefaultJsonLd(): JsonLdData[] {
  const siteUrl = getSiteUrl();

  return [
    generatePersonJsonLd(
      SITE_CONSTANTS.NAME,
      SITE_CONSTANTS.DESCRIPTION,
      SITE_CONSTANTS.WORK_INFO.JOB_TITLE,
      {
        name: SITE_CONSTANTS.WORK_INFO.COMPANY,
        url: SITE_CONSTANTS.WORK_INFO.COMPANY_URL,
      },
      [
        SITE_CONSTANTS.SOCIAL_LINKS.TWITTER,
        SITE_CONSTANTS.SOCIAL_LINKS.LINKEDIN,
        SITE_CONSTANTS.SOCIAL_LINKS.GITHUB,
      ]
    ),
    generateWebsiteJsonLd(
      SITE_CONSTANTS.NAME,
      `${SITE_CONSTANTS.DESCRIPTION} View my projects and work.`
    ),
  ];
}
