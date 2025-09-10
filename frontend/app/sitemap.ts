import { MetadataRoute } from "next";
import clientPromise from "@/lib/api/mongodb";

export const revalidate = 0;           // ⛔ no caching at build
export const dynamic = "force-dynamic"; // ⛔ always runtime

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://knowledgepoll.site";

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
  ];

  try {
    const client = await clientPromise;
    const db = client.db("ArticleBlogPosts");

    const [articles, blogs, posts] = await Promise.all([
      db.collection("articles").find({}, { projection: { title: 1, updatedAt: 1 } }).toArray(),
      db.collection("blogs").find({}, { projection: { title: 1, updatedAt: 1 } }).toArray(),
      db.collection("posts").find({}, { projection: { title: 1, updatedAt: 1 } }).toArray(),
    ]);

    const slugFormatter = (title: string, id: any) =>
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") + "-" + id.toString();

    const mapEntries = (
      items: any[],
      type: "articles" | "blogs" | "posts"
    ): MetadataRoute.Sitemap =>
      (items ?? [])
        .map((item) => {
          if (!item?.title || !item?._id) return null;

          const slug = slugFormatter(item.title, item._id);
          if (!slug) return null;

          const lastModified = new Date(item.updatedAt || Date.now());
          const url = `${baseUrl}/${type}/${slug}`;

          return url.startsWith("http") ? { url, lastModified } : null;
        })
        .filter(Boolean) as MetadataRoute.Sitemap;

    return [
      ...staticEntries,
      ...mapEntries(articles, "articles"),
      ...mapEntries(blogs, "blogs"),
      ...mapEntries(posts, "posts"),
    ];
  } catch (err) {
    console.error("Sitemap generation failed:", err);

    // ✅ fallback so build never fails
    return staticEntries;
  }
}
