import { formatDate, type Post } from "@/lib/posts";

export function DateLine({ post }: { post: Post }) {
  const posted =
    post.posted && post.posted !== post.date
      ? `(posted ${formatDate(post.posted)})`
      : null;

  if (post.section === "file") {
    return (
      <p className="font-sans text-sm text-ink/70">
        Sunday File · {formatDate(post.date)}
        {posted ? <span className="block">{posted}</span> : null}
      </p>
    );
  }

  return (
    <p className="font-sans text-sm text-ink/70">
      {formatDate(post.date)}
      {posted ? <span className="block">{posted}</span> : null}
    </p>
  );
}
