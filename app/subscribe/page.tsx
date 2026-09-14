import type { Metadata } from "next";
import { SubscribeForm } from "@/components/SubscribeForm";

export const metadata: Metadata = {
  title: "Subscribe",
};

export default function SubscribePage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">Subscribe</h1>
      <p className="mt-8 mb-8">
        Leave an address if you want the file when it is dated.
      </p>
      <SubscribeForm />
    </div>
  );
}
