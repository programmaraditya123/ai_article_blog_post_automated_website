// import React from 'react';
// import styles from './ArticleCard.module.scss'; // Import CSS Module
// import { ArticleCardProps } from '@/types/articles';
// import Icons from '@/components/icons';


// const ArticleCard: React.FC<ArticleCardProps> = ({
//   title,
//   description,
//   link = '#',
//   secondaryButtonText = 'Read More',
// }) => {
//   return (
//     <div className={styles.articleCard}>

//       <div className={styles.innerCard}>
//       {/* Top right document icon */}
//       <div className={styles.iconTopRight}>
//         <Icons.FileTextIcon />
//       </div>

//       {/* Central Graphic Area */}
//       {/* <div className={styles.graphicArea}>
//         <div className={`${styles.backgroundCircle} ${styles.circleOne}`}></div>
//         <div className={`${styles.backgroundCircle} ${styles.circleTwo}`}></div>
//         <div className={styles.mainIconWrapper}>
//           {IconComponent && <IconComponent className={styles.mainIcon} />}
//         </div>
//       </div> */}

//       {/* Primary Call to Action Button */}
//       {/* <button
//         className={`${styles.primaryButton} ${styles[primaryButtonColor]}`}
//       >
//         {primaryButtonText}
//       </button> */}

//       {/* Title */}
//       <div className={styles.cardFront}>
//       <h3 className={styles.articleTitle}>
//         {title}
//       </h3>
//       </div>
//       </div>

//       Description
//       <div className={styles.cardBack}>
//       <p className={styles.articleDescription}>
//         {description}
//       </p>

//       {/* Secondary Read More Button */}
//       <a
//         href={link}
//         className={styles.secondaryLink}
//       >
//         {secondaryButtonText}
//         <Icons.ArrowRightIcon className={styles.arrowIcon} />
//       </a>
//       </div>
//     </div>
//   );
// };

// export default ArticleCard;






import React from 'react';
import styles from './ArticleCard.module.scss';
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
      <div className={styles.cardInner}>
        {/* Front Side */}
        <div className={styles.cardFront}>
          <div className={styles.iconTopRight}>
            < Icons.FileTextIcon   />
          </div>
          <h3 className={styles.articleTitle}>{title}</h3>
        </div>

        {/* Back Side */}
        <div className={styles.cardBack}>
          <p className={styles.articleDescription}>{description}</p>
          <a href={link} className={styles.secondaryLink}>
            {secondaryButtonText}
            <Icons.ArrowRightIcon className={styles.arrowIcon} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;

