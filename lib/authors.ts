export const AUTHORS = [
  "Sunday Editor",
  "Julian B. Horrow",
  "Whit Boone",
  "Caroline North",
] as const;

export type Author = (typeof AUTHORS)[number];

export type Section = "file" | "essay" | "longform" | "worldview" | "sidelines";

export type Chair = {
  name: Author;
  slug: "file" | "horrow" | "whit-boone" | "sidelines";
  href: "/file" | "/horrow" | "/writers/whit-boone" | "/sidelines";
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
    note: "Parses bold print. Reads between the lines.",
  },
  "Whit Boone": {
    name: "Whit Boone",
    slug: "whit-boone",
    href: "/writers/whit-boone",
    empty: "Longform forthcoming",
    note: "History. What resistance actually cost.",
  },
  "Caroline North": {
    name: "Caroline North",
    slug: "sidelines",
    href: "/sidelines",
    empty: "Nothing from the sidelines this week.",
    note: "Talks it out before the picture comes.",
  },
};

export function isAuthor(value: string): value is Author {
  return (AUTHORS as readonly string[]).includes(value);
}

export function chairFor(author: Author): Chair {
  return CHAIRS[author];
}

export const WORLD_VIEW_ATTRIBUTION =
  "Editor - World View - Avenues from Skyland Publishing";

export const SIDELINES_ATTRIBUTION =
  "Sidelines - Caroline North - Avenues at Skyland Publishing";

export function isDeskSection(section: Section): boolean {
  return section === "worldview" || section === "sidelines";
}

export function attributionFor(section: Section, author: Author): string {
  if (section === "worldview") {
    return WORLD_VIEW_ATTRIBUTION;
  }
  if (section === "sidelines") {
    return SIDELINES_ATTRIBUTION;
  }
  return author;
}
