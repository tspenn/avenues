import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { attributionFor, chairFor, isDeskSection } from "@/lib/authors";
import { DateLine } from "@/components/DateLine";
import { bodyWithoutLeadingDek, getAllPosts, getPostBySlug } from "@/lib/posts";

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
    authors: [{ name: attributionFor(post.section, post.author) }],
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
      {isDeskSection(post.section) ? (
        <p className="mt-4 font-serif italic text-ink">{attributionFor(post.section, post.author)}</p>
      ) : (
        <p className="mt-4 font-serif italic text-ink">
          <Link
            href={chairFor(post.author).href}
            className="underline-offset-4 hover:underline"
          >
            {attributionFor(post.section, post.author)}
          </Link>
        </p>
      )}
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
        {post.editorsNote ? (
          <aside className="border-l-2 border-ink/20 pl-4 font-sans text-sm text-ink/70">
            <span className="block font-semibold tracking-wide text-ink/80">
              Editor’s note
            </span>
            {post.editorsNote}
          </aside>
        ) : null}
        {isDeskSection(post.section) ? (
          <p className="font-serif text-lg italic text-ink/80">{post.dek}</p>
        ) : null}
        <MDXRemote
          source={
            isDeskSection(post.section)
              ? bodyWithoutLeadingDek(post.content, post.dek)
              : post.content
          }
        />
      </div>
    </article>
  );
}
