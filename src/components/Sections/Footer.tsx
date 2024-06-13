import { easeInOutQuint } from "@/config/eases";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Dot from "@/components/Elements/Dot";
import { ContactPopup } from "@/components/Elements/ContactPopup";

export default function Footer() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start center"],
  });

  const borderTopRadius = useTransform(
    scrollYProgress,
    [0, 1],
    ["0rem", "30px"]
    // { ease: easeInOutQuint }
  );

  return (
    <motion.footer
      className="bg-white h-[600px] relative group z-20 overflow-hidden rounded-t-[30px]"
      // style={{
      //   borderTopLeftRadius: borderTopRadius,
      //   borderTopRightRadius: borderTopRadius,
      // }}
      transition={{
        ease: easeInOutQuint,
      }}
      ref={container}
    >
      <div
        className="absolute top-0 left-0 bg-gradient-to-b from-transparent to-white w-full h-full z-10 group-hover:opacity-0 transition-opacity"
        style={{
          // Using inline styles here because tailwindcss-animate breaks transition w/ arbitrary values
          transitionDuration: "800ms",
          transitionTimingFunction: `cubic-bezier(${easeInOutQuint.join(",")})`,
        }}
      />
      <div className="p-8 md:p-10 flex flex-col md:flex-row justify-between w-full gap-12">
        <div className="flex w-full flex-col justify-start items-start relative z-10 gap-4">
          <p
            className="text-gray-700 font-sans font-light text-xl"
            style={{
              textWrap: "pretty",
            }}
          >
            The portfolio of software & data visualization engineer, Connor
            Rothschild.
          </p>
          <p className="text-gray-700 font-sans font-light text-xl">
            Connect on{" "}
            <a
              href="https://www.linkedin.com/in/connor-rothschild/"
              className="text-gray-900"
            >
              LinkedIn
            </a>{" "}
            or{" "}
            <a
              href="https://twitter.com/CL_Rothschild"
              className="text-gray-900"
            >
              Twitter
            </a>
            .
          </p>
        </div>
        <div className="flex w-max min-w-[167px] flex-col justify-start md:items-end relative z-10">
          <ContactPopup>
            <button className="cursor-pointer group/button relative text-black font-sans text-lg flex flex-row gap-1.5 items-center px-8 py-2 rounded-full">
              <Dot classes="left-2 top-1/2 transform -translate-y-1/2 !absolute z-[-1] group-hover/button:w-full group-hover/button:h-full group-hover/button:left-0 transition-all" />
              Work with me
              {/* <ArrowRightIcon className="text-inherit h-4 w-4" /> */}
            </button>
          </ContactPopup>
        </div>
      </div>
      <h1
        className="font-serif italic absolute left-1/2 bottom-0 translate-y-[33%] transform -translate-x-1/2 text-black text-[26vw] font-light group-hover:translate-y-[10%] transition leading-none"
        style={{
          // Using inline styles here because tailwindcss-animate breaks transition w/ arbitrary values
          transitionDuration: "800ms",
          transitionTimingFunction: `cubic-bezier(${easeInOutQuint.join(",")})`,
        }}
      >
        CONNOR
      </h1>
    </motion.footer>
  );
}
