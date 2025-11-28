import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc"; // Use '/rsc' for App Router
import { PostData } from "@/lib/posts"; // Import the PostData type
import Image, { ImageProps } from "next/image"; // Import Image and ImageProps
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import rehypeRaw from "rehype-raw";

// Define custom components
const mdxComponents = {
  // Map the HTML 'img' tag (from ![alt](src)) to the Next.js Image component
  img: (props: ImageProps) => (
    <Image
      sizes="100vw" // Provide default sizes or adjust as needed
      style={{ width: "100%", height: "auto" }} // Basic responsive styling
      {...props} // Spread the default props (like src, alt)
      // Ensure width and height are provided if image is local and cannot be inferred
      // You might need to adjust this based on how you structure image data/paths
      // If width/height aren't available in props, you might need defaults or error handling
      width={props.width || 500} // Example default width
      height={props.height || 300} // Example default height
      alt={props.alt || ""} // Provide default alt
    />
  ),
};

// Update the prop type to use PostData['content']
// Make the component async
export default function Article({ article }: { article: PostData }) {
  // Format the date using built-in Date object
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC", // Ensure consistency regardless of server/client timezone
  });

  return (
    <div className="flex flex-col w-full font-sans prose">
      <h2 className="text-[24px] lg:text-[48px] mb-2 lg:mb-4 leading-none tracking-[-0.04em] not-prose text-wrap-balance text-black">
        {article.title}
      </h2>
      <p className="text-[20px] leading-none mb-6 lg:mb-8 text-black/50 not-prose tracking-[-0.01em]">
        {formattedDate}
      </p>

      {/* <MDXRemote source={article.content} components={mdxComponents} /> */}
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-[36px] leading-[1.2] tracking-[-0.04em] text-black mb-4 mt-16 first:mt-0 font-normal">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-[36px] leading-[1.2] tracking-[-0.03em] text-black mb-4 mt-12 first:mt-0 font-normal">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-[24px] leading-[1.2] tracking-[-0.02em] text-black mb-4 mt-10 first:mt-0 font-normal">
              {children}
            </h3>
          ),
          p: ({ children, className }) => (
            <p
              className={cn(
                "text-[18px] leading-[1.5] tracking-[-0.01em] !my-2.5 text-black/70",
                className
              )}
            >
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="text-black font-normal">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="text-black/50 italic">{children}</em>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-black/50 underline underline-offset-4 decoration-[0.5px] transition-colors"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="text-black/60 space-y-2 !my-0">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="text-black/60 space-y-2 !my-0">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-black/60 relative text-[18px] leading-[1.5] tracking-[-0.01em] text-balance">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-black/10 pl-6 py-4 my-6">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="px-1 py-1 bg-black/10 text-black rounded text-sm font-mono">
                  {children}
                </code>
              );
            }
            return (
              <pre className="my-6 bg-black/5 border border-black/10 rounded-xl p-4 overflow-x-auto">
                <code className="text-black text-sm font-mono">{children}</code>
              </pre>
            );
          },
          pre: ({ children }) => (
            <pre className="not-prose bg-black/5 border border-black/10 rounded-xl p-4 overflow-x-auto my-6">
              {children}
            </pre>
          ),
          img: ({ src, alt }) => (
            <Image
              width={1200}
              height={1200}
              src={src || ""}
              alt={alt || ""}
              className="my-8 not-prose w-full rounded-xl border border-black/10"
            />
          ),
          video: ({ src, ...props }) => (
            <video
              src={src}
              className="my-8 w-full rounded-xl border border-black/10"
              controls
              {...props}
            />
          ),
        }}
      >
        {article.content}
      </ReactMarkdown>
    </div>
  );
}
