"use client";

import { useEffect, useState } from "react";

const buttonClass =
  "font-sans text-sm text-ink/70 underline-offset-4 hover:text-ink hover:underline";

export function ShareRow({
  title,
  url,
  text,
}: {
  title: string;
  url: string;
  text: string;
}) {
  const [canShare, setCanShare] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const xHref = `https://x.com/intent/post?text=${encodeURIComponent(
    text,
  )}&url=${encodeURIComponent(url)}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url,
  )}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
      <a
        href={xHref}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label={`Post “${title}” on X`}
      >
        Post on X
      </a>
      <a
        href={facebookHref}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label={`Share “${title}” on Facebook`}
      >
        Facebook
      </a>
      <button type="button" onClick={copyLink} className={buttonClass}>
        {copied ? "Link copied" : "Copy link"}
      </button>
      {canShare ? (
        <button
          type="button"
          onClick={() => navigator.share({ title, text, url }).catch(() => {})}
          className={buttonClass}
        >
          Share
        </button>
      ) : null}
    </div>
  );
}
