import { attributionFor } from "@/lib/authors";
import { getAllPosts } from "@/lib/posts";
import { SITE_NAME, SITE_URL, shareUrl } from "@/lib/seo";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function pubDate(day: string): string {
  return new Date(`${day}T12:00:00.000Z`).toUTCString();
}

export function GET() {
  const posts = getAllPosts();
  const feedUrl = `${SITE_URL}/feed.xml`;
  const items = posts
    .map((post) => {
      const url = shareUrl(post);
      const byline = attributionFor(post.section, post.author);
      const published = post.posted ?? post.date;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${pubDate(published)}</pubDate>
      <author>${escapeXml(`info@avenuesfiles.com (${byline})`)}</author>
      <description>${escapeXml(post.dek)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${escapeXml(SITE_URL)}</link>
    <description>${escapeXml("A small house for dated notes and signed essays.")}</description>
    <language>en-us</language>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
