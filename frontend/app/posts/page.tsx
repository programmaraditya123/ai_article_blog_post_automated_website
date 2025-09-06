"use client";
import PostCard from '@/components/ui/PostCard/PostCard';
import React, { useCallback, useEffect, useState } from 'react';
import style from '../page.module.css';
import { fetchPosts } from '@/lib/api/posts';
import { Posts } from '@/types/articles';

const Page = () => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [lastId, setLastId] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadPosts = useCallback( async (reset = false) => {
    if (!hasMore && !reset) return;
    if (isLoading) return; // prevent multiple rapid calls

    setIsLoading(true);
    try {
      const response = await fetchPosts(reset ? undefined : lastId);

      setPosts((prev) => {
        const merged = reset ? response.posts : [...prev, ...response.posts];
        // remove duplicates by _id
        const unique = Array.from(new Map(merged.map((p) => [p._id, p])).values());
        return unique;
      });

      setLastId(response.lastId);
      setHasMore(response.hasMore);
    } catch (error) {
      console.error("Failed to load posts", error);
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
    // Reset posts on mount
    setPosts([]);
    setLastId(undefined);
    setHasMore(true);
    loadPosts(true);
  },[]);

  return (
    <>
      <div className={style.post_grid}>
        {posts.map((item) => (
          <PostCard
            title={item.title}
            key={item._id}
            link={`/posts/${slugFormatter(item.title, item._id)}`}
          />
        ))}
      </div>

      {hasMore && !isLoading && (
        <button onClick={() => loadPosts()}>Load More</button>
      )}
      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default Page;
