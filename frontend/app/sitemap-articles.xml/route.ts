// import clientPromise from "@/lib/api/mongodb";

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || process.env.NEXT_PUBLIC_MONGODB_URI;

if (!uri) {
  throw new Error("❌ Please add your MongoDB URI to .env.local");
}
console.log("MONGODB_URI",process.env.MONGODB_URI)
console.log("NEXT_PUBLIC_MONGODB_URI",process.env.NEXT_PUBLIC_MONGODB_URI)

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // allow global `_mongoClientPromise` to survive hot-reloads in dev
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export const revalidate = 0;


console.log("MONGODB_URI:", process.env.MONGODB_URI);


export async function GET() {
  const baseUrl = "https://knowledgepoll.site";

  try {
    const client = await clientPromise;
    const db = client.db();

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
