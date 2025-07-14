import { getAllPostIds, getPost, PostData } from "@/lib/posts";
import Article from "@/components/sections/writing/article"; // Adjust path if needed
import { notFound } from "next/navigation";
import { Metadata } from "next"; // Import Metadata type

// This function tells Next.js which pages to build based on your post IDs (slugs)
export async function generateStaticParams() {
  const paths = getAllPostIds();
  // console.log("Generating static paths:", paths); // Optional: Log for debugging
  return paths;
}

// Define props for the page
type Props = {
  params: Promise<{
    id: string;
  }>;
};

// This is the component for the actual page /writing/[id]
export default async function PostPage({ params }: Props) {
  const { id } = await params;
  try {
    const articleData: PostData = await getPost(id);

    // Render just the Article component - the layout wraps it
    return <Article article={articleData} />;
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    // If getPost throws an error (e.g., post not found), show a 404 page
    notFound();
  }
}

// Optional: Add metadata generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const { title } = await getPost(id);
    return {
      title: `${title} | Connor Rothschild`,
      description:
        "Connor Rothschild is an interaction designer and engineer based in Texas.",
      // Add other metadata like description if available in frontmatter
    };
  } catch (error) {
    // Return default metadata if post fetch fails
    return {
      title: "Post Not Found",
    };
  }
}
