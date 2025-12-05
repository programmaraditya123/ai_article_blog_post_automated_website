import React from 'react'
import { getBlog } from '@/lib/api/blogs';
import { Metadata } from 'next';
import { getRecommendations } from '@/lib/api/recommendation';
import Script from 'next/script';
import BlogClient from '@/components/blogs/BlogClient';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const slugFormatter = (title: string, id: string) => {
    const ftitle = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return `${ftitle}-${id}`;
  };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params; // ✅ await here too
  const decodedSlug = decodeURIComponent(slug);
  const blog = await getBlog(decodedSlug);
   const title = blog?.title || "Blog | KnowledgePoll";
  const description =
    blog?.introduction?.slice(0, 160) ||
    "Explore in-depth blogs on AI, machine learning, and automation.";
  const url = `https://knowledgepoll.site/blogs/${slugFormatter(blog.title,blog._id)}`;

  return {
    title,
    description,
    keywords: blog?.keywords || [
      "AI blog",
      "automation guide",
      "machine learning tutorial",
      "cloud computing insights",
    ],
    openGraph: {
      title,
      description,
      url,
      siteName: "KnowledgePoll",
      type: "article",
      images: [
        {
          url: blog?.coverImage || "/default-blog.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [blog?.coverImage || "/default-blog.png"],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params; // ✅ await here too
  const decodedSlug = decodeURIComponent(slug);
  const blog = await getBlog(decodedSlug);

  const recommendation =await  getRecommendations(slug)

  return (
    <>
      <BlogClient blog={blog} recommendation={recommendation}/>
      
        <Script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.introduction,
      image: blog.coverImage || "https://knowledgepoll.site/default-blog.png",
      author: {
        "@type": "Organization",
        name: "KnowledgePoll",
      },
      publisher: {
        "@type": "Organization",
        name: "KnowledgePoll",
        logo: {
          "@type": "ImageObject",
          url: "https://knowledgepoll.site/logo.png",
        },
      },
      datePublished: blog.createdAt,
      dateModified: blog.updatedAt || blog.createdAt,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://knowledgepoll.site/blogs/${slugFormatter(blog.title,blog._id)}`,
      },
    }),
  }}
/>

    {/* </div> */}
    </>
    
  );
}
