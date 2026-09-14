import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
import { getFilePosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "File",
};

export default function FilePage() {
  const posts = getFilePosts();

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">File</h1>
      {posts.length === 0 ? (
        <p className="mt-8">No file this week.</p>
      ) : (
        <section aria-label="Sunday File" className="mt-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </section>
      )}
    </div>
  );
}
