import "./globals.css";

import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata, Viewport } from "next";
import { RealViewport } from "@/components/helpers/real-viewport";
import { generateDefaultJsonLd } from "@/lib/metadata";
import { Chivo_Mono } from "next/font/google";
import Navigation from "@/components/sections/navigation";

const times = localFont({
  src: [
    {
      path: "../fonts/times-now/TimesNow-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/times-now/TimesNow-Light.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/times-now/TimesNow-SemiBold.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/times-now/TimesNow-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-serif",
});

const gtAmerica = localFont({
  src: [
    {
      path: "../fonts/gt-america/GTAmerica-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/gt-america/GTAmerica-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    // {
    //   path: "../fonts/gt-america/GTAmerica-MediumItalic.woff2",
    //   weight: "500",
    //   style: "italic",
    // },
    // {
    //   path: "../fonts/gt-america/GTAmerica-BoldItalic.woff2",
    //   weight: "700",
    //   style: "italic",
    // },
  ],
  display: "fallback",
  variable: "--font-sans",
});

const chivoMono = Chivo_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Connor Rothschild",
  metadataBase: new URL(
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL!}`
  ),
  description:
    "Connor Rothschild is an interaction designer and engineer based in Texas.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Connor Rothschild",
    description:
      "Connor Rothschild is an interaction designer and engineer based in Texas.",
    url: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL!}`,
    siteName: "Connor Rothschild",
    images: [
      {
        url: "/social-2025.png",
        width: 1200,
        height: 630,
        alt: "Connor Rothschild",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Connor Rothschild",
    description:
      "Connor Rothschild is an interaction designer and engineer based in Texas.",
    images: ["/social-2025.png"],
  },
  other: {
    "application/ld+json": JSON.stringify(generateDefaultJsonLd()),
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",

  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main
          className={`${gtAmerica.variable} ${times.variable} ${chivoMono.variable} bg-bg font-sans`}
        >
          <Navigation />
          {children}
        </main>
        <Analytics />
        <SpeedInsights />
        <RealViewport />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              let previousSelectionLength = 0;
              
              document.addEventListener('selectionchange', function() {
                const selection = window.getSelection();
                const currentSelectionLength = selection ? selection.toString().length : 0;
                
                // Only change color if we're starting a new selection (going from 0 to some text)
                // Keep the same color if we're extending an existing selection
                if (currentSelectionLength > 0 && previousSelectionLength === 0) {
                  const randomHue = Math.floor(Math.random() * 360);
                  document.documentElement.style.setProperty('--selection-hue', randomHue);
                }
                
                previousSelectionLength = currentSelectionLength;
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
