import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";

export const metadata: Metadata = {
  title: "The Price on the Corner",
  robots: { index: false, follow: false },
};

function memo(): string {
  return fs
    .readFileSync(
      path.join(process.cwd(), "content", "pages", "price-on-the-corner.md"),
      "utf8",
    )
    .trim();
}

export default function PriceOnTheCornerPage() {
  return (
    <article className="prose-avenues space-y-5 [&_blockquote]:border-l-2 [&_blockquote]:border-ink/25 [&_blockquote]:pl-5 [&_blockquote]:font-serif [&_blockquote]:italic [&_blockquote]:text-ink/80 [&_p]:text-ink [&_strong]:font-serif [&_strong]:text-lg">
      <MDXRemote source={memo()} />
    </article>
  );
}
