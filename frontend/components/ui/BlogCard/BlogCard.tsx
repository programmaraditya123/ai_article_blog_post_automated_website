import React from 'react'
import { BlogCardProps } from '@/types/articles'
import styles from './BlogCard.module.scss'
import Link from 'next/link'
import Icons from '@/components/icons'

const BlogCard : React.FC<BlogCardProps> = ({
    title,
    description,
    link='#',
    secondaryButtonText='Read More',
}) => {
  return (
    <div className={styles.parent_blog}>
        <div className={styles.blog_title}>
          {title}
        </div>
        <div className={styles.blog_description}>
          {description}
        </div>
          <Link
                href={link}
                className={styles.bloglink}
                scroll={false}
              >
                {secondaryButtonText}
                <Icons.ArrowRightIcon className={styles.arrowIcon} />
              </Link>
    </div>
  )
}

export default BlogCard