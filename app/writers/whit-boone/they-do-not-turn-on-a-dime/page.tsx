import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DateLine } from "@/components/DateLine";
import { chairFor } from "@/lib/authors";
import { getPostBySlug } from "@/lib/posts";
import { ShareRow } from "@/components/ShareRow";
import { articleMetadata, shareText, shareUrl } from "@/lib/seo";

const slug = "they-do-not-turn-on-a-dime";

export function generateMetadata(): Metadata {
  const post = getPostBySlug(slug);
  return post ? articleMetadata(post) : { title: "Not found" };
}

export default async function TurnOnADimePage() {
  const post = getPostBySlug(slug);
  if (!post || post.author !== "Whit Boone") {
    notFound();
  }

  return (
    <article>
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <DateLine post={post} />
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
      {post.hero ? (
        <figure className="mt-8">
          <Image
            src={post.hero}
            alt={post.heroAlt ?? post.title}
            width={1600}
            height={1000}
            priority
            className="w-full"
          />
          {post.heroCredit ? (
            <figcaption className="mt-2 font-sans text-sm text-ink/70">
              {post.heroCredit}
            </figcaption>
          ) : null}
        </figure>
      ) : null}
      <div className="prose-avenues mt-10 space-y-5 [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:leading-snug [&_p]:text-ink">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
