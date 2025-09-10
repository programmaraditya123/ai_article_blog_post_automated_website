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

    const slugFormatter = (title: string, id: any) => {
      // ✅ Use nullish coalescing to provide a default empty string
      const sanitizedTitle = (title ?? "").toString();
      const sanitizedId = (id ?? "").toString();
      
      // ✅ Return null if the sanitized title or ID is empty
      if (!sanitizedTitle || !sanitizedId) {
        return null;
      }

      return sanitizedTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") + "-" + sanitizedId;
    };

    const mapEntries = (
      items: any[],
      type: "articles" | "blogs" | "posts"
    ): MetadataRoute.Sitemap =>
      (items ?? [])
        .map((item) => {
          // ✅ Use nullish coalescing to ensure item.title and item._id are strings
          const slug = slugFormatter(item?.title ?? '', item?._id ?? '');

          // ✅ Handle case where slugFormatter returns null
          if (!slug) {
            console.warn(`Skipping document due to invalid slug formatting in collection: ${type}`);
            return null;
          }

          // ✅ Use nullish coalescing for lastModified to ensure a valid date
          const lastModified = new Date(item?.updatedAt ?? Date.now());
          const url = `${baseUrl}/${type}/${slug}`;

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