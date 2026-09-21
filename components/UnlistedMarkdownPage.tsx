import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

export function UnlistedMarkdownPage({ file }: { file: string }) {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "content", "pages", file),
    "utf8",
  );
  const { content } = matter(raw);

  return (
    <article data-notices="off">
      <div className="prose-avenues space-y-5 [&_h1]:font-serif [&_h1]:text-3xl [&_h1]:leading-snug [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:leading-snug [&_p]:text-ink">
        <MDXRemote source={content} />
      </div>
    </article>
  );
}
