import type { Metadata } from "next";
import { Chair } from "@/components/Chair";

export const metadata: Metadata = {
  title: "Writers",
};

export default function WritersPage() {
  return (
    <div>
      <h1 className="mb-8 font-serif text-3xl text-ink">Writers</h1>
      <Chair
        name="Sunday Editor"
        note="The clerk. Dates the clip. Names the file."
      />
      <Chair name="Julian B. Horrow" note="Essay forthcoming" />
      <Chair name="Whit Boone" note="Longform forthcoming" />
      <Chair name="Seat open" note="" />
      <Chair name="Seat open" note="" />
    </div>
  );
}
