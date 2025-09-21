// app/articles/page.tsx (Server Component)
import type { Metadata } from "next";
import ClientPageArticle from "./ClientPageArticle";

export const metadata: Metadata = {
  title: "KnowledgePoll Article – Tutorials, Web Dev, AI, Exam Prep & Insights",
  description:
    "Discover high-quality tutorials, web development guides, AI insights, coding solutions, and competitive exam preparation blogs on KnowledgePoll. Updated regularly with fresh, practical content.",
  keywords: [
    "KnowledgePoll Article",
    "web development tutorials",
    "AI learning Article",
    "competitive exam preparation articles",
    "problem solving strategies",
    "latest coding guides",
    "technology insights",
  ],
  alternates: {
    canonical: "https://knowledgepoll.site/articles",
  },
  openGraph: {
    title: "KnowledgePoll Article – Web Dev, AI & Exam Prep Insights",
    description:
      "Read tutorials, coding tips, AI case studies, and exam strategies on KnowledgePoll. Actionable insights for students, developers, and lifelong learners.",
    url: "https://knowledgepoll.site/articles",
    siteName: "KnowledgePoll",
    images: [
      {
        url: "https://knowledgepoll.site/brand.png",
        width: 1200,
        height: 630,
        alt: "KnowledgePoll Article – Tutorials, AI, Web Development, Exam Prep",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@KnowledgePoll",
    creator: "@KnowledgePoll",
    title: "KnowledgePoll Article – Tutorials, Coding, AI & Exam Prep",
    description:
      "Stay ahead with KnowledgePoll blogs: tutorials, web dev, AI insights, problem-solving, and exam preparation strategies.",
    images: ["https://knowledgepoll.site/brand.png"],
  },
  robots: {
    index: true,
    follow: true 
  },
  verification: {
    google: "YOUR-GOOGLE-SEARCH-CONSOLE-CODE",
    other: {
      bing: "YOUR-BING-VERIFICATION-CODE",
    },
  },
  category: "Article",
};

export default function ArticlePage() {
  return <ClientPageArticle />;
}
