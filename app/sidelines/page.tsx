import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
import { getSidelinesPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Sidelines",
};

export default function SidelinesPage() {
  const posts = getSidelinesPosts();

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">Sidelines</h1>
      {posts.length === 0 ? (
        <p className="mt-8">Nothing from the sidelines this week.</p>
      ) : (
        <section aria-label="Sidelines" className="mt-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </section>
      )}
    </div>
  );
}
