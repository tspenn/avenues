import type { Metadata } from "next";
import { UnlistedMarkdownPage } from "@/components/UnlistedMarkdownPage";

export const metadata: Metadata = {
  title: "Bio Textiles",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <UnlistedMarkdownPage file="bio-textiles.md" />;
}
