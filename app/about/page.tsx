import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">About</h1>
      <p className="mt-8">
        Avenues is a small house for dated notes and signed essays by our own
        writers. We do not accept submissions. We do not call the market. We do
        not host a shouting match.
      </p>
      <p className="mt-8">
        Page views are counted with Vercel so we can see which screens are used.
        There are no advertising cookies.
      </p>
      <p className="mt-8">
        For correspondence, write to{" "}
        <a href="mailto:info@avenuesfiles.com">info@avenuesfiles.com</a>.
      </p>
    </div>
  );
}
