import { getArticle } from '@/lib/api/articles'
import style from './Articleslug.module.scss';
import React from 'react'
import { Section } from '@/types/articles';


// 👇 generateMetadata must be a separate export
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const article = await getArticle(slug)

  return {
    title: article.seo.title,
    description: article.seo.introduction,
    openGraph: {
      title: article.title,
      description: article.introduction,
      url: `https://yourdomain.com/articles/${slug}`,
      siteName: 'Knowledge Poll',
      images: [
        {
          url: article.coverImage || '/default-og.png',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.introduction,
      images: [article.coverImage || '/default-og.png'],
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const article = await getArticle(slug)
  // console.log("------------", article)

  return (
    <> 
       
     <div className={style.art_parent_cont}>
      <div className={style.article_container}>
        <div className={style.article_title}>
          <p className={style.article_title_p}>{article.title}</p>
        </div>
        <div className={style.article_intro}>
          <h2 className={style.article_intro_h}>Introduction</h2>
          <p className={article.article_intro_p}>{article.introduction}</p>
        </div>

        {article.sections && article.sections?.map((item: Section) => (
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

            {/* Advantages */}
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

            {/* Disadvantages */}
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

            {/* Subsections */}
            {item.subsections && (
              <div className={style.section_subsections}>
                {/* <h3>Subsections</h3> */}
                {item.subsections.map((sub, index) => (
                  <div key={index}>
                    <h4 className={style.subHeading}>{sub.subheading}</h4>
                    <p className={style.subParagraph}>{sub.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tables */}
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
      <div className={style.related_article_container}>related articles</div>

    </div>
    </>

  )
}


