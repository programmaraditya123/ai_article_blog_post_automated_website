import style from './Blogslug.module.scss'
import React from 'react'
import { getBlog } from '@/lib/api/blogs';
import { Metadata } from 'next';
import { getRecommendations } from '@/lib/api/recommendation';
import RelatedArticles from '@/components/shared/RealatedArticle/RealatedArticle';

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
    <div className={style.art_parent_cont}>
      <div className={style.article_container}>  
      
        {/* Blog Title */}
        <div className={style.article_title}>
          <h1 className={style.article_title_h}>{blog.title}</h1>
        </div>

        {/* Introduction */}
        <div className={style.article_intro}>
          <h2 className={style.section_heading}>Introduction</h2>
          <p className={style.article_intro_p}>{blog.introduction}</p>
        </div>

        {/* Sections */}
        // @ts-ignore
        {blog.sections?.map((section: any, index: number) => (
          <div key={index} className={style.section}>
            <h2 className={style.section_heading}>{section.heading}</h2>
            <p className={style.section_content}>{section.content}</p>

            {/* Bullets */}
            {section.bullets && section.bullets.length > 0 && (
              <ul className={style.section_bullets}>
                {section.bullets.map((bullet: string, i: number) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Conclusion */}
        <div className={style.article_conclusion}>
          <h2 className={style.section_heading}>Conclusion</h2>
          <p className={style.article_conclusion_p}>{blog.conclusion}</p>
        </div>

        {/* Key Takeaways */}
        {blog.key_takeaways && blog.key_takeaways.length > 0 && (
          <div className={style.article_takeaways}>
            <h2 className={style.section_heading}>Key Takeaways</h2>
            <ul>
              {blog.key_takeaways.map((point: string, i: number) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Related Articles Sidebar */}
       <div className={style.related_article_container}>
          <RelatedArticles articles={recommendation || []} />
        </div>
        <script
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

    </div>
    
  );
}
