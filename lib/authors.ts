export const AUTHORS = [
  "Sunday Editor",
  "Julian B. Horrow",
  "Whit Boone",
] as const;

export type Author = (typeof AUTHORS)[number];

export type Section = "file" | "essay" | "longform";

export function isAuthor(value: string): value is Author {
  return (AUTHORS as readonly string[]).includes(value);
}
