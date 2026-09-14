"use client";

import { FormEvent, useState } from "react";

export function SubscribeForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return <p>Noted. Payments, when they are live, will reach this desk.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <label htmlFor="email" className="font-sans text-sm">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        autoComplete="email"
        className="border border-ink bg-page px-3 py-2 text-ink outline-none focus:border-header"
      />
      <button
        type="submit"
        className="w-fit border border-ink bg-header px-4 py-2 font-sans text-sm text-accent"
      >
        Keep the file
      </button>
    </form>
  );
}
