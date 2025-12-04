// components/ArticleClient.tsx (use this exact file while debugging)
'use client'
import React, { useEffect, useRef, useState } from 'react'
import style from '../../app/articles/[slug]/Articleslug.module.scss'
import RelatedArticles from '@/components/shared/RealatedArticle/RealatedArticle'
import { usePrintPdf } from '@/hooks/usePrintPdf'
import type { Section } from '@/types/articles'
import Icons from "@/components/icons";


type Article = {
  _id: string
  title: string
  introduction?: string
  sections?: Section[]
  conclusion?: string
  coverImage?: string
  publishedAt?: string
  updatedAt?: string
  tags?: string[]
}
type Props = {
  article: Article
  recommendation: any[] // tighten if you have a type
}

export default function ArticleClient({ article, recommendation }: Props) {
  const pdfRef = useRef<HTMLDivElement | null>(null)
  const { handlePrint, isPrinting } = usePrintPdf(pdfRef)

  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <>    
    <div className={style.art_parent_cont} key={article._id}>
      <div className={style.article_container} ref={pdfRef}>
             
          <div className={style.article_title}>
            <p className={style.article_title_p}>{article.title}</p>
          </div>

          <div className={style.article_intro}>
            <h2 className={style.article_intro_h}>Introduction</h2>
            <p className={style.article_intro_p}>{article.introduction}</p>
          </div>

          {article.sections?.map((item: Section) => (
            <div className={style.section} key={item._id}>
              <div className={style.section_heading}>{item.heading}</div>
              
              {item.summary && (
                <div className={style.section_summary}>{item.summary}</div>
              )}
              {item.details && (
                <div className={style.section_details}>{item.details}</div>
              )}
              {item.types && (
                <div className={style.section_types}>
                  <h3>Types</h3>
                  <ul>
                    {item.types.map((type, index) => (
                      <li key={index}>{type}</li>
                    ))}
                  </ul>
                </div>
              )}

              {item.advantages && (
                <div className={style.section_advantages}>
                  <h3 className={style.subsection_heading}>Advantages</h3>
                  <ol>
                    {item.advantages.map((adv, index) => (
                      <li key={index}>{adv}</li>
                    ))}
                  </ol>
                </div>
              )}

              {item.disadvantages && (
                <div className={style.section_advantages}>
                  <h3>Disadvantages</h3>
                  <ol>
                    {item.disadvantages.map((dis, index) => (
                      <li key={index}>{dis}</li>
                    ))}
                  </ol>
                </div>
              )}

              {item.subsections && (
                <div className={style.section_subsections}>
                  {item.subsections.map((sub, index) => (
                    <div key={index}>
                      <h4 className={style.subHeading}>{sub.subheading}</h4>
                      <p className={style.subParagraph}>{sub.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {item.tables && (
                <div className={style.section_tables}>
                  {item.tables.map((table, index) => (
                    <div key={index}>
                      <h3>{table.title}</h3>
                      <table>
                        <thead>
                          <tr>
                            {table.headers.map((header, idx) => (
                              <th key={idx}>{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {table.rows.map((row, rowIdx) => (
                            <tr key={rowIdx}>
                              {row.columns.map((col, colIdx) => (
                                <td key={colIdx}>{col}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className={style.article_conclusion}>
            <h2 className={style.article_intro_h}>Conclusion</h2>
            <p className={style.article_intro_p}>{article.conclusion}</p>
          </div>
        </div>

      {/* <div style={{ marginTop: 12 }}>
        <button onClick={() => mounted && handlePrint()} disabled={!mounted || isPrinting}>
          {isPrinting ? 'Preparing...' : 'Download PDF'}
        </button>
      </div> */}

      <div className={style.related_article_container}>
        {mounted ? <RelatedArticles articles={recommendation || []} /> : null}
      </div>
    </div>
    <div className={style.pdfdownloadbtn}>
        <button onClick={() => mounted && handlePrint()} disabled={!mounted || isPrinting} className={style.pdfbtn}>
          {isPrinting ? 'Preparing...' : 'Download PDF'}
          <Icons.DownloadIcon/>
        </button>
        
      </div>
    </>

  )
}




