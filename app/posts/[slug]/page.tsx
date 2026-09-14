import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { formatDate, getAllPosts, getPostBySlug } from "@/lib/posts";

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

  return (
    <article>
      <p className="font-sans text-sm text-ink/70">{formatDate(post.date)}</p>
      <h1 className="mt-3 font-serif text-3xl leading-snug text-ink">
        {post.title}
      </h1>
      <p className="mt-4 font-serif italic text-ink">{post.author}</p>
      <div className="prose-avenues mt-10 space-y-5 [&_p]:text-ink">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
