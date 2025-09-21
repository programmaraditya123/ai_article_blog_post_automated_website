import style from './Postsslug.module.scss';
import React from 'react'
import { getPost } from '@/lib/api/posts';
import { Metadata } from 'next';
import { getRecommendations } from '@/lib/api/recommendation';
import RelatedArticles from '@/components/shared/RealatedArticle/RealatedArticle';
import Script from "next/script";

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
  const post = await getPost(decodedSlug);
  return {
    title: `${post.title} | KnowledgePoll`,
    description:
      post.excerpt || post.body?.slice(0, 160) || "Read this in-depth article on KnowledgePoll.",
    alternates: {
      canonical: `https://knowledgepoll.site/posts/${slugFormatter(post.title, post._id)}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || post.body?.slice(0, 160),
      url: `https://knowledgepoll.site/posts/${slugFormatter(post.title, post._id)}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["KnowledgePoll"],
      images: [
        {
          url: post.coverImage || "https://knowledgepoll.site/brand.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.body?.slice(0, 160),
      images: [post.coverImage || "https://knowledgepoll.site/brand.png"],
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params; // ✅ await here too
  const decodedSlug = decodeURIComponent(slug);
  const post = await getPost(decodedSlug);

  const recommendation = await getRecommendations(slug)


  return (
    <div className={style.art_parent_cont}>
      <div className={style.article_container}>

        {/* Post Title */}
        <div className={style.article_title}>
          <h1 className={style.article_title_h}>{post.title}</h1>
        </div>

        {/* Introduction */}
        <div className={style.article_intro}>
          <h2 className={style.section_heading}>Introduction</h2>
          <p className={style.article_intro_p}>{post.body}</p>
        </div>

      </div>

      {/* Related Articles Sidebar */}
      <div className={style.related_article_container}>
        <RelatedArticles articles={recommendation || []} />
      </div>


      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt || post.body?.slice(0, 160),
            author: {
              "@type": "Organization",
              name: "KnowledgePoll",
            },
            publisher: {
              "@type": "Organization",
              name: "KnowledgePoll",
              logo: {
                "@type": "ImageObject",
                url: "https://knowledgepoll.site/brand.png",
              },
            },
            datePublished: post.publishedAt,
            dateModified: post.updatedAt || post.publishedAt,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://knowledgepoll.site/posts/${decodedSlug}`,
            },
            image: post.coverImage || "https://knowledgepoll.site/brand.png",
          }),
        }}
      />

    </div>
  );
}
