"use client";
import Icons from '@/components/icons';
import ArticleCard from '@/components/ui/ArticleCard/ArticleCard';
import { fetchArticles } from '@/lib/api/articles';
import { ArticleCardProps, Articles } from '@/types/articles';
import React, { useCallback, useEffect, useState } from 'react';
import style from '../page.module.css';
import LoadMoreButton from '@/components/ui/load_more_button/Load_More_Button';

const data: ArticleCardProps = {
  icon: Icons.DatabaseIcon,
  primaryButtonText: 'Start learning: A Guide',
  primaryButtonColor: 'blue',
  title: 'Mastering Automation: A Guide',
  description:
    'This immersive introduction helps savvy learners, researchers and innovators to leverage artificial intelligence for various tasks such as machine learning and data analysis. Explore how to harness the power of AI to streamline your workflows and gain valuable insights.',
  link: '#',
  secondaryButtonText: 'Read More',
};

const Page = () => {
  const [articles, setArticles] = useState<Articles[]>([]);
  const [lastId, setLastId] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadArticles = useCallback( async (reset = false) => {
    if (!hasMore && !reset) return;
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetchArticles(reset ? undefined : lastId);

      setArticles((prev) => {
        const merged = reset ? response.articles : [...prev, ...response.articles];
        // 🔹 remove duplicates by _id
        const unique = Array.from(new Map(merged.map((a) => [a._id, a])).values());
        return unique;
      });

      setLastId(response.lastId);
      setHasMore(response.hasMore);
    } catch (err) {
      console.error("Failed to fetch articles", err);
    } finally {
      setIsLoading(false);
    }
  },[hasMore, isLoading, lastId]);

  const slugFormatter = (title: string, id: string) => {
    const ftitle = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return `${ftitle}-${id}`;
  };

  useEffect(() => {
    // reset when component mounts
    setArticles([]);
    setLastId(undefined);
    setHasMore(true);
    loadArticles(true);
  }, []);

  return (
    <>
      <div className={style.article_card_grid}>
        {articles.map((item) => (
          <ArticleCard
            {...data}
            title={item.title}
            description={item.introduction}
            key={item._id}
            link={`/articles/${slugFormatter(item.title, item._id)}`}
          />
        ))}
      </div >

      {/* {hasMore && !isLoading && <button onClick={() => loadArticles()}>Load More</button>} */}
      <div className={style.btnCenter}>
      {hasMore && !isLoading && <LoadMoreButton  onClick={() =>loadArticles()} text='Read More Articles'/>}
    
      {isLoading && <LoadMoreButton  Icon={Icons.LoadIcon}/>}</div>
    </>
  );
};

export default Page;
