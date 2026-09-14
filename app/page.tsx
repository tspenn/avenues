import { Chair } from "@/components/Chair";
import { PostCard } from "@/components/PostCard";
import { CHAIRS } from "@/lib/authors";
import { getAllPosts, getPostsByAuthor } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();
  const forthcoming = (
    ["Julian B. Horrow", "Whit Boone"] as const
  ).filter((name) => getPostsByAuthor(name).length === 0);

  return (
    <div>
      <h1 className="sr-only">Avenues</h1>
      <section aria-label="Signed notes">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
      {forthcoming.length > 0 ? (
        <section aria-label="Forthcoming chairs" className="mt-4">
          {forthcoming.map((name) => (
            <Chair
              key={name}
              name={name}
              href={CHAIRS[name].href}
              note={CHAIRS[name].empty}
            />
          ))}
        </section>
      ) : null}
    </div>
  );
}
