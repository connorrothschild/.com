import "./globals.css";

import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata, Viewport } from "next";
import { RealViewport } from "@/components/helpers/real-viewport";

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

const montreal = localFont({
  src: [
    {
      path: "../fonts/montreal/PPNeueMontreal-Book.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/montreal/PPNeueMontreal-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/montreal/PPNeueMontreal-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/montreal/PPNeueMontreal-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "fallback",
  variable: "--font-sans",
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
        url: "/social.png",
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
    images: ["/social.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",

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
          className={`${montreal.variable} ${times.variable} bg-bg font-sans`}
        >
          {children}
        </main>
        <Analytics />
        <SpeedInsights />
        <RealViewport />
      </body>
    </html>
  );
}
