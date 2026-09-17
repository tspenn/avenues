import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { chairFor } from "@/lib/authors";
import { DateLine } from "@/components/DateLine";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Not found" };
  }
  return {
    title: post.title,
    description: post.dek,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  if (post.href !== `/posts/${post.slug}`) {
    redirect(post.href);
  }

  return (
    <article>
      <DateLine post={post} />
      <h1 className="mt-3 font-serif text-3xl leading-snug text-ink">
        {post.title}
      </h1>
      {post.section === "worldview" ? (
        <p className="mt-3 font-serif text-xl italic text-ink/80">{post.dek}</p>
      ) : null}
      <p className="mt-4 font-serif italic text-ink">
        <Link
          href={post.section === "worldview" ? "/world-view" : chairFor(post.author).href}
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
