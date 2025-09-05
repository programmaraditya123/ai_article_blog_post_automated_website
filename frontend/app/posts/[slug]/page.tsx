import style from './Postsslug.module.scss';
import React from 'react'
import { getPost } from '@/lib/api/posts';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const post = await getPost(slug);
  console.log("------------", post);

  return (
    <div className={style.art_parent_cont}>
      <div className={style.article_container}>

        {/* post Title */}
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
        {/* You can later fetch related blogs and map them here */}
      </aside>
    </div>
  );
}
