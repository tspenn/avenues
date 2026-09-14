import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">About</h1>
      <p className="mt-8">
        Avenues is a small house for dated notes and signed essays. We do not
        call the market. We do not host a shouting match.
      </p>
    </div>
  );
}
