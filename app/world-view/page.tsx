import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
import { getWorldViewPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "World View",
};

export default function WorldViewPage() {
  const posts = getWorldViewPosts();

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">World View</h1>
      {posts.length === 0 ? (
        <p className="mt-8">No world view this week.</p>
      ) : (
        <section aria-label="World View" className="mt-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </section>
      )}
    </div>
  );
}
