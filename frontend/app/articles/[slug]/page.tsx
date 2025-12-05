import { getArticle } from '@/lib/api/articles'
import React from 'react'
import { Metadata } from "next";
import { getRecommendations } from '@/lib/api/recommendation';
import ArticleClient from '@/components/articles/ArticleClient';
import Script from 'next/script';



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
  const article = await getArticle(decodedSlug);
   return {
    title: `${article.title} | Knowledge Poll`,
    description: article.introduction,
    keywords: article.tags || ["Programming", "Web development", "AI", "Projects"],
    alternates: {
      canonical: `https://knowledgepoll.site/articles/${slugFormatter(article.title,article._id)}`,
    },
    openGraph: {
      type: "article",
      url: `https://knowledgepoll.site/articles/${slugFormatter(article.title,article._id)}`,
      siteName: "Knowledge Poll",
      title: article.title,
      description: article.introduction,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: ["Knowledge Poll"],
      images: [
        {
          url: article.coverImage || "https://knowledgepoll.site/seo/article-default.png",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.introduction,
      images: [article.coverImage || "https://knowledgepoll.site/seo/article-default.png"],
      creator: "@KnowledgePoll",
    },
    robots: {
      index: true,
      follow: true,
    },
    category: "Programming",
  };

}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params; // ✅ await here too
  const decodedSlug = decodeURIComponent(slug);
  const article = await getArticle(decodedSlug);

 
  const recommendation =await  getRecommendations(slug)

  return (
    <>
    
    <ArticleClient article={article} recommendation={recommendation}/>
     <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.introduction,
            image: [article.coverImage],
            author: {
              "@type": "Organization",
              name: "Knowledge Poll",
              url: "https://knowledgepoll.site",
            },
            publisher: {
              "@type": "Organization",
              name: "Knowledge Poll",
              logo: {
                "@type": "ImageObject",
                url: "https://knowledgepoll.site/brand.png",
              },
            },
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://knowledgepoll.site/articles/${slugFormatter(article.title,article._id)}`,
            },
          }),
        }}
      />

    </>
  )
}

  
   