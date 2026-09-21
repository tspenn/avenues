import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

export function GET() {
  const latest = getAllPosts()[0];
  if (!latest) {
    return Response.json({ slug: "", title: "", href: "/" });
  }

  return Response.json(
    {
      slug: latest.slug,
      title: latest.title,
      href: latest.href,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
