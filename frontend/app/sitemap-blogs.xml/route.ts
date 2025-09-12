import { MongoClient } from "mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const uri = process.env.MONGODB_URI;
let clientPromise: Promise<MongoClient> | null = null;

if (uri) {
  const client = new MongoClient(uri);
  clientPromise = client.connect();
} else {
  console.warn("⚠️ MongoDB URI missing. Sitemap will be empty.");
}

export async function GET() {
  const baseUrl = "https://knowledgepoll.site";
  let articles: any[] = [];

  try {
    if (clientPromise) {
      const client = await clientPromise;
      const db = client.db();
      articles = await db
        .collection("blogs")
        .find({}, { projection: { title: 1 } })
        .toArray();
    }
  } catch (err) {
    console.error("❌ blogs sitemap failed:", err);
  }

  const slugify = (title: string) =>
    (title ?? "untitled")
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const urls = articles.map((a) => ({
    loc: `${baseUrl}/blogs/${slugify(a.title)}-${a._id.toString()}`,
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
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
