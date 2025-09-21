// app/blogs/page.tsx (Server Component)
import type { Metadata } from "next";
import ClientPageBlog from "./ClientPageBlog";

export const metadata: Metadata = {
  title: "KnowledgePoll Blogs – Tutorials, Web Dev, AI & Exam Prep Insights",
  description:
    "Explore high-quality blogs on KnowledgePoll covering tutorials, web development, AI insights, coding solutions, and competitive exam preparation. Stay updated with actionable, practical, and easy-to-follow content.",
  keywords: [
    "KnowledgePoll blogs",
    "web development tutorials",
    "AI insights blog",
    "coding guides",
    "exam preparation strategies",
    "problem-solving articles",
    "technology tutorials",
    "learning resources",
  ],
  alternates: {
    canonical: "https://knowledgepoll.site/blogs",
  },
  openGraph: {
    title: "KnowledgePoll Blogs – Tutorials, AI, Web Development & Exam Prep",
    description:
      "Browse KnowledgePoll blogs for tutorials, coding tips, AI insights, and exam strategies. Perfect for students, developers, and lifelong learners.",
    url: "https://knowledgepoll.site/blogs",
    siteName: "KnowledgePoll",
    images: [
      {
        url: "https://knowledgepoll.site/brand.png",
        width: 1200,
        height: 630,
        alt: "KnowledgePoll Blogs – Tutorials, AI, Web Dev, Exam Prep",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@KnowledgePoll",
    creator: "@KnowledgePoll",
    title: "KnowledgePoll Blogs – Tutorials, Coding, AI & Exam Prep",
    description:
      "Stay ahead with KnowledgePoll blogs: tutorials, web development, AI insights, problem-solving, and exam preparation content.",
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
  category: "Blog",
};

export default function BlogsPage() {
  return <ClientPageBlog />;
}
