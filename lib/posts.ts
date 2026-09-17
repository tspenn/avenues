import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { isAuthor, type Author, type Section } from "./authors";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export type Post = {
  slug: string;
  title: string;
  date: string;
  posted?: string;
  dateLabel?: string;
  postedLabel?: string;
  author: Author;
  dek: string;
  excerpt: string;
  section: Section;
  hero?: string;
  heroAlt?: string;
  heroCredit?: string;
  href: string;
  content: string;
};

function parseDay(value: unknown): string | undefined {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return undefined;
}

function sortDay(post: Post): string {
  return post.posted ?? post.date;
}

function firstParagraph(content: string): string {
  const block = content
    .split(/\n\s*\n/)
    .map((part) => part.replace(/\s+/g, " ").trim())
    .find((part) => part.length > 0);
  return block ?? "";
}

function parsePost(filename: string): Post {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(postsDirectory, filename), "utf8");
  const { data, content } = matter(raw);

  if (typeof data.title !== "string") {
    throw new Error(`${filename}: title is required`);
  }
  const date = parseDay(data.date);
  if (!date) {
    throw new Error(`${filename}: date must be YYYY-MM-DD`);
  }
  const posted = parseDay(data.posted);
  if (typeof data.author !== "string" || !isAuthor(data.author)) {
    throw new Error(`${filename}: author must be one of the three chairs`);
  }
  if (typeof data.dek !== "string") {
    throw new Error(`${filename}: dek is required`);
  }
  const excerpt =
    typeof data.excerpt === "string" && data.excerpt.trim()
      ? data.excerpt.trim()
      : firstParagraph(content);
  if (
    data.section !== "file" &&
    data.section !== "essay" &&
    data.section !== "longform" &&
    data.section !== "worldview" &&
    data.section !== "sidelines"
  ) {
    throw new Error(
      `${filename}: section must be file, essay, longform, worldview, or sidelines`,
    );
  }

  return {
    slug,
    title: data.title,
    date,
    posted,
    dateLabel:
      typeof data.dateLabel === "string" && data.dateLabel.trim()
        ? data.dateLabel.trim()
        : undefined,
    postedLabel:
      typeof data.postedLabel === "string" && data.postedLabel.trim()
        ? data.postedLabel.trim()
        : undefined,
    author: data.author,
    dek: data.dek,
    excerpt,
    section: data.section,
    hero: typeof data.hero === "string" && data.hero.trim() ? data.hero.trim() : undefined,
    heroAlt:
      typeof data.heroAlt === "string" && data.heroAlt.trim()
        ? data.heroAlt.trim()
        : undefined,
    heroCredit:
      typeof data.heroCredit === "string" && data.heroCredit.trim()
        ? data.heroCredit.trim()
        : undefined,
    href:
      typeof data.href === "string" && data.href.trim()
        ? data.href.trim()
        : `/posts/${slug}`,
    content: content.trim(),
  };
}

export function splitLongform(content: string): { partOne: string; partTwo: string } | null {
  const parts = content.split("<!-- both-sides -->");
  if (parts.length < 2) {
    return null;
  }
  return {
    partOne: parts[0].trim(),
    partTwo: parts.slice(1).join("<!-- both-sides -->").trim(),
  };
}

function listPostFiles(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"));
}

export function getAllPosts(): Post[] {
  return listPostFiles()
    .map(parsePost)
    .sort(
      (a, b) =>
        sortDay(b).localeCompare(sortDay(a)) ||
        b.date.localeCompare(a.date) ||
        a.title.localeCompare(b.title),
    );
}

export function getPostsByAuthor(author: Author): Post[] {
  return getAllPosts().filter((post) => post.author === author);
}

export function getFilePosts(): Post[] {
  return getAllPosts().filter((post) => post.section === "file");
}

export function getWorldViewPosts(): Post[] {
  return getAllPosts().filter((post) => post.section === "worldview");
}

export function getSidelinesPosts(): Post[] {
  return getAllPosts().filter((post) => post.section === "sidelines");
}

export function getPostBySlug(slug: string): Post | null {
  const filename = listPostFiles().find(
    (name) => name.replace(/\.mdx?$/, "") === slug,
  );
  if (!filename) {
    return null;
  }
  return parsePost(filename);
}

export function formatDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function bodyWithoutLeadingDek(content: string, dek: string): string {
  const trimmed = content.trim();
  const lead = dek.trim();
  if (!lead) {
    return trimmed;
  }
  if (trimmed === lead || trimmed.startsWith(`${lead}\n\n`)) {
    return trimmed.slice(lead.length).trim();
  }
  return trimmed;
}
