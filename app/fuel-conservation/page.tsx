import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

export const metadata: Metadata = {
  title: "Fuel Conservation",
  robots: { index: false, follow: false },
};

export default function FuelConservationPage() {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "content", "pages", "fuel-conservation.md"),
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
