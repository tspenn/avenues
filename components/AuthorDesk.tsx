import { PostCard } from "@/components/PostCard";
import type { Chair } from "@/lib/authors";
import type { Post } from "@/lib/posts";

export function AuthorDesk({
  chair,
  posts,
}: {
  chair: Chair;
  posts: Post[];
}) {
  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">{chair.name}</h1>
      {chair.note ? <p className="mt-3 text-ink">{chair.note}</p> : null}
      {posts.length === 0 ? (
        <p className="mt-8">{chair.empty}</p>
      ) : (
        <section aria-label={chair.name} className="mt-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </section>
      )}
    </div>
  );
}
