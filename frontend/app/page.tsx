"use client";

import Link from "next/link";
import styles from './Home.module.scss';
import { fetchArticleBlogPost } from "@/lib/api/global";
import { useEffect, useState } from "react";
import { Articles, Blogs, Posts } from "@/types/articles";

export default function page() {
  const[articles,setArticles] = useState<Articles[]>([]);
  const[blogs,setBlogs] = useState<Blogs[]>([]);
  const[posts,setPosts] = useState<Posts[]>([]);
  // console.log("*****************",articles)

  
  const slugFormatter = (title: string, id: string) => {
    const ftitle = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return `${ftitle}-${id}`;
  };
  
    useEffect(() => {
    async function getData() {
      const data = await fetchArticleBlogPost();
      // console.log("-----------", data);
      setArticles(data?.articles || [])
      setBlogs(data?.blogs || [])
      setPosts(data?.posts || posts)
    }
    getData();
  }, []);
  return (
    <div className={styles.homepage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            Welcome to <span>KnowledgePoll</span>
          </h1>
          <p>
            Your one-stop platform for <strong>Articles</strong>, <strong>Blogs</strong>, <strong>Posts </strong> 
            and <strong>Insights</strong> that inspire learning and growth.
          </p>
          <div className={styles.heroButtons}>
            <Link href="/articles" className={styles.primaryBtn}>
              Explore Articles
            </Link>
            <Link href="/blogs" className={styles.secondaryBtn}>
              Read Blogs
            </Link>
            <Link href="/posts" className={styles.secondaryBtn}>
              Read Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard Grid */}
      <section className={styles.dashboard}>
        <h2 className={styles.sectionTitle}>Discover Our Content</h2>
        <div className={styles.grid}>
          <Link href="/articles" className={styles.card}>
            <h3>📚 Articles</h3>
            <p>Deep dives, guides, and research-backed articles to expand your knowledge.</p>
          </Link>

          <Link href="/blogs" className={styles.card}>
            <h3>📝 Blogs</h3>
            <p>Fresh perspectives, stories, and experiences from diverse voices.</p>
          </Link>

          <Link href="/posts" className={styles.card}>
            <h3>🏷️ Posts</h3>
            <p>Catchy, engaging posts that spark curiosity and learning.</p>
          </Link>
        </div>
      </section>


      <section className={styles.featured}>
        <h2 className={styles.sectionTitle}>Articles</h2>
           <div className={styles.featuredGrid}>
        {articles && articles.map((data,index) => {
          return (
          <div className={styles.featuredCard} key={data._id}>
            <h4>{data.title}</h4>
            <p className={styles.intro}>{data.introduction}</p>
            <Link href={`/articles/${slugFormatter(data.title,data._id)}`}>Read Article →</Link>
          </div>)

        })}
        </div>
      </section>

      <section className={styles.featured}>
        <h2 className={styles.sectionTitle}>Blogs</h2>
           <div className={styles.featuredGrid}>
        {blogs && blogs.map((data,index) => {
          return (
          <div className={styles.featuredCard} key={data._id}>
            <h4>{data.title}</h4>
            <p className={styles.intro}>{data.introduction}</p>
            <Link href={`/blogs/${slugFormatter(data.title,data._id)}`}>Read Blogs →</Link>
          </div>)

        })}
        </div>
      </section>

      <section className={styles.featured}>
        <h2 className={styles.sectionTitle}>Posts</h2>
           <div className={styles.featuredGrid}>
        {posts && posts.map((data,index) => {
          return (
          <div className={styles.featuredCard} key={data._id}>
            <h4>{data.title}</h4>
            <p className={styles.intro}>{data.body}</p>
            <Link href={`/posts/${slugFormatter(data.title,data._id)}`}>Read Posts →</Link>
          </div>)

        })}
        </div>
      </section>



      {/* Featured Section */}
      <section className={styles.featured}>
        <h2 className={styles.sectionTitle}>Featured Highlights</h2>
        <div className={styles.featuredGrid}>
          <div className={styles.featuredCard}>
            <h4>Trending Article</h4>
            <p>Next.js for Beginners – Simplifying the Basics.</p>
            <Link href="/articles">Read More →</Link>
          </div>

          <div className={styles.featuredCard}>
            <h4>Hot Blog</h4>
            <p>Why Developers Love React – A Personal Journey.</p>
            <Link href="/blogs">Read More →</Link>
          </div>

          <div className={styles.featuredCard}>
            <h4>Popular Post</h4>
            <p>10 Tips to Boost Productivity While Coding.</p>
            <Link href="/posts">Explore →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
