import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { attributionFor, isDeskSection } from "@/lib/authors";
import { DateLine } from "@/components/DateLine";
import { ShareRow } from "@/components/ShareRow";
import { bodyWithoutLeadingDek, getAllPosts, getPostBySlug } from "@/lib/posts";
import { articleMetadata, shareText, shareUrl } from "@/lib/seo";

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
  return articleMetadata(post);
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
      <p className="mt-3 font-serif text-lg italic text-ink/80">{post.dek}</p>
      <p className="mt-4 font-serif italic text-ink">
        {attributionFor(post.section, post.author)}
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
          {post.heroCaption || post.heroCredit ? (
            <figcaption className="mt-2">
              {post.heroCaption ? (
                <p className="font-serif italic text-ink">{post.heroCaption}</p>
              ) : null}
              {post.heroCredit ? (
                <p className="mt-1 font-sans text-sm text-ink/70">
                  {post.heroCredit}
                </p>
              ) : null}
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
