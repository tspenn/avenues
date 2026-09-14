import type { Metadata } from "next";
import { Chair } from "@/components/Chair";
import { CHAIRS } from "@/lib/authors";

export const metadata: Metadata = {
  title: "Writers",
};

export default function WritersPage() {
  return (
    <div>
      <h1 className="mb-8 font-serif text-3xl text-ink">Writers</h1>
      <Chair
        name={CHAIRS["Sunday Editor"].name}
        href={CHAIRS["Sunday Editor"].href}
        note={CHAIRS["Sunday Editor"].note}
      />
      <Chair
        name={CHAIRS["Julian B. Horrow"].name}
        href={CHAIRS["Julian B. Horrow"].href}
        note={CHAIRS["Julian B. Horrow"].note}
      />
      <Chair
        name={CHAIRS["Whit Boone"].name}
        href={CHAIRS["Whit Boone"].href}
        note={CHAIRS["Whit Boone"].note}
      />
      <Chair name="Seat open" />
      <Chair name="Seat open" />
    </div>
  );
}
