import { NextResponse } from "next/server";
import clientPromise from "@/lib/api/mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET() {
  const baseUrl = "https://knowledgepoll.site";

  const staticUrls = [
    { loc: `${baseUrl}/`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/posts`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/articles`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/blogs`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/pricing`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/docs`, lastmod: new Date().toISOString() },
  ];

  try {
    const client = await clientPromise;
    const db = client.db("ArticleBlogPosts");

    // fetch latest 10 from each collection
    const [articles, blogs, posts] = await Promise.all([
      db.collection("articles").find({}, { projection: { title: 1 } }).sort({ _id: -1 }).limit(10).toArray(),
      db.collection("blogs").find({}, { projection: { title: 1 } }).sort({ _id: -1 }).limit(10).toArray(),
      db.collection("posts").find({}, { projection: { title: 1 } }).sort({ _id: -1 }).limit(10).toArray(),
    ]);

    // helper to attach collectionName
    const withCollection = (docs: any[], name: string) =>
      docs.map((doc) => ({ ...doc, collectionName: name }));

    const combinedDocs = [
      ...withCollection(articles, "articles"),
      ...withCollection(blogs, "blogs"),
      ...withCollection(posts, "posts"),
    ];

    // slugify function
    const slugify = (title: string) =>
      (title ?? "untitled")
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    // build dynamic URLs safely
    const dynamicUrls = combinedDocs
      .filter((item) => item?.title && item?._id) // prevent invalid docs
      .map((item) => {
        const id = item._id.toString();
        const slug = slugify(item.title);
        return {
          loc: `${baseUrl}/${item.collectionName}/${slug}-${id}`,
          lastmod: new Date().toISOString(),
        };
      });

    const urls = [...staticUrls, ...dynamicUrls];

    // ✅ Build XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (u) => `<url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
  </url>`
    )
    .join("\n")}
</urlset>`;

    return new NextResponse(xml, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (err) {
    console.error("Sitemap generation failed:", err);

    // fallback to static sitemap
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls
    .map(
      (u) => `<url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
  </url>`
    )
    .join("\n")}
</urlset>`;

    return new NextResponse(fallbackXml, {
      headers: { "Content-Type": "application/xml" },
    });
  }
}








// import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic"; // avoid build-time collection
// export const revalidate = 0;
// export const runtime = "nodejs";

// export async function GET() {
//   const baseUrl = "https://knowledgepoll.site";

//   const urls = [
//     { loc: `${baseUrl}/`, lastmod: new Date().toISOString() },
//     { loc: `${baseUrl}/articles`, lastmod: new Date().toISOString() },
//     { loc: `${baseUrl}/blogs`, lastmod: new Date().toISOString() },
//     { loc: `${baseUrl}/posts`, lastmod: new Date().toISOString() },
//     { loc: `${baseUrl}/pricing`, lastmod: new Date().toISOString() },
//     { loc: `${baseUrl}/docs`, lastmod: new Date().toISOString() },
//   ];

//   const xml = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//   ${urls
//     .map(
//       (u) => `<url>
//     <loc>${u.loc}</loc>
//     <lastmod>${u.lastmod}</lastmod>
//   </url>`
//     )
//     .join("\n")}
// </urlset>`;

//   return new NextResponse(xml, {
//     headers: {
//       "Content-Type": "application/xml",
//     },
//   });
// }
