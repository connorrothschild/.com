import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc"; // Use '/rsc' for App Router
import { PostData } from "@/lib/posts"; // Import the PostData type
import Image, { ImageProps } from "next/image"; // Import Image and ImageProps

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
      <div className="absolute top-0 h-[50px] lg:h-[100px] w-full bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-[50px] lg:h-[100px] bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

      {/* Modify prose classes here for body text styling */}
      <div
        className="absolute inset-0 h-full w-full overflow-y-scroll scrollbar-hide py-[50px] lg:py-[100px]"
        style={{
          // NOTE: Cannot use motion here because it breaks mdx-remote which is a server component.
          opacity: 0,
          animation: "fadeIn 0.5s ease-in-out 0.25s forwards",
        }}
      >
        <div
          className="text-white flex flex-col pb-[50px] lg:pb-[100px] w-full max-lg:max-w-none lg:max-w-[480px] lg:mx-auto max-lg:px-[24px] 
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
          <h2 className="text-[36px] lg:text-[48px] mb-2 font-light leading-none tracking-[-0.02em] not-prose text-wrap-balance">
            {article.title}
          </h2>
          <p className="text-[20px] mb-8 font-light text-white/80 not-prose">
            {formattedDate}
          </p>

          <MDXRemote source={article.content} components={mdxComponents} />
        </div>
      </div>
    </>
  );
}
