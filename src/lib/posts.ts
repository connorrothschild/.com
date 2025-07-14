import fs from "fs";
import path from "path";
import matter from "gray-matter";

type TocItem = {
  value: string;
  depth: number;
  slug: string;
};

export type PostData = {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
  tableOfContents: TocItem[];
  showToc?: boolean;
  showTopImage?: boolean;
  image?: string;
  unlisted?: boolean;
};

const postsDirectory = path.join(process.cwd(), "src", "content", "posts");

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function extractTocItems(content: string): TocItem[] {
  const tocItems: TocItem[] = [];
  const lines = content.split("\n");
  let currentH2Slug = "";
  const usedSlugs = new Set<string>();

  lines.forEach((line) => {
    const headingMatch = line.match(/^(#{2,6})\s+(.*)/);
    if (headingMatch) {
      const depth = headingMatch[1].length;
      const value = headingMatch[2].replace(/\*\*/g, "").trim();

      let slug = slugify(value);

      if (depth === 2) {
        currentH2Slug = slug;
      } else if (depth > 2 && currentH2Slug) {
        slug = `${currentH2Slug}-${slug}`;
      }

      let uniqueSlug = slug;
      let counter = 1;
      while (usedSlugs.has(uniqueSlug)) {
        uniqueSlug = `${slug}-${counter}`;
        counter++;
      }
      usedSlugs.add(uniqueSlug);

      tocItems.push({
        value,
        depth,
        slug: uniqueSlug,
      });
    }
  });

  return tocItems;
}

export async function getPost(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  if (!fs.existsSync(fullPath)) {
    const mdxPath = path.join(postsDirectory, `${id}.mdx`);
    if (!fs.existsSync(mdxPath)) {
      throw new Error(`Post not found: ${id}.md or ${id}.mdx`);
    }
    const fileContents = fs.readFileSync(mdxPath, "utf8");
    const { data, content } = matter(fileContents);
    const tocItems = extractTocItems(content);

    return {
      id,
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      category: data.category || "General",
      content: content,
      tableOfContents: tocItems,
      showTopImage: data.showTopImage ?? false,
      showToc: data.showToc ?? false,
      image: data.image,
      unlisted: data.unlisted ?? false,
    };
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const tocItems = extractTocItems(content);

  return {
    id,
    title: data.title || "Untitled",
    date: data.date || new Date().toISOString(),
    category: data.category || "General",
    content: content,
    tableOfContents: tocItems,
    showTopImage: data.showTopImage ?? false,
    showToc: data.showToc ?? false,
    image: data.image,
    unlisted: data.unlisted ?? false,
  };
}

export function getAllPostIds() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((fileName) => /\.(md|mdx)$/.test(fileName))
      .map((fileName) => ({
        params: {
          id: fileName.replace(/\.(md|mdx)$/, ""),
        },
      }));
  } catch (error) {
    console.error("Error reading post directory:", error);
    return [];
  }
}

export async function getAllPosts(): Promise<PostData[]> {
  const postIds = getAllPostIds();

  const allPostsData = await Promise.all(
    postIds.map(async ({ params }) => {
      try {
        const post = await getPost(params.id);
        return post;
      } catch (error) {
        console.error(`Error fetching post ${params.id}:`, error);
        return null;
      }
    })
  );

  const filteredPosts = allPostsData.filter(
    (post): post is PostData => post !== null && !post.unlisted
  );

  return filteredPosts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}
