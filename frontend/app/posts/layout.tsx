import React from "react"
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: {
    default: "KnowledgePoll – Insights, Tutorials & Guides",
    template: "%s | KnowledgePoll",
  },
  description:
    "KnowledgePoll is your go-to platform for expert-written tutorials, problem-solving guides, and the latest insights in technology, AI, and education.",
  keywords: [
    "KnowledgePoll",
    "blog",
    "web development",
    "AI tutorials",
    "programming guides",
    "competitive exams",
  ],
  authors: [{ name: "KnowledgePoll", url: "https://knowledgepoll.site" }],
  creator: "KnowledgePoll",
  publisher: "KnowledgePoll",
  metadataBase: new URL("https://knowledgepoll.site"),

  openGraph: {
    type: "website",
    url: "https://knowledgepoll.site",
    title: "KnowledgePoll – Learn, Build & Grow",
    description:
      "Actionable tutorials, problem-solving techniques, and insights for students, developers, and tech enthusiasts.",
    siteName: "KnowledgePoll",
    images: [
      {
        url: "https://knowledgepoll.site/brand.png",
        width: 1200,
        height: 630,
        alt: "KnowledgePoll",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "KnowledgePoll – Learn, Build & Grow",
    description:
      "Stay ahead with KnowledgePoll: tutorials, exam prep, coding guides, and AI insights.",
    creator: "@knowledgepoll",
    images: ["https://knowledgepoll.site/brand.png"],
  },

  alternates: {
    canonical: "https://knowledgepoll.site",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({children} : {children:React.ReactNode}){
    return(
        <>
        {children}
        </>
    )
}