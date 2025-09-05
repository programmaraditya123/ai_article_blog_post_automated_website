import { PostCardProps } from '@/types/articles'
import React from 'react'
import styles from './PostCard.module.scss'
import Link from 'next/link'
import Icons from '@/components/icons'

const PostCard: React.FC<PostCardProps> = ({
    title = "xxjbsycgfsvcdgcu jgcugd hgc hcb",
    link = "#",
    secondaryButtonText = 'Read More'
}) => {
    return (
        <div className={styles.post_container_card}>
            <div className={styles.post_title}>
                {title}
            </div>
            {/* <div className={styles.post_body}>
                {body}
            </div> */}
            <Link
                href={link}
                className={styles.post_link}
                scroll={false}
            >
                {secondaryButtonText}
                <Icons.ArrowRightIcon className={styles.arrowIcon} />
            </Link>
        </div>
    )
}

export default PostCard