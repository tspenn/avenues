import { Chair } from "@/components/Chair";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 className="sr-only">Avenues</h1>
      <section aria-label="Signed notes">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
      <section aria-label="Forthcoming chairs" className="mt-4">
        <Chair name="Julian B. Horrow" note="Essay forthcoming" />
        <Chair name="Whit Boone" note="Longform forthcoming" />
      </section>
    </div>
  );
}
