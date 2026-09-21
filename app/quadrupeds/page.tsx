import type { Metadata } from "next";
import { UnlistedMarkdownPage } from "@/components/UnlistedMarkdownPage";

export const metadata: Metadata = {
  title: "Marine 4Ped",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <UnlistedMarkdownPage file="quadrupeds.md" />;
}
