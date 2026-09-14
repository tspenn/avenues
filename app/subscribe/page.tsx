import type { Metadata } from "next";
import { SubscribeForm } from "@/components/SubscribeForm";

export const metadata: Metadata = {
  title: "Subscribe",
};

export default function SubscribePage() {
  const paymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">Subscribe</h1>
      <p className="mt-8 mb-8">
        Leave an address if you want the file when it is dated.
      </p>
      <SubscribeForm />
      <div className="mt-10">
        {paymentLink ? (
          <a
            href={paymentLink}
            className="inline-block border border-ink bg-header px-4 py-2 font-sans text-sm text-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            Become a paid reader
          </a>
        ) : (
          <p>
            Become a paid reader — payments are not live.
          </p>
        )}
      </div>
    </div>
  );
}
