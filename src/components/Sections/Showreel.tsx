import React, { useRef } from "react";
import VideoPlayer from "../VideoPlayer";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Showreel() {
  const container = useRef(null);
  // const { scrollYProgress } = useScroll({
  //   target: container,
  //   offset: ["start end", "start center"],
  // });

  // const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // const translateY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div className="min-w-[400px] min-h-[400px] rounded-xl" ref={container}>
      <VideoPlayer />
    </div>
  );
}
