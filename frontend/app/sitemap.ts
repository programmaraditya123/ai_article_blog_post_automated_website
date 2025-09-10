import { MetadataRoute } from "next";
import clientPromise from "@/lib/api/mongodb";

export const revalidate = 0;
export const dynamic = "force-dynamic";

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

    const slugFormatter = (title: any, id: any): string | null => {
      // ✅ Aggressively ensure title and id are strings, providing a fallback empty string.
      const safeTitle = (title ?? "").toString();
      const safeId = (id ?? "").toString();

      if (safeTitle.trim() === "" || safeId.trim() === "") {
        return null;
      }

      return safeTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    };

    const mapEntries = (
      items: any[],
      type: "articles" | "blogs" | "posts"
    ): MetadataRoute.Sitemap =>
      (items ?? [])
        .map((item) => {
          // ✅ Combine nullish coalescing with type checks for maximum safety.
          const slug = slugFormatter(item?.title, item?._id);

          if (!slug) {
            console.warn(`Skipping document due to invalid slug formatting in collection: ${type}`);
            return null;
          }

          const lastModified = new Date((item?.updatedAt ?? Date.now()));
          const url = `${baseUrl}/${type}/${slug}-${item._id}`;

          return { url, lastModified };
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
    // ✅ Fallback to static entries to prevent build failure
    return staticEntries;
  }
}