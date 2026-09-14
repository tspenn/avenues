import Link from "next/link";

type ChairProps = {
  name: string;
  note?: string;
  href?: string;
};

export function Chair({ name, note, href }: ChairProps) {
  return (
    <article className="border-b border-ink/15 py-7 first:pt-0">
      <h2 className="font-serif text-xl text-ink">
        {href ? (
          <Link href={href} className="underline-offset-4 hover:underline">
            {name}
          </Link>
        ) : (
          name
        )}
      </h2>
      {note ? <p className="mt-2 text-ink">{note}</p> : null}
    </article>
  );
}
