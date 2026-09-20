import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { attributionFor, isDeskSection } from "./authors";
import { bodyWithoutLeadingDek, type Post } from "./posts";

export const SITE_NAME = "Avenues";
export const SITE_URL = "https://avenues.skylandpublishing.com";

const DEFAULT_SHARE_IMAGE = "/avenues-og.jpg";
const SUNDAY_FILE_SHARE_IMAGE = "/sunday-file-og.jpg";

/** Cards want 1200x630. public/og holds a cropped copy of each hero. */
function cardVersion(hero: string): string {
  const card = `/og${hero}`;
  return fs.existsSync(path.join(process.cwd(), "public", card)) ? card : hero;
}

function shareImage(post: Post): { url: string; alt: string } {
  if (post.section === "file") {
    return { url: SUNDAY_FILE_SHARE_IMAGE, alt: "Sunday File" };
  }
  if (post.hero) {
    return { url: cardVersion(post.hero), alt: post.heroAlt ?? post.title };
  }
  return { url: DEFAULT_SHARE_IMAGE, alt: SITE_NAME };
}

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

export function articleMetadata(post: Post): Metadata {
  const image = shareImage(post);
  const imageUrl = `${SITE_URL}${image.url}`;
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
      images: [{ url: imageUrl, alt: image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.dek,
      images: [imageUrl],
    },
  };
}
