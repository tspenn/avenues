type ChairProps = {
  name: string;
  note?: string;
};

export function Chair({ name, note }: ChairProps) {
  return (
    <article className="border-b border-ink/15 py-7 first:pt-0">
      <h2 className="font-serif text-xl text-ink">{name}</h2>
      {note ? <p className="mt-2 text-ink">{note}</p> : null}
    </article>
  );
}
