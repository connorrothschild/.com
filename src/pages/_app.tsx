import "@/styles/globals.css";
import type { AppProps } from "next/app";

import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";

const nyghtSerif = localFont({
  src: [
    {
      path: "./fonts/nyght-serif/NyghtSerif-Light.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-LightItalic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-Light.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-LightItalic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-Medium.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-MediumItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-Dark.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-DarkItalic.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "./fonts/nyght-serif/NyghtSerif-Dark.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-nyght",
});

const montreal = localFont({
  src: [
    {
      path: "./fonts/montreal/PPNeueMontreal-Book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/montreal/PPNeueMontreal-Medium.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "fallback",
  variable: "--font-montreal",
});

import Menu from "@/components/Menu";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "sonner";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";

// Add a global variable to track if the app has mounted
let isAppMounted = false;

export default function App({ Component, pageProps }: AppProps) {
  // We only want this loader on 1) fresh loads and 2) on the home page
  const router = useRouter();
  // // Add router pathname to data-router-pathname attribute on body
  // useEffect(() => {
  //   document.body.setAttribute("data-router-pathname", router.pathname);
  // }, [router.pathname]);

  // const LOADING_TIME = 3.5;

  // useEffect(() => {
  //   // On initial mount, check if it's a fresh page load
  //   if (isAppMounted) {
  //     // setShouldShowLoadingAnimation(false);
  //   } else {
  //     if (
  //       (performance.navigation.type === 1 ||
  //         performance.navigation.type === 0) &&
  //       router.asPath === "/"
  //     ) {
  //       // setShouldShowLoadingAnimation(true);

  //       // console.log("Adding loading animation");
  //       document.body.classList.add("loading");
  //       document.body.classList.remove("loaded");

  //       setTimeout(() => {
  //         // console.log("Removing loading animation");
  //         document.body.classList.remove("loading");
  //         document.body.classList.add("loaded");
  //       }, LOADING_TIME * 1000);
  //     } else {
  //       // console.log("Skipping loading animation");
  //       // setShouldShowLoadingAnimation(false);
  //       document.body.classList.add("loaded");

  //       // If router has a hash, scroll to that element
  //       setTimeout(() => {
  //         if (router.asPath.includes("#")) {
  //           const element = document.querySelector(
  //             `#${router.asPath.split("#")[1]}`
  //           );
  //           if (element) {
  //             element.scrollIntoView({
  //               behavior: "smooth",
  //               block: "start",
  //               inline: "nearest",
  //             });
  //           }
  //         }
  //       }, 0);
  //     }
  //     isAppMounted = true;
  //   }
  // }, [router.asPath]); // Dependency on the router path to re-check on route changes

  return (
    <>
      {/* Needed to make global fonts apply in shadcn components */}
      <style jsx global>{`
        html {
          --font-sans: ${montreal.style.fontFamily};
        }

        .font-sans {
          font-family: var(--font-sans);
        }

        body {
          font-family: var(--font-sans);
        }
      `}</style>

      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
        />
      </Head>

      <main className={`${montreal.variable} ${nyghtSerif.variable} font-sans`}>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/mhr2lku.css"
        ></link>
        <Toaster />
        <AnimatePresence
          mode="wait"
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
      </main>
      <Analytics />
    </>
  );
}
