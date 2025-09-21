"use client";
import BlogCard from '@/components/ui/BlogCard/BlogCard';
import { fetchBlogs } from '@/lib/api/blogs';
import { Blogs } from '@/types/articles';
import React, { useCallback, useEffect, useState } from 'react';
import style from '../page.module.css';
import LoadMoreButton from '@/components/ui/load_more_button/Load_More_Button';
import Icons from '@/components/icons';
import Script from "next/script";

const ClientPageBlog = () => {
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [lastId, setLastId] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadBlogs = useCallback( async (reset = false) => {
    if (!hasMore && !reset) return;
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetchBlogs(reset ? undefined : lastId);

      setBlogs((prev) => {
        const merged = reset ? response.blogs : [...prev, ...response.blogs];
        // 🔹 remove duplicates by _id
        const unique = Array.from(new Map(merged.map((b) => [b._id, b])).values());
        return unique;
      });

      setLastId(response.lastId);
      setHasMore(response.hasMore);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    } finally {
      setIsLoading(false);
    }
  },[hasMore, isLoading, lastId]);

  const slugFormatter = (title: string, id: string) => {
    return (
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") +
      "-" +
      id
    );
  };

  useEffect(() => {
    // reset when component mounts
    setBlogs([]);
    setLastId(undefined);
    setHasMore(true);
    loadBlogs(true);
  },[]);

  return (
    <>
      <div className={style.blog_card_grid}>
        {blogs.map((item) => (
          <BlogCard
            key={item._id}
            title={item.title}
            description={item.introduction}
            link={`/blogs/${slugFormatter(item.title, item._id)}`}
          />
        ))}
      </div>

     
       {/* {hasMore && !isLoading && <button onClick={() => loadArticles()}>Load More</button>} */}
      <div className={style.btnCenter}>
      {hasMore && !isLoading && <LoadMoreButton onClick={() => loadBlogs()} text='Read More Blogs'/>}
      
      {isLoading && <LoadMoreButton   Icon={Icons.LoadIcon}/>}
      </div>
      <Script
      id="blogs-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "KnowledgePoll Blogs",
          "url": "https://knowledgepoll.site/blogs",
          "description":
            "Explore high-quality blogs on KnowledgePoll covering tutorials, web development, AI insights, coding solutions, and competitive exam preparation.",
          "publisher": {
            "@type": "Organization",
            "name": "KnowledgePoll",
            "logo": {
              "@type": "ImageObject",
              "url": "https://knowledgepoll.site/brand.png"
            }
          },
          "blogPost": blogs.map((b) => ({
            "@type": "BlogPosting",
            "headline": b.title,
            "url": `https://knowledgepoll.site/blogs/${slugFormatter(b.title,b._id)}`,
            
            "author": {
              "@type": "Organization",
              "name": "KnowledgePoll"
            },
            "image": "https://knowledgepoll.site/brand.png",
            "description": b.introduction 
          }))
        }),
      }}
    />
    </>
  );
};

export default ClientPageBlog;
