import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { isAuthor, type Author, type Section } from "./authors";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export type Post = {
  slug: string;
  title: string;
  date: string;
  author: Author;
  dek: string;
  excerpt: string;
  section: Section;
  hero?: string;
  href: string;
  content: string;
};

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
  const date =
    typeof data.date === "string"
      ? data.date
      : data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`${filename}: date must be YYYY-MM-DD`);
  }
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
    data.section !== "longform"
  ) {
    throw new Error(`${filename}: section must be file, essay, or longform`);
  }

  return {
    slug,
    title: data.title,
    date,
    author: data.author,
    dek: data.dek,
    excerpt,
    section: data.section,
    hero: typeof data.hero === "string" && data.hero.trim() ? data.hero.trim() : undefined,
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
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export function getPostsByAuthor(author: Author): Post[] {
  return getAllPosts().filter((post) => post.author === author);
}

export function getFilePosts(): Post[] {
  return getPostsByAuthor("Sunday Editor");
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
