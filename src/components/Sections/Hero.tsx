import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { easeInOutQuint } from "@/config/eases";

import CanvasGradient from "@/components/CanvasGradient";
import { useMediaQuery } from "usehooks-ts";

const LOADING_TIME = 3.5;

export default function Hero() {
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setHasLoaded(true);
    }, LOADING_TIME * 1000);
  }, []);

  // const [width, height] = useWindowSize();
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const defaultClipPath = "inset(0px 0px 0px 0px round 0)";
  const animatedClipPath = useMemo(
    () => `inset(20px 20px ${height - 78}px 20px round 10px)`,
    [height]
  );

  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef);

  const isMobile = useMediaQuery("(max-width: 768px)");

  // Add a class to the body when the hero is in view
  const heroRef = useRef(null);
  const heroIsInView = useInView(heroRef, {
    amount: 0.1,
  });

  useEffect(() => {
    if (heroIsInView) {
      document.body.classList.add("hero-in-view");
    } else {
      document.body.classList.remove("hero-in-view");
    }
  }, [heroIsInView]);

  return (
    <>
      {/* Create a dummy element that is 1px tall, at the top of the screen.
      This element will be representative of whether the page is fully scrolled to the top. */}
      <div ref={scrollRef} className="absolute top-0 left-0 w-full h-px" />
      <div
        className="pointer-events-none relative md:sticky top-0 left-0 z-10 max-md:rounded-b-[1rem] max-md:overflow-hidden"
        id="home"
        ref={heroRef}
      >
        <div
          className="transform-gpu flex items-center justify-center transform-origin-center w-screen overflow-hidden h-screen"
          style={{
            willChange: "clip-path",
            clipPath:
              isInView || !hasLoaded || isMobile
                ? defaultClipPath
                : animatedClipPath,
            transitionProperty: "clip-path",
            transitionDuration: "700ms",
            transitionTimingFunction: `cubic-bezier(${easeInOutQuint.join(
              ","
            )})`,
          }}
        >
          <CanvasGradient />
          <div className="hidden md:flex leading-none font-light text-right absolute bottom-0 right-0 p-4 text-xl flex-col text-gray-300 mix-blend-screen tracking-[0.0125rem] font-sans z-[49]">
            The portfolio of software & data visualization engineer, Connor
            Rothschild.
          </div>
          <div className="flex md:hidden leading-none font-light text-right absolute bottom-0 right-0 p-4 text-lg flex-col text-gray-300 mix-blend-screen tracking-[0.0125rem] font-sans z-[49]">
            2024 Portfolio
          </div>
          <Name hasLoaded={hasLoaded} />
        </div>
      </div>
    </>
  );
}

function Name({ hasLoaded }: { hasLoaded: boolean }) {
  return (
    <div
      className="select-none absolute top-0 left-0 z-1 h-full w-full flex flex-col md:flex-row text-center justify-center items-center mix-blend-hard-light"
      style={{
        gap: hasLoaded ? "1rem" : "0.25rem",
      }}
    >
      <div className="">
        <motion.div
          layout="position"
          className="font-sans text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] leading-[.85] text-white font-semibold tracking-[-0.01em]"
        >
          C
          {["o", "n", "n", "o", "r"].map((letter, i) => (
            <AnimatePresence key={i}>
              {hasLoaded && (
                <motion.span
                  key={i}
                  className="inline-block font-sans"
                  animate={{ translateX: 0, rotateY: 0, opacity: 1 }}
                  initial={{ translateX: "100%", rotateY: 90, opacity: 0 }}
                  // animate={{ translateY: 0, rotateY: 0, opacity: 1 }}
                  // initial={{ translateY: "100%", rotateY: 15, opacity: 0 }}
                  transition={{
                    ease: easeInOutQuint,
                    duration: 1,
                    delay: (i - 1) * (0.25 / 5),
                  }}
                >
                  {letter}
                </motion.span>
              )}
            </AnimatePresence>
          ))}
        </motion.div>
      </div>

      <div className="">
        <motion.div
          layout="position"
          className="font-sans text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] leading-[.85] text-white font-semibold tracking-[-0.01em]"
        >
          R
          {["o", "t", "h", "s", "c", "h", "i", "l", "d"].map((letter, i) => (
            <AnimatePresence key={i}>
              {hasLoaded && (
                <motion.span
                  className="inline-block font-sans"
                  animate={{ translateX: 0, rotateY: 0, opacity: 1 }}
                  initial={{ translateX: "100%", rotateY: 90, opacity: 0 }}
                  // animate={{ translateY: 0, rotateY: 0, opacity: 1 }}
                  // initial={{ translateY: "-100%", rotateY: -15, opacity: 0 }}
                  transition={{
                    ease: easeInOutQuint,
                    duration: 1,
                    delay: (i - 1) * (0.25 / 9),
                  }}
                >
                  {letter}
                </motion.span>
              )}
            </AnimatePresence>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
