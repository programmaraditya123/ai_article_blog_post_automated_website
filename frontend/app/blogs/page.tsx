"use client";
import BlogCard from '@/components/ui/BlogCard/BlogCard';
import { fetchBlogs } from '@/lib/api/blogs';
import { Blogs } from '@/types/articles';
import React, { useCallback, useEffect, useState } from 'react';
import style from '../page.module.css';

const Page = () => {
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

      {hasMore && !isLoading && <button onClick={() => loadBlogs()}>Load More</button>}
      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default Page;
