import { Canvas } from "@react-three/fiber";
// import { Leva } from "leva";
// import Scene from "./Scene";
import { Suspense, useEffect, useLayoutEffect, useState } from "react";
import { useRef } from "react";
import {
  useScroll,
  motion,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import Dot from "../Elements/Dot";
import Archive from "./Archive";
import Footer from "./Footer";
import { ContactPopup } from "../Elements/ContactPopup";
import Header from "./Header";
import { Html, Loader, useProgress } from "@react-three/drei";

import { lazy } from "react";
import FullscreenLoader from "../FullscreenLoader";
const Scene = lazy(() => import("./Scene"));

export default function ProjectsScroll() {
  const ref = useRef(null);
  // const isInView = useInView(ref, { amount: "all" });

  // useEffect(() => {
  //   if (isInView) {
  //     document.body.classList.add("hide-hero");
  //   } else {
  //     document.body.classList.remove("hide-hero");
  //   }
  // }, [isInView]);

  return (
    <>
      <Header />
      <div className="z-20 relative bg-[--background]" ref={ref}>
        <Project
          title="Rainmaker"
          description="Web development"
          image="/images/mockups/rainmaker.jpg"
          url="https://www.makerain.com/"
          index={1}
        />
        <Project
          title="In the Dark"
          description="Data visualization"
          image="/images/mockups/rest-of-world.jpg"
          url="https://restofworld.org/2022/blackouts/"
          index={2}
        />
        <Project
          title="Minerva"
          description="Application development"
          image="/images/mockups/minerva.jpg"
          url="https://www.minervadata.xyz/"
          index={3}
        />
        <Project
          title="Tech's very bad year, in numbers"
          description="Data visualization"
          image="/images/mockups/tech-downturn.jpg"
          url="https://restofworld.org/2023/techs-bad-year-global-layoffs-data/"
          index={4}
        />
      </div>
      <Archive />
      <Footer />
    </>
  );
}

function Project({ title, description, image, url, index }) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // const ref = useRef(null);
  // const { scrollYProgress } = useScroll({
  //   target: ref,
  //   offset: ["start end", "end end"],
  // });

  // const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  //   const borderRadius = useTransform(scrollYProgress, [0, 1], ["0rem", "30px"]);

  const { active, progress, errors, item, loaded, total } = useProgress();

  return (
    <>
      {/* {index !== 1 && (
        <motion.div
          style={{
            opacity,
            zIndex: index,
          }}
          className="absolute top-0 left-0 bg-black/50 w-full h-full pointer-events-none overflow-hidden"
        />
      )} */}
      <FullscreenLoader show={progress !== 100 || !hasMounted} />
      <motion.div
        // ref={ref}
        className="sticky top-0 h-screen overflow-hidden"
        style={{
          zIndex: index + 1,
        }}
      >
        <div className="select-none absolute top-0 left-0 p-8 sm:p-12 z-50 flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-8">
          <h1
            className="pointer-events-none text-white font-sans font-extralight tracking-[-0.01em] text-[3rem] sm:text-[9vw] leading-[1] text-left"
            style={{
              textShadow: "-5px 0px 20px rgba(0,0,0,.25)",
            }}
          >
            {title}
          </h1>
          <div className="flex flex-col justify-between items-end gap-3 min-w-[300px]">
            <h2
              className="text-white font-sans font-light text-[max(14px,_1.5vw)] leading-[.85] text-right"
              style={{
                textShadow: "5px 0px 10px rgba(0,0,0,.35)",
              }}
            >
              {description}
            </h2>
            <Link
              href={url}
              className="flex items-center justify-center gap-2 text-[12px] bg-white px-4 py-2 rounded-full text-black font-sans font-light leading-none uppercase"
              style={{
                boxShadow:
                  "5px 0px 10px rgba(0,0,0,.15), 2px 2px 4px rgba(0,0,0,.05)",
              }}
            >
              Visit <Dot animated />
            </Link>
          </div>
        </div>
        <div className="z-50 absolute bottom-0 left-0 p-8 sm:p-12 text-white font-sans font-light text-[14px] leading-[.85] text-right uppercase opacity-80">
          Featured project 00{index}
        </div>
        <Canvas
          // pixelRatio={pixelRatio}
          linear={true}
          dpr={[0.5, 1.5]}
          gl={{
            antialias: false,
            preserveDrawingBuffer: true,
          }}
          // camera={{
          //   fov: 55,
          //   near: 0.1,
          //   far: 200,
          // }}
          className="!w-full !h-full"
        >
          <Scene image={image} />
        </Canvas>
      </motion.div>
    </>
  );
}

// function CustomLoader() {
//   const { active, progress, errors, item, loaded, total } = useProgress();
//   console.log({ active, progress, errors, item, loaded, total });
//   return (
//     <Html center className="text-[15vw]">
//       {progress}%
//     </Html>
//   );
// }
