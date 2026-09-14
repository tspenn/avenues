import { formatDate, type Post } from "@/lib/posts";

export function DateLine({ post }: { post: Post }) {
  const fileDate = post.dateLabel ?? formatDate(post.date);
  const posted =
    post.posted && (post.posted !== post.date || post.postedLabel)
      ? `(posted ${post.postedLabel ?? formatDate(post.posted)})`
      : null;

  if (post.section === "file") {
    return (
      <p className="font-sans text-sm text-ink/70">
        Sunday File · {fileDate}
        {posted ? <span className="block">{posted}</span> : null}
      </p>
    );
  }

  return (
    <p className="font-sans text-sm text-ink/70">
      {fileDate}
      {posted ? <span className="block">{posted}</span> : null}
    </p>
  );
}
