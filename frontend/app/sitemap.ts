import { MetadataRoute } from "next";
import clientPromise from "@/lib/api/mongodb";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://knowledgepoll.site";

  const slugFormatter = (title: string, id: any) => {
    if (!title || !id) return null;
    return (
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") +
      "-" +
      id.toString()
    );
  };

  const client = await clientPromise;
  const db = client.db("ArticleBlogPosts");

  const [articles, blogs, posts] = await Promise.all([
    db.collection("articles").find({}, { projection: { title: 1, updatedAt: 1 } }).toArray(),
    db.collection("blogs").find({}, { projection: { title: 1, updatedAt: 1 } }).toArray(),
    db.collection("posts").find({}, { projection: { title: 1, updatedAt: 1 } }).toArray(),
  ]);

  const mapEntries = (
    items: any[],
    type: "articles" | "blogs" | "posts"
  ): MetadataRoute.Sitemap =>
    items
      .map((item) => {
        if (!item || !item.title || !item._id) return null;

        const slug = slugFormatter(item.title, item._id);
        if (!slug) return null;

        // validate date
        let lastModified: Date;
        try {
          lastModified = item.updatedAt ? new Date(item.updatedAt) : new Date();
          if (isNaN(lastModified.getTime())) {
            lastModified = new Date();
          }
        } catch {
          lastModified = new Date();
        }

        const url = `${baseUrl}/${type}/${slug}`;
        if (typeof url !== "string" || !url.startsWith("http")) return null;

        return { url, lastModified };
      })
      .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  // ✅ You forgot this in your last code
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
  ];

  return [
    ...staticEntries,
    ...mapEntries(articles, "articles"),
    ...mapEntries(blogs, "blogs"),
    ...mapEntries(posts, "posts"),
  ];
}
