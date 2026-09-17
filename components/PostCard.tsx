import Image from "next/image";
import Link from "next/link";
import { attributionFor, chairFor, isDeskSection } from "@/lib/authors";
import { DateLine } from "@/components/DateLine";
import { type Post } from "@/lib/posts";

export function PostCard({
  post,
  showHero = false,
}: {
  post: Post;
  showHero?: boolean;
}) {
  const chair = chairFor(post.author);
  const deskHref = post.section === "worldview" ? "/world-view" : chair.href;
  const teaser =
    post.section === "longform" || isDeskSection(post.section)
      ? post.dek
      : post.excerpt;

  return (
    <article className="border-b border-ink/15 py-8 first:pt-0">
      <DateLine post={post} />
      <h2 className="mt-2 font-serif text-2xl leading-snug text-ink">
        <Link href={post.href} className="underline-offset-4 hover:underline">
          {post.title}
        </Link>
      </h2>
      {showHero && post.hero ? (
        <figure className="mt-5">
          <Link href={post.href} className="block">
            <Image
              src={post.hero}
              alt={post.heroAlt ?? post.title}
              width={1600}
              height={1000}
              className="w-full"
            />
          </Link>
          {post.heroCredit ? (
            <figcaption className="mt-2 font-sans text-sm text-ink/70">
              {post.heroCredit}
            </figcaption>
          ) : null}
        </figure>
      ) : null}
      <p className="mt-3 text-ink">{teaser}</p>
      <p className="mt-5 font-serif italic text-ink">
        <Link href={deskHref} className="underline-offset-4 hover:underline">
          {attributionFor(post.section, post.author)}
        </Link>
      </p>
    </article>
  );
}
