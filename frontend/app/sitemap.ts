import clientPromise from "@/lib/api/mongodb";

export default async function sitemap() {
  const baseUrl = "https://knowledgepoll.site";

  // Function to generate slugs
  const slugFormatter = (title: string, id: string) => {
    return (
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") +
      "-" +
      id
    );
  };

  const client = await clientPromise;
  const db = client.db("ArticleBlogPosts");

  // Helper function to fetch a collection and map to sitemap entries
  const fetchCollection = async (collectionName: string, path: string) => {
    const items = await db
      .collection(collectionName)
      .find({}, { projection: { title: 1, updatedAt: 1 } })
      .toArray();

    return items.map((item) => ({
      url: `${baseUrl}/${path}/${slugFormatter(item.title, item._id)}`,
      lastModified: item.updatedAt || new Date(),
      changefreq: "weekly",
      priority: 0.8,
    }));
  };

  // Fetch all collections
  const articleEntries = await fetchCollection("articles", "articles");
  const blogEntries = await fetchCollection("blogs", "blogs");
  const postEntries = await fetchCollection("posts", "posts");

  // Static pages
  const staticEntries = [
    { url: `${baseUrl}`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
  ];

  // Combine everything
  return [...staticEntries, ...articleEntries, ...blogEntries, ...postEntries];
}
