import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DateLine } from "@/components/DateLine";
import { chairFor } from "@/lib/authors";
import { getPostBySlug } from "@/lib/posts";

export const metadata: Metadata = {
  title: "The Oil and the Deputy",
  description:
    "A defendant on a plane and a concession on a desk. Those are different kinds of founding.",
};

export default function OilAndTheDeputyPage() {
  const post = getPostBySlug("the-oil-and-the-deputy");
  if (!post || post.author !== "Whit Boone") {
    notFound();
  }

  return (
    <article>
      <DateLine post={post} />
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
        <Image
          src={post.hero}
          alt="A dark room, a blank paper, and a window on the works."
          width={1600}
          height={1000}
          priority
          className="mt-8 w-full"
        />
      ) : null}
      <div className="prose-avenues mt-10 space-y-5 [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:leading-snug [&_p]:text-ink">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
