import style from './Blogslug.module.scss'
import React from 'react'
import { getBlog } from '@/lib/api/blogs';
import { Metadata } from 'next';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params; // ✅ No await here
  return {
    title: `blog - ${slug}`,
    description: `Details about blog ${slug}`,
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params; // ✅ await here too
  const decodedSlug = decodeURIComponent(slug);
  const blog = await getBlog(decodedSlug);

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
      <aside className={style.related_article_container}>
        <h3>Related Articles</h3>
        {/* TODO: fetch related blogs and map them here */}
      </aside>
    </div>
  );
}
