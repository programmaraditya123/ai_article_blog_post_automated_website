import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest Blogs on AI, Automation & Technology | KnowledgePoll",
  description:
    "Read expert-written blogs on artificial intelligence, machine learning, automation, cloud, and modern tech trends. Stay ahead with actionable insights and tutorials.",
  keywords: [
    "AI blogs",
    "automation tutorials",
    "machine learning insights",
    "cloud computing blogs",
    "latest technology articles",
  ],
  openGraph: {
    title: "Latest Blogs on AI, Automation & Technology | KnowledgePoll",
    description:
      "Expert-written blogs covering AI, ML, automation, and emerging tech. Updated regularly to help learners, professionals, and innovators.",
    url: "https://knowledgepoll.site/blogs",
    siteName: "KnowledgePoll",
    type: "website",
  },
  alternates: {
    canonical: "https://knowledgepoll.site/blogs",
  },
};

export default function RootLayout({children} : {children:React.ReactNode}){
    return (
        <>
        {children}
        </>
    )
}