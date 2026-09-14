import type { Metadata } from "next";
import Image from "next/image";
import { PostCard } from "@/components/PostCard";
import { getFilePosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "File",
};

export default function FilePage() {
  const posts = getFilePosts();

  return (
    <div>
      <h1 className="sr-only">File</h1>
      <Image
        src="/SundayFilelogo1.jpg"
        alt="Sunday File"
        width={1600}
        height={1000}
        priority
        className="w-full"
      />
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
