import type { Metadata } from "next";
import { UnlistedMarkdownPage } from "@/components/UnlistedMarkdownPage";

export const metadata: Metadata = {
  title: "Tech Teasers",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <UnlistedMarkdownPage file="tech-teasers.md" />;
}
