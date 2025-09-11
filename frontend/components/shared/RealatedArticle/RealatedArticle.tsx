"use client";
import React from "react";
import Link from "next/link";
import styles from "./RelatedArticle.module.scss";

type RelatedArticle = {
  id: string;
  metadata: {
    id: string;
    title: string;
    type: string;
  };
  page_content: string;
  type: string;
};

type Props = {
  articles: RelatedArticle[];
};

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

export default function RelatedArticles({ articles }: Props) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className={styles.relatedContainer}>
      <h2 className={styles.heading}>Related Content</h2>
      <div className={styles.grid}>
        {articles.map((article) => (
          <Link
            href={`/${article.metadata.type}s/${slugFormatter(article.metadata.title, article.id)}`}
            key={article.id}
            className={styles.card}
          >
            <div className={styles.cardContent}>
              <span className={styles.type}>{article.metadata.type}</span>
              <h3 className={styles.title}>{article.metadata.title}</h3>
              <p className={styles.excerpt}>
                {article.page_content.length > 100
                  ? article.page_content.slice(0, 100) + "..."
                  : article.page_content}
              </p>
              <span className={styles.readMore}>Read More →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
