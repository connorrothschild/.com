# Metadata Utility Functions

This module provides utility functions for generating consistent metadata across your Next.js application, including OpenGraph, Twitter card metadata, and JSON-LD structured data.

## Functions

### `generatePageMetadata(options, config?)`

Generates complete metadata including OpenGraph and Twitter cards.

**Parameters:**
- `options: PageMetadataOptions` - The metadata options
- `config?: Partial<BaseMetadataConfig>` - Optional configuration override

**Example:**
```typescript
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "About",
  description: "Learn more about Connor Rothschild",
  image: "/about-image.jpg",
  url: "/about",
  type: "website"
});
```

### `generateArticleMetadata(title, description?, image?, url?, publishedTime?, modifiedTime?, authors?, tags?)`

Convenience function for blog posts and articles. Sets `type: "article"` and includes article-specific fields.

**Example:**
```typescript
import { generateArticleMetadata } from "@/lib/metadata";

export const metadata = generateArticleMetadata(
  "My Blog Post",
  "Description of the post",
  "/post-image.jpg",
  "/blog/my-post",
  "2024-01-01T00:00:00Z",
  "2024-01-02T00:00:00Z",
  ["Connor Rothschild"],
  ["design", "engineering"]
);
```

### `generateBasicMetadata(title, description?)`

Generates basic metadata without OpenGraph or Twitter cards. Useful for simple pages.

**Example:**
```typescript
import { generateBasicMetadata } from "@/lib/metadata";

export const metadata = generateBasicMetadata(
  "Simple Page",
  "Basic description"
);
```

## Configuration

The utility uses default configuration that can be overridden:

```typescript
const config = {
  siteName: "Connor Rothschild",
  siteUrl: "https://connorrothschild.com",
  defaultDescription: "Connor Rothschild is an interaction designer and engineer based in Texas.",
  defaultImage: "/social.png",
  twitterHandle: "connorrothschild"
};
```

## PageMetadataOptions Interface

```typescript
interface PageMetadataOptions {
  title: string;                    // Page title
  description?: string;             // Page description
  image?: string;                   // Image URL (relative or absolute)
  url?: string;                     // Page URL (relative)
  type?: "website" | "article";     // OpenGraph type
  publishedTime?: string;           // ISO date string for articles
  modifiedTime?: string;            // ISO date string for articles
  authors?: string[];               // Array of author names
  tags?: string[];                  // Array of tags
}
```

## Usage Examples

### Basic Page
```typescript
export const metadata = generatePageMetadata({
  title: "Contact",
  description: "Get in touch with Connor Rothschild"
});
```

### Blog Post
```typescript
export const metadata = generateArticleMetadata(
  post.title,
  post.excerpt,
  post.featuredImage,
  `/blog/${post.slug}`,
  post.publishedAt,
  post.updatedAt,
  [post.author],
  post.tags
);
```

### Custom Configuration
```typescript
export const metadata = generatePageMetadata(
  {
    title: "Custom Page",
    description: "Custom description"
  },
  {
    siteName: "Custom Site",
    defaultImage: "/custom-social.png"
  }
);
```

## JSON-LD Structured Data

The utility also generates JSON-LD structured data for better SEO and rich snippets:

### Article JSON-LD
```typescript
import { generateArticleJsonLd } from "@/lib/metadata";

const articleJsonLd = generateArticleJsonLd(
  "My Blog Post",
  "Post description",
  "/post-image.jpg",
  "Author Name",
  "2024-01-01T00:00:00Z",
  "2024-01-02T00:00:00Z",
  "/blog/my-post",
  ["design", "engineering"]
);
```

### Person JSON-LD
```typescript
import { generatePersonJsonLd } from "@/lib/metadata";

const personJsonLd = generatePersonJsonLd(
  "Connor Rothschild",
  "Interaction designer and engineer",
  "Director of Technology at Asimov Collective",
  { name: "Asimov Collective", url: "https://asimovcollective.com" },
  ["https://twitter.com/connorrothschild"]
);
```

### Website JSON-LD
```typescript
import { generateWebsiteJsonLd } from "@/lib/metadata";

const websiteJsonLd = generateWebsiteJsonLd(
  "Connor Rothschild",
  "Personal website and portfolio"
);
```

## Benefits

- **Consistency**: All pages use the same metadata structure
- **DRY**: No more duplicated OpenGraph, Twitter, and JSON-LD configurations
- **Maintainability**: Update metadata patterns in one place
- **Flexibility**: Easy to override defaults when needed
- **Type Safety**: Full TypeScript support with interfaces
- **SEO Rich**: Includes structured data for better search engine understanding
