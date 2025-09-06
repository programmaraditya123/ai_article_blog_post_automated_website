import React from 'react';
import styles from './ArticleCard.module.scss'; // Import CSS Module
import { ArticleCardProps } from '@/types/articles';
import Icons from '@/components/icons';


const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  link = '#',
  secondaryButtonText = 'Read More',
}) => {
  return (
    <div className={styles.articleCard}>
      {/* Top right document icon */}
      <div className={styles.iconTopRight}>
        <Icons.FileTextIcon />
      </div>

      {/* Central Graphic Area */}
      {/* <div className={styles.graphicArea}>
        <div className={`${styles.backgroundCircle} ${styles.circleOne}`}></div>
        <div className={`${styles.backgroundCircle} ${styles.circleTwo}`}></div>
        <div className={styles.mainIconWrapper}>
          {IconComponent && <IconComponent className={styles.mainIcon} />}
        </div>
      </div> */}

      {/* Primary Call to Action Button */}
      {/* <button
        className={`${styles.primaryButton} ${styles[primaryButtonColor]}`}
      >
        {primaryButtonText}
      </button> */}

      {/* Title */}
      <h3 className={styles.articleTitle}>
        {title}
      </h3>

      {/* Description */}
      <p className={styles.articleDescription}>
        {description}
      </p>

      {/* Secondary Read More Button */}
      <a
        href={link}
        className={styles.secondaryLink}
      >
        {secondaryButtonText}
        <Icons.ArrowRightIcon className={styles.arrowIcon} />
      </a>
    </div>
  );
};

export default ArticleCard;
