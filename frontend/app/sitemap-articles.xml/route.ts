import clientPromise from "@/lib/api/mongodb";

export const revalidate = 0;


console.log("MONGODB_URI:", process.env.MONGODB_URI);


export async function GET() {
  const baseUrl = "https://knowledgepoll.site";

  try {
    const client = await clientPromise;
    const db = client.db("ArticleBlogPosts");

    const articles = await db
      .collection("articles")
      .find({}, { projection: { title: 1 } })
      .toArray();

    const slugify = (title: string) =>
      (title ?? "untitled")
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const urls = articles
      .filter((a) => a?._id && a?.title)
      .map((a) => ({
        loc: `${baseUrl}/articles/${slugify(a.title)}-${a._id.toString()}`,
        lastmod: new Date().toISOString(),
      }));

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

    return new Response(xml, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (err) {
    console.error("❌ Article sitemap failed:", err);

    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      { headers: { "Content-Type": "application/xml" } }
    );
  }
}
