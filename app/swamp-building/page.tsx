import type { Metadata } from "next";
import { UnlistedMarkdownPage } from "@/components/UnlistedMarkdownPage";

export const metadata: Metadata = {
  title: "Swamp Building",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <UnlistedMarkdownPage file="swamp-building.md" />;
}
