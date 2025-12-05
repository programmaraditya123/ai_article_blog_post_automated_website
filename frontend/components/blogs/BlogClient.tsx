'use client'

import style from '../../app/blogs/[slug]/Blogslug.module.scss'
import React, { useRef } from 'react'
import RelatedArticles from '@/components/shared/RealatedArticle/RealatedArticle';
import { RecommendItem, Section } from '@/types/articles';
import { usePrintPdf } from '@/hooks/usePrintPdf';
import Icons from '../icons';


type Blog = {
  _id: string
  title: string
  introduction?: string
  sections?: Section[],
  conclusion?: string
  coverImage?: string
  publishedAt?: string
  updatedAt?: string
  tags?: string[],
  key_takeaways?: string[]
}
type Props = {
  blog: Blog
  recommendation: RecommendItem[] // tighten if you have a type
}


export default function BlogClient({ blog ,recommendation } : Props) {

    const pdfRef = useRef<HTMLDivElement | null>(null)
    const { handlePrint, isPrinting } = usePrintPdf(pdfRef)

 

  return (
    <>
    <div className={style.art_parent_cont}>
    <div className={style.art_parent_cont}>
      <div className={style.article_container} ref={pdfRef}>  
      
        {/* Blog Title */}
        <div className={style.article_title}>
          <h1 className={style.article_title_h}>{blog.title}</h1>
        </div>

        {/* Introduction */}
        <div className={style.article_intro}>
          <h2 className={style.section_heading}>Introduction</h2>
          <p className={style.article_intro_p}>{blog.introduction}</p>
        </div>

        {/* Sections */}
        // @ts-ignore
        {blog.sections?.map((section: any, index: number) => (
          <div key={index} className={style.section}>
            <h2 className={style.section_heading}>{section.heading}</h2>
            <p className={style.section_content}>{section.content}</p>

            {/* Bullets */}
            {section.bullets && section.bullets.length > 0 && (
              <ul className={style.section_bullets}>
                {section.bullets.map((bullet: string, i: number) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Conclusion */}
        <div className={style.article_conclusion}>
          <h2 className={style.section_heading}>Conclusion</h2>
          <p className={style.article_conclusion_p}>{blog.conclusion}</p>
        </div>

        {/* Key Takeaways */}
        {blog.key_takeaways && blog.key_takeaways.length > 0 && (
          <div className={style.article_takeaways}>
            <h2 className={style.section_heading}>Key Takeaways</h2>
            <ul>
              {blog.key_takeaways.map((point: string, i: number) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Related Articles Sidebar */}
       <div className={style.related_article_container}>
          <RelatedArticles articles={recommendation || []} />
        </div>


    </div>
    </div>
    <div className={style.pdfdownloadbtn}>
        <button onClick={handlePrint} disabled={isPrinting} className={style.pdfbtn}>
          {isPrinting ? 'Preparing...' : 'Download PDF'}
          <Icons.DownloadIcon/>
        </button>
        
      </div>
      </>
    
  );
}
