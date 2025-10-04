// app/articles/layout.tsx
import React from "react";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Articles on Programming, AI & Development | Knowledge Poll",
  description:
    "Explore insightful articles on programming, AI, web development, and coding tutorials. Stay updated with Knowledge Poll’s latest guides, tips, and projects.",
  keywords: [
    "Programming articles",
    "AI tutorials",
    "Web development guides",
    "React articles",
    "JavaScript learning",
    "Python tutorials",
    "Machine learning articles",
    "Full-stack development",
  ],
  alternates: {
    canonical: "https://knowledgepoll.site/articles",
  },
  openGraph: {
    type: "website",
    url: "https://knowledgepoll.site/articles",
    siteName: "Knowledge Poll",
    title: "Articles on Programming, AI & Development",
    description:
      "Deep dive into coding concepts, AI, and real-world projects. Read Knowledge Poll articles to master programming.",
    images: [
      {
        url: "https://knowledgepoll.site/seo/articles-og.png",
        width: 1200,
        height: 630,
        alt: "Knowledge Poll Articles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Articles on Programming, AI & Development | Knowledge Poll",
    description:
      "Level up your coding journey with Knowledge Poll’s curated programming articles.",
    images: ["https://knowledgepoll.site/seo/articles-twitter.png"],
    creator: "@KnowledgePoll",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "Education",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Use Next.js Script instead of raw <script> */}
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4617056155363384"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
