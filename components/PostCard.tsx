import Link from "next/link";
import { chairFor } from "@/lib/authors";
import { formatDate, type Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  const chair = chairFor(post.author);

  return (
    <article className="border-b border-ink/15 py-8 first:pt-0">
      <p className="font-sans text-sm text-ink/70">{formatDate(post.date)}</p>
      <h2 className="mt-2 font-serif text-2xl leading-snug text-ink">
        <Link href={`/posts/${post.slug}`} className="underline-offset-4 hover:underline">
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 text-ink">{post.excerpt}</p>
      <p className="mt-5 font-serif italic text-ink">
        <Link href={chair.href} className="underline-offset-4 hover:underline">
          {post.author}
        </Link>
      </p>
    </article>
  );
}
