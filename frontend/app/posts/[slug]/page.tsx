import style from './Postsslug.module.scss';
import React from 'react'
import { getPost } from '@/lib/api/posts';
import { Metadata } from 'next';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params; // ✅ No await here
  return {
    title: `post - ${slug}`,
    description: `Details about post ${slug}`,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params; // ✅ await here too
  const decodedSlug = decodeURIComponent(slug);
  const post = await getPost(decodedSlug);

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
      <aside className={style.related_article_container}>
        <h3>Related Articles</h3>
        {/* TODO: fetch related posts and map them here */}
      </aside>
    </div>
  );
}
