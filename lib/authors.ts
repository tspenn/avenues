export const AUTHORS = [
  "Sunday Editor",
  "Julian B. Horrow",
  "Whit Boone",
] as const;

export type Author = (typeof AUTHORS)[number];

export type Section = "file" | "essay" | "longform";

export type Chair = {
  name: Author;
  slug: "file" | "horrow" | "whit-boone";
  href: "/file" | "/horrow" | "/writers/whit-boone";
  empty: string;
  note: string;
};

export const CHAIRS: Record<Author, Chair> = {
  "Sunday Editor": {
    name: "Sunday Editor",
    slug: "file",
    href: "/file",
    empty: "No file this week.",
    note: "The clerk. Dates the clip. Names the file.",
  },
  "Julian B. Horrow": {
    name: "Julian B. Horrow",
    slug: "horrow",
    href: "/horrow",
    empty: "Essay forthcoming",
    note: "",
  },
  "Whit Boone": {
    name: "Whit Boone",
    slug: "whit-boone",
    href: "/writers/whit-boone",
    empty: "Longform forthcoming",
    note: "History. What resistance actually cost.",
  },
};

export function isAuthor(value: string): value is Author {
  return (AUTHORS as readonly string[]).includes(value);
}

export function chairFor(author: Author): Chair {
  return CHAIRS[author];
}
