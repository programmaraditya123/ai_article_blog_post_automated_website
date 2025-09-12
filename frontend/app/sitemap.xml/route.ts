export async function GET() {
  const baseUrl = "https://knowledgepoll.site";

  const urls = [
    { loc: `${baseUrl}/`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/posts`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/articles`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/blogs`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/pricing`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/docs`, lastmod: new Date().toISOString() },
  ];

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

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
