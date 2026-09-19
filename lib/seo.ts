import type { Metadata } from "next";
import { attributionFor, isDeskSection } from "./authors";
import { bodyWithoutLeadingDek, type Post } from "./posts";

export const SITE_NAME = "Avenues";
export const SITE_URL = "https://avenues.skylandpublishing.com";

export function shareUrl(post: Post): string {
  return `${SITE_URL}${post.href}`;
}

/**
 * Prefilled post body. X appends the link itself, so this ends on "More…".
 * Kept short on purpose: X drops the image card on long-form posts.
 */
export function shareText(post: Post, paragraphs = 1, maxChars = 200): string {
  const lead = isDeskSection(post.section)
    ? bodyWithoutLeadingDek(post.content, post.dek)
    : post.content;

  const body = lead
    .split(/\n\s*\n/)
    .map((part) => part.replace(/\s+/g, " ").trim())
    .filter((part) => part && !part.startsWith("#") && !part.startsWith("—"))
    .slice(0, paragraphs)
    .join("\n\n");

  const opening = isDeskSection(post.section) ? `${post.dek}\n\n${body}` : body;
  let text = `${post.title}\n\n${opening}`.trim();

  if (text.length > maxChars) {
    const clipped = text.slice(0, maxChars);
    const stop = Math.max(clipped.lastIndexOf(". "), clipped.lastIndexOf("\n"));
    text = clipped.slice(0, stop > 0 ? stop + 1 : maxChars).trim();
  }

  return `${text}\n\nMore…`;
}

/** Shares carry the words only. Heroes stay on the page, not in the card. */
export function articleMetadata(post: Post): Metadata {
  const url = shareUrl(post);
  const byline = attributionFor(post.section, post.author);

  return {
    title: post.title,
    description: post.dek,
    authors: [{ name: byline }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.dek,
      url,
      siteName: SITE_NAME,
      publishedTime: post.posted ?? post.date,
      authors: [byline],
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.dek,
    },
  };
}
