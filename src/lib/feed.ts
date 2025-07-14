import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Define the structure for a Feed Item based on expected frontmatter
export interface FeedItemData {
  id: string;
  title: string;
  date: string;
  type: string; // Assuming 'type' is used instead of 'category'
  content: string;
  videoSrc?: string; // Add optional video source field
  link?: string; // Optional external link
  posterSrc?: string; // Add optional poster image source
  // Add other relevant fields from your feed markdown frontmatter if necessary
  // e.g., image?: string;
  unlisted?: boolean;
  hidden?: boolean; // Optional property to hide item from feed
}

// Directory where feed markdown files are stored
const feedDirectory = path.join(process.cwd(), "src", "content", "feed");

/**
 * Fetches a single feed item by its ID (filename without extension).
 * Reads the markdown file, parses frontmatter and content.
 */
export async function getFeedItem(id: string): Promise<FeedItemData> {
  const fullPath = path.join(feedDirectory, `${id}.md`);
  // Add handling for .mdx if needed, similar to posts.ts
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Feed item not found: ${id}.md`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    id,
    title: data.title || "Untitled Feed Item",
    date: data.date || new Date().toISOString(),
    type: data.type || "General", // Default type
    content: content,
    videoSrc: data.videoSrc, // Read videoSrc from frontmatter
    link: data.link, // Read link from frontmatter
    posterSrc: data.posterSrc, // Read posterSrc from frontmatter
    unlisted: data.unlisted ?? false,
    hidden: data.hidden ?? false,
    // Map other frontmatter fields here:
    // image: data.image,
  };
}

/**
 * Gets all feed item IDs (filenames without extensions).
 */
export function getAllFeedItemIds() {
  try {
    const fileNames = fs.readdirSync(feedDirectory);
    return fileNames
      .filter((fileName) => /\.md$/.test(fileName)) // Only include .md files for now
      .map((fileName) => ({
        params: {
          id: fileName.replace(/\.md$/, ""),
        },
      }));
  } catch (error) {
    console.error("Error reading feed directory:", error);
    return [];
  }
}

/**
 * Fetches all feed items, processes them, filters unlisted items,
 * and sorts them by date (newest first).
 */
export async function getAllFeedItems(): Promise<FeedItemData[]> {
  const feedItemIds = getAllFeedItemIds();

  const allFeedItemsData = await Promise.all(
    feedItemIds.map(async ({ params }) => {
      try {
        const item = await getFeedItem(params.id);
        return item;
      } catch (error) {
        console.error(`Error fetching feed item ${params.id}:`, error);
        return null;
      }
    })
  );

  // Filter out nulls (errors during fetching) and unlisted items
  const filteredItems = allFeedItemsData.filter(
    (item): item is FeedItemData => item !== null && !item.unlisted
  );

  // Sort by date, newest first
  return filteredItems.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}
