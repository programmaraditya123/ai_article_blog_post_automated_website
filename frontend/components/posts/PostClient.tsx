'use client'
import style from '../../app/posts/[slug]/Postsslug.module.scss';
import React, { useRef } from 'react'
import RelatedArticles from '@/components/shared/RealatedArticle/RealatedArticle';
import { RecommendItem } from '@/types/articles';
import { usePrintPdf } from '@/hooks/usePrintPdf';
import Icons from '../icons';


type Post = {
  _id: string
  title: string
  introduction?: string
  body ?: string
}
type Props = {
  post: Post
  recommendation: RecommendItem[] // tighten if you have a type
}




export default function PostClient({ post,recommendation }: Props) {

    const pdfRef = useRef<HTMLDivElement | null>(null)
    const { handlePrint, isPrinting } = usePrintPdf(pdfRef)
  


  return (
    <>
    <div className={style.art_parent_cont} >
      <div className={style.article_container} ref={pdfRef}>

        {/* Post Title */}
        <div className={style.article_title}>
          <h1 className={style.article_title_h}>{post.title}</h1>
        </div>

        {/* Introduction */}
        <div className={style.article_intro}>
          <h2 className={style.section_heading}>Introduction</h2>
          <p className={style.article_intro_p}>{post.body}</p>
        </div>

      </div>

      {/* Related Articles Sidebar */}
      <div className={style.related_article_container}>
        <RelatedArticles articles={recommendation || []} />
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
