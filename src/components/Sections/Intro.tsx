import { useState } from "react";
import SplitTextHeader from "@/components/Elements/SplitTextHeader";
import Image from "next/image";
import Balls from "../Elements/Balls";
import Header from "./Header";

export default function Intro() {
  const [showEmoji, setShowEmoji] = useState(false);

  return (
    <>
      <Header />
      <section className="sticky top-0 px-[20px] overflow-x-clip">
        <Image
          // https://x.com/ciguleva/status/1787339128700301588
          src="/tmp/shadows.png"
          alt=""
          width={1000}
          height={1000}
          className="fixed top-0 left-0 w-full h-full object-cover opacity-40 pointer-events-none"
          draggable={false}
        />
        {/* <iframe
        src="https://paveldogreat.github.io/WebGL-Fluid-Simulation/"
        className="absolute top-0 left-0 w-full h-full object-cover"
      /> */}
        <div className="fixed top-0 left-0 w-full h-full">
          <Balls showEmoji={showEmoji} />
        </div>
        {/* <Gradient /> */}
        <div className="hero max-w-4xl w-full mx-auto top-0 h-screen flex flex-col justify-center items-center">
          <div
            className="flex flex-col justify-between gap-8"
            // className="flex flex-col justify-between gap-8 bg-[#f6f6f650] px-[3.5rem] py-[5rem] rounded-[10px]"
            // style={{
            //   backdropFilter: "blur(20px)",
            //   boxShadow:
            //     "rgba(0, 0, 0, 0.03) -12px 9px 19px, rgba(0, 0, 0, 0.05) -5px 4px 16px, rgba(0, 0, 0, 0.06) -1px 1px 14px",
            // }}
          >
            <SplitTextHeader
              // scrollYProgress={scrollYProgress}
              phrase="👋 I’m Connor, a software & data visualization engineer in Texas. Clients call me when they want to make websites that are performant, beautiful, and fun."
              setShowEmoji={setShowEmoji}
            />
          </div>
        </div>
      </section>
    </>
  );
}
