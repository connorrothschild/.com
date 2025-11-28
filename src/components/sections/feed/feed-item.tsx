import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
// Remove rehype imports
// import rehypeSanitize from "rehype-sanitize";
// import { defaultSchema } from "rehype-sanitize";
// import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";

import { APPLY_FISHEYE } from "./constants";
import { FeedItemInternal } from "./infinite-feed";
import { ArrowUpRightIcon } from "lucide-react";

// Remove isCentered from props
interface FeedItemProps {
  item: FeedItemInternal;
}

export default function FeedItem({ item }: FeedItemProps) {
  const isInteractionWithVideo = item.type === "Interaction" && item.videoSrc;

  // Ref for the element to track visibility
  const viewRef = useRef<HTMLDivElement>(null);
  // Check if the element is in the central 20% of the viewport
  const isInView = useInView(viewRef, {
    margin: "-30% 0px -30% 0px",
    once: true,
  });

  // Ref for the video element
  const videoRef = useRef<HTMLVideoElement>(null);

  // Effect to load and play video when in view
  useEffect(() => {
    if (isInteractionWithVideo && isInView && videoRef.current) {
      const videoElement = videoRef.current;
      if (videoElement.currentSrc !== item.videoSrc) {
        console.log(`Loading video: ${item.videoSrc}`);
        videoElement.src = item.videoSrc!;
        videoElement.play().catch((error) => {
          // Autoplay might be blocked, handle error
          console.error("Video autoplay failed:", error);
          // Optionally show controls if autoplay fails
          // videoElement.controls = true;
        });
      }
    }
    // We don't need to pause when out of view based on `once: true`
  }, [isInView, isInteractionWithVideo, item.videoSrc]);

  return (
    <div className="w-full">
      <div
        ref={viewRef}
        className={`w-full flex items-center justify-center select-none flex-shrink-0 mb-[64px] lg:mb-[48px]`}
      >
        <motion.div
          className={`w-full bg-white border border-black/10 text-black text-xl flex flex-col gap-4 p-4 overflow-hidden`}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex flex-col lg:flex-row gap-2 justify-between w-full lg:items-center flex-shrink-0 border-b border-black/10 pb-4">
            {/* Title and optional link */}

            <h3 className="max-lg:flex max-lg:items-center max-lg:justify-between max-lg:w-full text-[20px] tracking-[-0.02em] leading-[1.25] text-wrap-balance text-black">
              {item.title}
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block lg:inline-block align-middle ml-2 lg:mb-px text-black opacity-50 hover:opacity-100 active:opacity-100 transition-opacity duration-150"
                  aria-label={`Link for ${item.title}`}
                >
                  {/* Simple arrow icon */}
                  <ArrowUpRightIcon className="size-5" />
                </a>
              )}
            </h3>

            {/* Type and Date */}
            <p className="text-[14px] text-black opacity-50 leading-none shrink-0 lg:text-right ">
              {item.type} from{" "}
              {new Date(item.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Apply aspect ratio padding trick to this container */}
          <div className="flex-grow overflow-hidden relative">
            {isInteractionWithVideo ? (
              <div className="h-0 pt-[calc(1/1.56*100%)]">
                {/* Render poster image absolutely behind the video */}
                {item.posterSrc && (
                  <img
                    src={item.posterSrc}
                    alt={`${item.title} poster`}
                    // Use absolute positioning to fill the container, remove aspect ratio here
                    className="absolute inset-0 w-full h-full object-cover z-0 bg-gray-50 animate-pulse"
                    // Ensure the image loads quickly
                    loading="eager"
                  />
                )}
                <video
                  ref={videoRef}
                  key={item.videoSrc}
                  // Remove the poster attribute
                  // poster={item.posterSrc}
                  // Use absolute positioning to fill the container, remove aspect ratio here
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  preload="metadata"
                  muted
                  loop
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div
                className="text-black flex flex-col w-full font-sans 
                  prose
                  prose-p:my-2
                  prose-ol:my-1
                  prose-ul:my-1

                  prose-p:first:mt-0
                  prose-p:last:mb-0
                  
                  prose-p:text-black/80
                  prose-p:
                  prose-p:text-[18px]
                  prose-p:leading-[1.5]
                  prose-p:tracking-[-0.01em]
                  
                  prose-li:text-black/80
                  prose-li:
                  prose-li:text-[18px]
                  prose-li:leading-[1.5]
                  prose-li:tracking-[-0.01em]

                  prose-strong:font-normal
                  prose-strong:text-black
                  
                  prose-a:text-black
                  prose-a:opacity-50
                  prose-a:hover:opacity-100
                  prose-a:underline-offset-4
                  prose-a:decoration-black
                  prose-a:decoration-[0.5px]
                  prose-a:
                  prose-a:transition-opacity
                  
                  text-wrap-pretty"
              >
                <ReactMarkdown>{item.content}</ReactMarkdown>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
