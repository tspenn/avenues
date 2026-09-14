import type { Metadata } from "next";
import { AuthorDesk } from "@/components/AuthorDesk";
import { CHAIRS } from "@/lib/authors";
import { getPostsByAuthor } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Whit Boone",
};

export default function BoonePage() {
  return (
    <AuthorDesk
      chair={CHAIRS["Whit Boone"]}
      posts={getPostsByAuthor("Whit Boone")}
    />
  );
}
