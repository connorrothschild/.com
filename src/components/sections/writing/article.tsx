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
    <>
      {/* Scrims */}
      {/* FIXME ABSTRACT? */}
      <div className="absolute top-0 h-[50px] w-full bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-[50px] bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

      {/* Modify prose classes here for body text styling */}
      <div
        className="absolute inset-0 h-full w-full overflow-y-scroll scrollbar-hide py-[50px] lg:py-[100px] lg:pt-[37svh]"
        style={{
          // NOTE: Cannot use motion here because it breaks mdx-remote which is a server component.
          opacity: 0,
          animation: "fadeIn 0.5s ease-in-out 0.25s forwards",
        }}
      >
        <div
          className="text-white flex flex-col pb-[50px] lg:pb-[100px] w-full max-lg:max-w-none lg:max-w-[480px] lg:mx-auto max-lg:px-[16px] 
                  font-sans 
                  prose 
                  prose-p:mb-0
                  prose-p:mt-3
                  prose-invert 
                  
                  prose-p:text-neutral-400
                  prose-p:font-light
                  prose-p:text-[20px]
                  prose-p:leading-[1.5]
                  prose-p:tracking-[-0.003em]
                  
                  prose-li:text-neutral-400
                  prose-li:font-light
                  prose-li:text-[20px]
                  prose-li:leading-[1.5]
                  prose-li:tracking-[-0.003em]

                  prose-p:max-sm:text-[18px]
                  prose-li:max-sm:text-[18px]

                  prose-strong:font-normal
                  prose-strong:text-neutral-200
                  
                  prose-headings:text-white 
                  prose-headings:font-light

                  prose-headings:tracking-[-0.02em]
                  prose-h1:text-[36px]
                  prose-h1:leading-[1.2]
                  prose-h1:mb-2

                  prose-h2:text-[36px]
                  prose-h2:leading-[1.2]
                  prose-h2:mb-2

                  prose-h3:text-[20px]
                  prose-h3:leading-[1.2]
                  prose-h3:mb-2
                  
                  prose-a:text-neutral-200
                  prose-a:underline-offset-4
                  prose-a:decoration-neutral-200
                  prose-a:decoration-[0.5px]
                  prose-a:font-light
                  "
        >
          <h2 className="text-[20px] lg:text-[48px] mb-2 lg:mb-4 font-light leading-none tracking-[-0.02em] not-prose text-wrap-balance">
            {article.title}
          </h2>
          <p className="text-[20px] leading-none mb-6 lg:mb-8 font-light text-white/50 not-prose">
            {formattedDate}
          </p>

          {/* <MDXRemote source={article.content} components={mdxComponents} /> */}
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-light text-black mb-6 mt-8 first:mt-0">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-light text-black mb-4 mt-8 first:mt-0">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl !font-normal text-black mb-3 mt-8 first:mt-0">
                  {children}
                </h3>
              ),
              p: ({ children, className }) => (
                <p className={cn("text-base leading-relaxed mb-6", className)}>
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="text-black font-medium">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="text-white/90 italic">{children}</em>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!text-white/80 hover:!text-white/100 underline"
                >
                  {children}
                  {/* <ExternalLink className="w-3 h-3" /> */}
                </a>
              ),
              ul: ({ children }) => (
                <ul className="text-white/80 space-y-2 mb-6">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="text-white/80 space-y-2 mb-6">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="relative">
                  {/* <span className="absolute -left-6 text-white/40">
                          •
                        </span> */}
                  {children}
                </li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border border-l-white/50 border-white/15 px-6 md:px-8 py-4 md:py-6 my-6 rounded-r-lg">
                  {children}
                </blockquote>
              ),
              code: ({ children, className }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code className="px-1 py-1 bg-white/10 text-white/90 rounded text-sm font-mono">
                      {children}
                    </code>
                  );
                }
                return (
                  <pre className="my-6 bg-black/60 border border-white/10 rounded-xl p-4 overflow-x-auto">
                    <code className="text-white/90 text-sm font-mono">
                      {children}
                    </code>
                  </pre>
                );
              },
              pre: ({ children }) => (
                <pre className="not-prose bg-black/60 border border-white/10 rounded-xl p-4 overflow-x-auto my-6">
                  {children}
                </pre>
              ),
              img: ({ src, alt }) => (
                <Image
                  width={1200}
                  height={1200}
                  src={src || ""}
                  alt={alt || ""}
                  className="my-8 not-prose w-full rounded-xl border border-white/10"
                />
              ),
              video: ({ src, ...props }) => (
                <video
                  src={src}
                  className="my-8 w-full rounded-xl border border-white/10"
                  controls
                  {...props}
                />
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
}
