import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import { chairFor } from "@/lib/authors";
import { formatDate, getPostBySlug, splitLongform } from "@/lib/posts";
import { ShareRow } from "@/components/ShareRow";
import { articleMetadata, shareText, shareUrl } from "@/lib/seo";

const slug = "resistance-and-its-cost";

export function generateMetadata(): Metadata {
  const post = getPostBySlug(slug);
  return post ? articleMetadata(post) : { title: "Not found" };
}

const articleClass =
  "prose-avenues mt-8 space-y-5 [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:leading-snug [&_p]:text-ink";

export default async function ResistancePage() {
  const post = getPostBySlug(slug);
  if (!post || post.author !== "Whit Boone") {
    notFound();
  }

  const parts = splitLongform(post.content);
  if (!parts) {
    notFound();
  }

  return (
    <article>
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <p className="font-sans text-sm text-ink/70">{formatDate(post.date)}</p>
        <ShareRow
          title={post.title}
          url={shareUrl(post)}
          text={shareText(post)}
        />
      </div>
      <h1 className="mt-3 font-serif text-3xl leading-snug text-ink">
        {post.title}
      </h1>
      <p className="mt-4 font-serif italic text-ink">
        <Link
          href={chairFor(post.author).href}
          className="underline-offset-4 hover:underline"
        >
          {post.author}
        </Link>
      </p>
      <p className="mt-6 text-ink">{post.dek}</p>
      <p className="mt-4">
        <a href="#both-sides" className="underline-offset-4 hover:underline">
          Skip to both sides of the fire
        </a>
      </p>
      <h2 className="mt-12 font-serif text-2xl text-ink">Part I</h2>
      <div className={articleClass}>
        <MDXRemote source={parts.partOne} />
      </div>
      <hr className="my-12 border-ink/20" />
      <h2 id="both-sides" className="font-serif text-2xl text-ink">
        Part II
      </h2>
      <h3 className="mt-6 font-serif text-xl text-ink">
        Christians on both sides of the fire
      </h3>
      <div className={articleClass}>
        <MDXRemote source={parts.partTwo} />
      </div>
    </article>
  );
}
