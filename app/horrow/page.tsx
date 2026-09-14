import type { Metadata } from "next";
import { AuthorDesk } from "@/components/AuthorDesk";
import { CHAIRS } from "@/lib/authors";
import { getPostsByAuthor } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Julian B. Horrow",
};

export default function HorrowPage() {
  return (
    <AuthorDesk
      chair={CHAIRS["Julian B. Horrow"]}
      posts={getPostsByAuthor("Julian B. Horrow")}
    />
  );
}
