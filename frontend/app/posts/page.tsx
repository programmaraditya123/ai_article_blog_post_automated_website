// app/posts/page.tsx (Server Component)
import type { Metadata } from "next";
import ClientPagePost from "./ClientPagePost";

export const metadata: Metadata = {
  title: "Latest Blog Posts | KnowledgePoll",
  description:
    "Explore the latest blog posts on KnowledgePoll covering tutorials, problem-solving strategies, web development, AI, and exam preparation.",
  alternates: {
    canonical: "https://knowledgepoll.site/posts",
  },
  openGraph: {
    title: "KnowledgePoll – Latest Blog Posts",
    description:
      "Browse tutorials, case studies, and practical insights on development, AI, and competitive learning.",
    url: "https://knowledgepoll.site/posts",
    images: [
      {
        url: "https://knowledgepoll.site/brand.png",
        width: 1200,
        height: 630,
        alt: "KnowledgePoll Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Latest Blog Posts | KnowledgePoll",
    description:
      "Stay updated with KnowledgePoll: tutorials, problem-solving, AI insights, and exam prep content.",
    images: ["https://knowledgepoll.site/brand.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PostsPage() {
  return <ClientPagePost />;
}
