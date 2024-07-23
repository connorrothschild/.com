import React from "react";
import Header from "./Sections/Header";
import { motion } from "framer-motion";

export const perspective = {
  initial: {
    scale: 1,
    y: 0,
  },
  enter: {
    scale: 1,
    y: 0,
  },
  exit: {
    scale: 0.9,
    y: 100,
    opacity: 0.5,
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const slide = {
  initial: {
    y: "-100vh",
  },
  enter: {
    y: "-100vh",
  },
  exit: {
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.25,
    },
  },
};

export const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 1,
  },
};

const anim = (variants: any) => {
  return {
    initial: "initial",
    animate: "enter",
    exit: "exit",
    variants,
  };
};

export default function PageTransitionWrapper({ children }: { children: any }) {
  return (
    <div className={`relative z-10 bg-[--background]`}>
      <motion.div
        className={`h-screen w-full fixed top-0 left-0 z-10 bg-[--background]`}
        {...anim(slide)}
      />
      <motion.div
        className={`bg-[--background] min-h-screen origin-bottom`}
        {...anim(perspective)}
      >
        <motion.div {...anim(opacity)}>
          <div>{children}</div>
        </motion.div>
      </motion.div>
    </div>
  );
}
